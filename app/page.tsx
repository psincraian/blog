import Image from 'next/image'
import Link from 'next/link'
import CareerTimeline from './components/career-timeline'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-16">
        <Image
          src="/your-photo.jpg"
          alt="Your Name"
          width={200}
          height={200}
          className="rounded-full mx-auto mb-4"
        />
        <h1 className="text-4xl font-bold mb-2">Your Name</h1>
        <p className="text-xl text-gray-600 mb-4">Your Tagline Here</p>
        <p className="max-w-2xl mx-auto text-gray-700 mb-6">
          Your brief, engaging bio goes here. It should be around 150-200 words,
          highlighting your key skills, experiences, and what makes you unique.
          Make it personal and engaging to capture the reader&apos;s attention.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            href="/blog"
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300"
          >
            Read My Blog
          </Link>
          <Link
            href="#contact"
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-300 transition duration-300"
          >
            Contact Me
          </Link>
        </div>
      </section>

      <CareerTimeline />
    </div>
  )
}

