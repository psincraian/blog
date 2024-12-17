import {GitFork, Star} from 'lucide-react'
import {fetchTopRepositories} from "@/lib/github";

export default async function TopGithubProjects() {
    const repos = await fetchTopRepositories();

    if (repos instanceof Error) {
        return <div>Error: {repos.message}</div>
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

