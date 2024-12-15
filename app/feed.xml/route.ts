import { getAllPosts } from '@/lib/mdx'
import RSS from 'rss'

export async function GET() {
  const posts = await getAllPosts()
  const site_url = 'https://yourwebsite.com'

  const feed = new RSS({
    title: 'Your Name\'s Blog',
    description: 'A blog about web development and technology',
    site_url: site_url,
    feed_url: `${site_url}/feed.xml`,
  })

  posts.forEach((post) => {
    feed.item({
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      url: `${site_url}/blog/${post.slug}`,
      date: post.frontmatter.date,
    })
  })

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
