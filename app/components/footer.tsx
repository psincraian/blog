import {Github, Instagram, Linkedin, Twitter} from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-6">
          <a
              href="https://twitter.com/psincraian"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-500 transition duration-300"
          >
            <Twitter size={24} />
            <span className="sr-only">Twitter</span>
          </a>
          <a
              href="https://www.threads.net/@psincraian"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-purple-500 transition duration-300"
          >
            <Instagram size={24} />
            <span className="sr-only">Threads</span>
          </a>
          <a
              href="https://www.linkedin.com/in/psincraian"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-700 transition duration-300"
          >
            <Linkedin size={24} />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a
              href="https://github.com/psincraian"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition duration-300"
          >
            <Github size={24} />
            <span className="sr-only">GitHub</span>
          </a>
        </div>
        <p className="text-center mt-8 text-gray-600">
          © {new Date().getFullYear()} Petru Rares Sincraian. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer

