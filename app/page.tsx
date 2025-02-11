import Image from 'next/image'
import Link from 'next/link'
import {CareerTimeline} from './components/career-timeline'
import LatestPosts from "@/app/components/latest-posts";
import GithubProjects from "@/app/components/github-projects";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-16">
        <Image
          src="/me.png"
          alt="Petru Rares Sincraian"
          width={200}
          height={200}
          className="rounded-full mx-auto mb-4"
        />
        <h1 className="text-4xl font-bold mb-2">Petru Rares Sincraian</h1>
        <p className="text-xl text-gray-600 mb-4">Software Engineer</p>
        <p className="max-w-2xl mx-auto text-gray-700 mb-6">
          I’m an optimistic and hardworking software engineer who firmly believes success is 90% work and 10% luck. <br/>
          I love building cool stuff and delivering it to customers—faster, better, and with a little style. While I proudly call myself a backend engineer, I’m not afraid to break the front-end or infrastructure when the job demands it.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            href="/blog"
            className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300"
          >
            Read My Blog
          </Link>
          <Link
              href="/contact"
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-300 transition duration-300"
          >
            Contact Me
          </Link>
        </div>
      </section>

      <GithubProjects/>
      <LatestPosts />
      { /* <CareerTimeline /> */ }
    </div>
  )
}

