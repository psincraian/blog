export interface Repository {
    id: number
    name: string
    description: string
    html_url: string
    stargazers_count: number
    forks_count: number
    language: string
}

export async function fetchSpecificRepositories(repoNames: string[]): Promise<Repository[]> {
    try {
        const username = 'psincraian'
        const repos: Repository[] = []

        // Fetch each repository individually
        for (const repoName of repoNames) {
            try {
                const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`, {
                    headers: {
                        'Authorization': `token ${process.env.GITHUB_TOKEN}`
                    },
                })

                if (response.ok) {
                    const repo = await response.json()
                    repos.push({
                        id: repo.id,
                        name: repo.name,
                        description: repo.description,
                        html_url: repo.html_url,
                        stargazers_count: repo.stargazers_count,
                        forks_count: repo.forks_count,
                        language: repo.language,
                    })
                }
            } catch (error) {
                console.log(`Failed to fetch repository ${repoName}:`, error)
                // Continue with other repos even if one fails
            }
        }

        return repos
    } catch (error) {
        console.log(error);
        return []
    }
}