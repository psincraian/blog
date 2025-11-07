export interface Project {
  id: string
  name: string
  description: string
  websiteUrl: string
  githubRepo?: string // Optional, as some projects might not have a GitHub repo
}

export const projects: Project[] = [
  {
    id: 'pepy',
    name: 'pepy.tech',
    description: 'Python package download tracker',
    websiteUrl: 'https://pepy.tech',
    githubRepo: 'pepy'
  },
  {
    id: 'myfy',
    name: 'myfy',
    description: 'Modular framework with built in modules like frontend',
    websiteUrl: 'https://myfy.dev',
    githubRepo: 'myfy'
  },
  {
    id: 'klyne',
    name: 'klyne.dev',
    description: 'Python package usage tracker',
    websiteUrl: 'https://klyne.dev'
    // No GitHub repo for this project
  }
]
