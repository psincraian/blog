import { getPostBySlug, getAllPosts } from '@/lib/mdx'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { BlogContent } from './components/blog-content'

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      type: 'article',
      publishedTime: post.frontmatter.date,
      authors: ['Your Name'],
      images: [
        {
          url: post.frontmatter.image,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      images: [post.frontmatter.image],
    },
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
    const { slug } = await params

  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="container mx-auto px-4 py-8">
      <Image
        src={post.frontmatter.image}
        alt={post.frontmatter.title ?? "no alt provided"}
        width={1200}
        height={200}
        className="rounded-lg mb-8"
        objectFit='cover'
        placeholder='empty'
      />
      <h1 className="text-4xl font-bold mb-4">{post.frontmatter.title}</h1>
      <div className="flex justify-between text-gray-500 mb-8">
        <span>{post.frontmatter.date}</span>
        <span>{post.readingTime}</span>
      </div>
      <div className="prose max-w-none mb-8">
        <BlogContent content={post.content}/>
      </div>
    </article>
  )
}
