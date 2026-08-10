'use client'

import {Download, Pin, Search, X} from 'lucide-react'
import {useMemo, useRef, useState} from 'react'
import {AI_MODELS, AIModel} from './ai-model-data'

const chart = {
  width: 1400,
  height: 720,
  plotLeft: 54,
  plotTop: 40,
  plotWidth: 1260,
  plotHeight: 570,
}

const xMin = 0.04
const xMax = 30
const yMin = 27
const yMax = 65
const xTicks = [0.05, 0.1, 0.25, 0.5, 1, 2, 5, 10, 25]
const yTicks = [30, 35, 40, 45, 50, 55, 60, 65]

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))
const roundCoordinate = (value: number) => Math.round(value * 1000) / 1000

const scaleX = (price: number) =>
  roundCoordinate(
    chart.plotLeft +
      ((Math.log10(price) - Math.log10(xMin)) / (Math.log10(xMax) - Math.log10(xMin))) * chart.plotWidth,
  )

const scaleY = (score: number) => roundCoordinate(chart.plotTop + ((yMax - score) / (yMax - yMin)) * chart.plotHeight)

const formatPrice = (price: number) => `$${price < 1 ? price.toFixed(3) : price.toFixed(2)}`

const starPath = (cx: number, cy: number, outerRadius = 8, innerRadius = 3.5) =>
  Array.from({length: 10}, (_, index) => {
    const radius = index % 2 === 0 ? outerRadius : innerRadius
    const angle = -Math.PI / 2 + (index * Math.PI) / 5
    const x = cx + Math.cos(angle) * radius
    const y = cy + Math.sin(angle) * radius
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
  }).join(' ') + ' Z'

const getQuadrant = (model: AIModel) => {
  if (model.price <= 1 && model.score >= 50) return 'Cheap and Smart'
  if (model.price > 1 && model.score >= 50) return 'Expensive and Smart'
  if (model.price <= 1 && model.score < 50) return 'Cheap and Weak'
  return 'Expensive and Weak'
}

type PositionedModel = AIModel & {
  x: number
  y: number
  labelX: number
  labelY: number
  labelSide: 'left' | 'right'
}

function positionLabels(): PositionedModel[] {
  const plotRight = chart.plotLeft + chart.plotWidth
  const plotBottom = chart.plotTop + chart.plotHeight
  const placed: Array<{x1: number; x2: number; y1: number; y2: number}> = []

  return AI_MODELS.map((model) => ({
    ...model,
    x: scaleX(model.price),
    y: scaleY(model.score),
    labelX: 0,
    labelY: 0,
    labelSide: 'right' as const,
  }))
    .sort((a, b) => a.y - b.y || a.x - b.x)
    .map((model) => {
      const labelWidth = Math.min(220, Math.max(48, model.name.length * 4.6))
      const labelSide: PositionedModel['labelSide'] = model.x > plotRight - labelWidth - 20 ? 'left' : 'right'
      const labelX = labelSide === 'right' ? model.x + 11 : model.x - 11
      const labelHeight = 11
      const offsets = [
        0, -12, 12, -24, 24, -36, 36, -48, 48, -60, 60, -72, 72, -84, 84, -96, 96, -108, 108,
        -120, 120, -132, 132, -144, 144, -156, 156, -168, 168, -180, 180, -192, 192, -204, 204,
      ]

      const candidate = offsets
        .map((offset) => clamp(model.y + offset, chart.plotTop + 8, plotBottom - 8))
        .find((labelY) => {
          const x1 = labelSide === 'right' ? labelX : labelX - labelWidth
          const x2 = labelSide === 'right' ? labelX + labelWidth : labelX
          const y1 = labelY - labelHeight / 2
          const y2 = labelY + labelHeight / 2
          return !placed.some((box) => box.x1 < x2 && box.x2 > x1 && box.y1 < y2 && box.y2 > y1)
        })

      const labelY = candidate ?? clamp(model.y, chart.plotTop + 8, plotBottom - 8)
      const x1 = labelSide === 'right' ? labelX : labelX - labelWidth
      const x2 = labelSide === 'right' ? labelX + labelWidth : labelX
      placed.push({
        x1,
        x2,
        y1: labelY - labelHeight / 2,
        y2: labelY + labelHeight / 2,
      })

      return {...model, labelX, labelY, labelSide}
    })
    .sort((a, b) => AI_MODELS.indexOf(a) - AI_MODELS.indexOf(b))
}

const positionedModels = positionLabels()

