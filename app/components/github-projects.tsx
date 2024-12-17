'use client'

import {useEffect, useState} from 'react'
import {GitFork, Star} from 'lucide-react'

interface Repository {
    id: number
    name: string
    description: string
    html_url: string
    stargazers_count: number
    forks_count: number
    language: string
}

async function fetchTopRepositories(): Promise<Repository[]> {
    const response = await fetch('/api/github-projects')
    if (!response.ok) {
        throw new Error('Failed to fetch repositories')
    }
    return response.json()
}

export default function TopGithubProjects() {
    const [repos, setRepos] = useState<Repository[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function loadRepositories() {
            try {
                const data = await fetchTopRepositories()
                setRepos(data)
                setIsLoading(false)
            } catch (err) {
                setError('Failed to load repositories')
                setIsLoading(false)
            }
        }

        loadRepositories()
    }, [])

    if (isLoading) {
        return <div className="text-center">Loading projects...</div>
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>
    }

    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">GitHub Projects</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {repos.map((repo) => (
                    <a
                        key={repo.id}
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300"
                    >
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-2">{repo.name}</h3>
                            <p className="text-gray-600 mb-4 line-clamp-2">{repo.description}</p>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                <span className="flex items-center">
                  <Star className="w-4 h-4 mr-1"/>
                    {repo.stargazers_count}
                </span>
                                <span className="flex items-center">
                  <GitFork className="w-4 h-4 mr-1"/>
                                    {repo.forks_count}
                </span>
                                {repo.language && (
                                    <span className="px-2 py-1 bg-gray-100 rounded-full">{repo.language}</span>
                                )}
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    )
}

