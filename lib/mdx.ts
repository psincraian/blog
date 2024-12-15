import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import readingTime from 'reading-time'

const postsDirectory = path.join(process.cwd(), 'posts')

export async function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, '')
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const { data, content } = matter(fileContents)
  const mdxSource = await serialize(content);

  return {
    slug: realSlug,
    frontmatter: data,
    content: mdxSource,
    readingTime: readingTime(content).text,
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