export default function AIModelExplorer() {
  const [query, setQuery] = useState('')
  const [selectedName, setSelectedName] = useState<string | null>(null)
  const chartRef = useRef<SVGSVGElement>(null)

  const selectedModel = selectedName ? AI_MODELS.find((model) => model.name === selectedName) ?? null : null
  const normalizedQuery = query.trim().toLowerCase()
  const matches = useMemo(
    () =>
      normalizedQuery
        ? AI_MODELS.filter((model) => model.name.toLowerCase().includes(normalizedQuery))
        : AI_MODELS,
    [normalizedQuery],
  )
  const matchNames = useMemo(() => new Set(matches.map((model) => model.name)), [matches])

  const chooseModel = (model: AIModel) => setSelectedName(model.name)

  const exportPng = () => {
    const svg = chartRef.current
    if (!svg) return

    const clonedSvg = svg.cloneNode(true) as SVGSVGElement
    clonedSvg.removeAttribute('class')
    clonedSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    clonedSvg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink')
    clonedSvg.querySelectorAll('circle[fill="#ffffff"][fill-opacity="0.01"]').forEach((hitTarget) => hitTarget.remove())

    const svgBlob = new Blob([new XMLSerializer().serializeToString(clonedSvg)], {
      type: 'image/svg+xml;charset=utf-8',
    })
    const svgUrl = URL.createObjectURL(svgBlob)
    const image = new window.Image()

    image.onload = () => {
      const scale = 2
      const canvas = document.createElement('canvas')
      canvas.width = chart.width * scale
      canvas.height = chart.height * scale
      const context = canvas.getContext('2d')

      if (!context) {
        URL.revokeObjectURL(svgUrl)
        return
      }

      context.fillStyle = '#ffffff'
      context.fillRect(0, 0, canvas.width, canvas.height)
      context.drawImage(image, 0, 0, canvas.width, canvas.height)
      URL.revokeObjectURL(svgUrl)

      canvas.toBlob((blob) => {
        if (!blob) return

        const downloadUrl = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = 'ai-intelligence-vs-blended-price.png'
        document.body.appendChild(link)
        link.click()
        link.remove()
        URL.revokeObjectURL(downloadUrl)
      }, 'image/png')
    }

    image.onerror = () => URL.revokeObjectURL(svgUrl)
    image.src = svgUrl
  }

  const handlePointKeyDown = (event: React.KeyboardEvent<SVGCircleElement>, model: AIModel) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      chooseModel(model)
    }
  }

  const splitX = scaleX(1)
  const splitY = scaleY(50)
  const plotRight = chart.plotLeft + chart.plotWidth
  const plotBottom = chart.plotTop + chart.plotHeight

  return (
    <section className="relative left-1/2 my-8 w-[max(100%,80vw)] max-w-[calc(100vw-2rem)] -translate-x-1/2 overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm" aria-label="Interactive AI model price and intelligence chart">
      <div className="border-b border-slate-200 px-5 py-5 sm:px-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-950">Find the best intelligence for the price</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Search a model, or click any point to pin its exact score and blended price.
            </p>
          </div>

          <div className="w-full lg:max-w-sm">
            <label htmlFor="ai-model-search" className="sr-only">Search AI models</label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative min-w-0 flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden="true" />
                <input
                  id="ai-model-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search models…"
                  className="w-full appearance-none rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-200"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="absolute right-2 top-1/2 rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900"
                    aria-label="Clear model search"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={exportPng}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:border-cyan-500 hover:text-cyan-800 focus:outline-none focus:ring-2 focus:ring-cyan-200"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Export PNG
              </button>
            </div>
            <p className="mt-2 text-xs text-slate-500" aria-live="polite">
              {normalizedQuery ? `${matches.length} match${matches.length === 1 ? '' : 'es'}` : `${AI_MODELS.length} models`}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <Pin className="mt-0.5 h-4 w-4 shrink-0 text-cyan-700" aria-hidden="true" />
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500">{selectedModel ? 'Pinned model' : 'No model pinned'}</p>
              {selectedModel ? (
                <>
                  <p className="mt-1 font-semibold text-slate-950">{selectedModel.name}</p>
                  <p className="mt-1 text-sm text-slate-600">
                    AI Intelligence Index <span className="font-semibold text-slate-950">{selectedModel.score.toFixed(2)}</span>
                    <span className="mx-2 text-slate-400">·</span>
                    Blended price <span className="font-semibold text-slate-950">{formatPrice(selectedModel.price)} / 1M</span>
                    <span className="mx-2 text-slate-400">·</span>
                    {getQuadrant(selectedModel)}
                  </p>
                </>
              ) : (
                <p className="mt-1 text-sm text-slate-600">Search or select a point to see its score and price.</p>
              )}
            </div>
          </div>
          {normalizedQuery && matches.length > 0 && (
            <div className="flex max-w-full gap-2 overflow-x-auto pb-1">
              {matches.slice(0, 8).map((model) => (
                <button
                  type="button"
                  key={model.name}
                  onClick={() => chooseModel(model)}
                  className={`shrink-0 rounded-full border px-3 py-1.5 text-xs transition ${selectedName === model.name ? 'border-cyan-600 bg-cyan-50 text-cyan-800' : 'border-slate-300 text-slate-600 hover:border-cyan-500 hover:text-cyan-800'}`}
                >
                  {model.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="overflow-hidden px-2 py-4 sm:px-5">
        <svg
          ref={chartRef}
          viewBox={`0 0 ${chart.width} ${chart.height}`}
          className="block h-auto w-full"
          style={{width: '100%', height: 'auto'}}
          role="img"
          aria-label={`Scatter plot of AI Intelligence Index against blended price for ${AI_MODELS.length} AI models`}
        >
          <defs>
          </defs>

          <rect x="0" y="0" width={chart.width} height={chart.height} fill="#ffffff" />

          {xTicks.map((tick) => {
            const x = scaleX(tick)
            return (
              <g key={`x-${tick}`}>
                <line x1={x} x2={x} y1={chart.plotTop} y2={plotBottom} stroke="#64748b" strokeOpacity="0.16" />
                <text x={x} y={plotBottom + 26} fill="#64748b" fontSize="10" textAnchor="middle">{`$${tick}`}</text>
              </g>
            )
          })}
          {yTicks.map((tick) => {
            const y = scaleY(tick)
            return (
              <g key={`y-${tick}`}>
                <line x1={chart.plotLeft} x2={plotRight} y1={y} y2={y} stroke="#64748b" strokeOpacity="0.16" />
                <text x={chart.plotLeft - 12} y={y + 4} fill="#64748b" fontSize="10" textAnchor="end">{tick}</text>
              </g>
            )
          })}

          <line x1={splitX} x2={splitX} y1={chart.plotTop} y2={plotBottom} stroke="#475569" strokeOpacity="0.55" strokeDasharray="7 8" />
          <line x1={chart.plotLeft} x2={plotRight} y1={splitY} y2={splitY} stroke="#475569" strokeOpacity="0.55" strokeDasharray="7 8" />

          <text x={chart.plotLeft + 14} y={chart.plotTop + 22} fill="#475569" fontSize="11" fontWeight="700">Cheap and Smart</text>
          <text x={splitX + 14} y={chart.plotTop + 22} fill="#475569" fontSize="11" fontWeight="700">Expensive and Smart</text>
          <text x={chart.plotLeft + 14} y={splitY + 24} fill="#475569" fontSize="11" fontWeight="700">Cheap and Weak</text>
          <text x={splitX + 14} y={splitY + 24} fill="#475569" fontSize="11" fontWeight="700">Expensive and Weak</text>

          <text x={(chart.plotLeft + plotRight) / 2} y={chart.height - 16} fill="#475569" fontSize="11" textAnchor="middle">Blended price · $/1M tokens (log)</text>
          <text x="20" y={(chart.plotTop + plotBottom) / 2} fill="#475569" fontSize="11" textAnchor="middle" transform={`rotate(-90 20 ${(chart.plotTop + plotBottom) / 2})`}>Intelligence Index</text>

          {positionedModels.map((model) => {
            const matchesSearch = !normalizedQuery || matchNames.has(model.name)
            const selected = model.name === selectedName
            const textAnchor = model.labelSide === 'right' ? 'start' : 'end'
            const labelStartX = model.labelSide === 'right' ? model.labelX : model.labelX

            return (
              <g
                key={model.name}
                className="cursor-pointer outline-none"
                opacity={matchesSearch ? 1 : 0.22}
              >
                <line x1={model.x} x2={labelStartX} y1={model.y} y2={model.labelY} stroke="#94a3b8" strokeOpacity={matchesSearch ? 0.38 : 0.12} strokeWidth="0.8" />
                {selected ? (
                  <path d={starPath(model.x, model.y)} fill="#f59e0b" stroke="#92400e" strokeWidth="1.5" />
                ) : (
                  <circle cx={model.x} cy={model.y} r="4" fill="#2563eb" stroke="#dbeafe" strokeWidth="1.2" />
                )}
                <circle
                  cx={model.x}
                  cy={model.y}
                  r="12"
                  fill="#ffffff"
                  fillOpacity="0.01"
                  stroke="transparent"
                  strokeWidth="4"
                  pointerEvents="all"
                  role="button"
                  tabIndex={0}
                  aria-label={`${model.name}: score ${model.score.toFixed(2)}, blended price ${formatPrice(model.price)}`}
                  onClick={() => chooseModel(model)}
                  onKeyDown={(event) => handlePointKeyDown(event, model)}
                />
                <text
                  x={model.labelX}
                  y={model.labelY + 3}
                  fill={selected ? '#0f172a' : '#334155'}
                  fontSize="8"
                  fontWeight={selected ? '700' : '500'}
                  textAnchor={textAnchor}
                  paintOrder="stroke"
                  stroke="#ffffff"
                  strokeWidth="3"
                  strokeOpacity="0.95"
                  className="select-none"
                  onClick={() => chooseModel(model)}
                >
                  {model.name}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      <div className="border-t border-slate-200 px-5 py-3 text-xs text-slate-500 sm:px-7">
        <p>Click a point or a search result to pin a model. The chart uses a logarithmic price axis so low-cost models remain visible.</p>
      </div>
    </section>
  )
}
