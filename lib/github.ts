export interface Repository {
    id: number
    name: string
    description: string
    html_url: string
    stargazers_count: number
    forks_count: number
    language: string
}

export async function fetchTopRepositories(): Promise<Repository[] | Error> {
    try {
        const username = 'psincraian'
        const response = await fetch(`https://api.github.com/users/${username}/repos?&type=public&per_page=100`, {
            headers: {
                'Authorization': `token ${process.env.GITHUB_TOKEN}`
            },
        })

        if (!response.ok) {
            console.log(response);
            throw new Error('Failed to fetch repositories')
        }

        const jsonResponse = await response.json();
        const repos = await jsonResponse.map((repo: {
            id: number;
            name: string;
            description: string;
            html_url: string;
            stargazers_count: number;
            forks_count: number;
            language: string
        }) => {
            return {
                id: repo.id,
                name: repo.name,
                description: repo.description,
                html_url: repo.html_url,
                stargazers_count: repo.stargazers_count,
                forks_count: repo.forks_count,
                language: repo.language,
            } as Repository
        }).sort((a: Repository, b: Repository) => b.stargazers_count - a.stargazers_count);

        console.log(repos)
        return repos.slice(0, 3)
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch repositories')
    }
}