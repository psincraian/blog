import Link from 'next/link'
import {getAllPosts} from '@/lib/mdx'
import Image from "next/image";

export default async function BlogIndex() {
  const posts = await getAllPosts()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
              <div className="relative w-full h-48">
                <Image
                  src={post.frontmatter.image ?? "/blog-images/hello-world.jpeg"}
                  alt={post.frontmatter.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{post.frontmatter.title}</h2>
                <p className="text-gray-600 mb-2">{post.frontmatter.excerpt}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{new Date(post.frontmatter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  <span>{post.readingTime}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
