import fs from 'fs'
import path from 'path'

const postsDirectory = path.join(process.cwd(), 'posts')

export async function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, '')
  const {readingTime, frontmatter, default: source} = await import(`/posts/${realSlug}.mdx`)

  return {
    slug: realSlug,
    frontmatter: frontmatter,
    content: source,
    readingTime: readingTime.text,
  }
}

export async function getAllPosts() {
  const files = fs.readdirSync(postsDirectory)

  const posts = await Promise.all(
    files.map(async (filename) => {
      const slug = filename.replace(/\.mdx$/, '')
      const post = await getPostBySlug(slug)
      return post
    })
  )

  return posts.sort((a, b) => {
    if (a.frontmatter.date < b.frontmatter.date) {
      return 1
    } else {
      return -1
    }
  })
}
