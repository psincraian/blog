import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import Link from 'next/link'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Headings
    h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-semibold mt-6 mb-3">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-semibold mt-4 mb-2">{children}</h3>,
    h4: ({ children }) => <h4 className="text-lg font-semibold mt-3 mb-2">{children}</h4>,
    h5: ({ children }) => <h5 className="text-base font-semibold mt-2 mb-1">{children}</h5>,

    // Paragraphs and lists
    p: ({ children }) => <p className="pb-2 mb-2 leading-relaxed">{children}</p>,
    ul: ({ children }) => <ul className="list-disc pl-6 mb-4">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal pl-6 mb-4">{children}</ol>,
    li: ({ children }) => <li className="mb-1">{children}</li>,

    // Inline text elements
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
        <code className="bg-gray-100 rounded px-1 py-0.5 font-mono text-sm">{children}</code>
    ),

    // Block elements
    blockquote: ({ children }) => (
        <blockquote className="px-4 pt-2 bg-gray-100">{children}</blockquote>
    ),
    pre: ({ children }) => (
        <pre className="bg-gray-100 rounded p-4 overflow-x-auto mb-4 font-mono text-sm">
        {children}
      </pre>
    ),

    // Links and images
    a: ({ href, children }) => (
        <Link href={href as string} className="text-blue-600 hover:underline">
          {children}
        </Link>
    ),
    img: ({ src, alt, width, height }) => (
        <Image
            src={src as string}
            alt={alt as string}
            width={Number(width) || 600}
            height={Number(height) || 400}
            className="rounded-lg my-4"
        />
    ),

    // Tables
    table: ({ children }) => (
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full divide-y divide-gray-200">{children}</table>
        </div>
    ),
    thead: ({ children }) => <thead className="bg-gray-50">{children}</thead>,
    tbody: ({ children }) => <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>,
    tr: ({ children }) => <tr>{children}</tr>,
    th: ({ children }) => (
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          {children}
        </th>
    ),
    td: ({ children }) => <td className="px-6 py-4 whitespace-nowrap">{children}</td>,

    // Use the default for any other components
    ...components,
  }
}

