
import { getPostBySlug, getAllPosts } from '@/lib/mdx'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import SocialShareButtons from '@/app/components/social-share-buttons'
import { BlogContent } from './components/content'

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const {slug} = await params;

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
      authors: ['Petru Rares Sincraian'],
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
  const {slug} = await params;
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  console.log(post.content)

  return (
    <article className="container mx-auto px-4 py-8">
      <Image
        src={post.frontmatter.image}
        alt={post.frontmatter.title}
        width={600}
        height={200}
        className="rounded-lg mb-8"
      />
      <h1 className="text-4xl font-bold mb-4">{post.frontmatter.title}</h1>
      <div className="flex justify-between text-gray-500 mb-8">
        <span>{post.frontmatter.date}</span>
        <span>{post.readingTime} min read</span>
      </div>
      <div className="prose max-w-none mb-8">
        <BlogContent source={post.content} />
      </div>
      <SocialShareButtons
        url={`https://yourwebsite.com/blog/${post.slug}`}
        title={post.frontmatter.title}
      />
    </article>
  )
}
