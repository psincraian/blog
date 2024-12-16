import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts } from '@/lib/mdx'
import {Post} from "@/lib/mdx";

export default async function LatestPosts() {
    let latestPosts: Post[] = []
    try {
        const allPosts = await getAllPosts()
        latestPosts = allPosts.slice(0, 3) // Get the 3 most recent posts
    } catch (error) {
        console.error('Error fetching posts:', error)
    }

    if (latestPosts.length === 0) {
        return (
            <section className="mb-16">
                <h2 className="text-3xl font-bold mb-8 text-center">Latest Blog Posts</h2>
                <p className="text-center text-gray-600">No posts found. Check back soon for updates!</p>
            </section>
        )
    }

    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Latest Blog Posts</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {latestPosts.map((post) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                            <Image
                                src={post.frontmatter.image}
                                alt={post.frontmatter.title}
                                width={400}
                                height={200}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">{post.frontmatter.title}</h3>
                                { // <p className="text-gray-600 mb-2 line-clamp-2">{post.frontmatter.excerpt}</p>
                                }
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>{post.frontmatter.date}</span>
                                    <span>{post.readingTime}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="text-center mt-8">
                <Link
                    href="/blog"
                    className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300"
                >
                    View All Posts
                </Link>
            </div>
        </section>
    )
}

