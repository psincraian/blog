import {NextResponse} from 'next/server'

export interface Repository {
    id: number
    name: string
    description: string
    html_url: string
    stargazers_count: number
    forks_count: number
    language: string
}

export interface Error {
    error: string
}

export async function GET(): Promise<NextResponse<Repository[] | Error>> {
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
        const repos = await jsonResponse.map((repo: any) => {
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
        return NextResponse.json(repos.slice(0, 6))
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: 'Failed to fetch repositories'}, {status: 500})
    }
}

