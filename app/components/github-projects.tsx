import {GitFork, Star, ExternalLink, Github} from 'lucide-react'
import {fetchSpecificRepositories} from "@/lib/github";
import {projects} from "@/lib/projects";

export default async function FeaturedProjects() {
    // Fetch GitHub stats for projects that have repos
    const repoNames = projects.filter(p => p.githubRepo).map(p => p.githubRepo!)
    const githubStats = await fetchSpecificRepositories(repoNames)

    // Create a map for easy lookup of GitHub stats
    const statsMap = new Map(githubStats.map(repo => [repo.name, repo]))

    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Projects</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => {
                    const stats = project.githubRepo ? statsMap.get(project.githubRepo) : null

                    return (
                        <div
                            key={project.id}
                            className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300"
                        >
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                                <p className="text-gray-600 mb-4">{project.description}</p>

                                {stats && (
                                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                        <span className="flex items-center">
                                            <Star className="w-4 h-4 mr-1"/>
                                            {stats.stargazers_count}
                                        </span>
                                        <span className="flex items-center">
                                            <GitFork className="w-4 h-4 mr-1"/>
                                            {stats.forks_count}
                                        </span>
                                        {stats.language && (
                                            <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                                                {stats.language}
                                            </span>
                                        )}
                                    </div>
                                )}

                                <div className="flex gap-3">
                                    <a
                                        href={project.websiteUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 text-sm"
                                    >
                                        <ExternalLink className="w-4 h-4"/>
                                        Visit
                                    </a>
                                    {project.githubRepo && (
                                        <a
                                            href={`https://github.com/psincraian/${project.githubRepo}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition duration-300 text-sm"
                                        >
                                            <Github className="w-4 h-4"/>
                                            GitHub
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

