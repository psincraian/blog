import Link from 'next/link'

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-center">Contact Me</h1>
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
                <p className="text-xl mb-6 text-center">
                    Feel free to reach out to me at:
                </p>
                <p className="text-2xl font-semibold text-center text-blue-600 mb-8">
                    hi@petru.tech
                </p>
                <div className="text-center">
                    <Link
                        href="mailto:hi@petru.tech"
                        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300"
                    >
                        Send Email
                    </Link>
                </div>
            </div>
        </div>
    )
}

