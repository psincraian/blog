import Image from 'next/image'

interface TimelineItem {
    company: string
    logo: string
    position: string
    duration: string
    achievements: string[]
}

const timelineData: TimelineItem[] = [
    {
        company: 'Amazon',
        logo: '/career/amazon.jpeg',
        position: 'Software Engineer',
        duration: '2022 - Present',
        achievements: [
            'Led the deprecation and modernization of a 20+ year-old system, collaborating with cross-functional tech teams to streamline processes. Stack: Java, RDS, Event-Driven architecture, and other AWS services',
            'Designed and implemented a modular monolith architecture, simplifying system complexity and reducing maintenance overhead. Stack: Java, Modular Monolith, DDD, RDS, SQS, and other AWS',
            'Led the analysis and development of a critical internal payroll tool, successfully deployed across 63+ countries, addressing each country specific requirements. Stack: Java, DynamoDB, and other AWS services',
        ],
    },
    {
        company: 'Glovo',
        logo: '/career/glovo.jpeg',
        position: 'Sr. Software Engineer',
        duration: '2022 - 2022',
        achievements: [
            'Built a Python web service to automate the discovery and creation of data products, reducing manual effort by 50%. Stack: Python, Flask, AirFlow, SnowFlake, and AWS',
        ],
    },
    {
        company: 'Ocado',
        logo: '/career/ocado.png',
        position: 'Sr. Software Engineer',
        duration: '2019 - 2022',
        achievements: [
            'Led the development of the first customer segmentation service, enabling personalized experiences for millions of customers. Stack: Java, Spring, DynamoDB, Event-Driven architecture, BigQuery, and other AWS services',
            'Wrote guidelines on input validation for different languages and alphabets, used by all tech teams to support international customers, including a new customer from Japan.',
            'Implemented an internal search to access internal tools faster. It has been used by 35% of internal employees. Stack: React and CloufFront',
        ],
    },
    {
        company: 'Prope',
        logo: '/career/prope.jpeg',
        position: 'Founder',
        duration: '2018 - 2020',
        achievements: [
            'Developed and launched a website that connected 20+ shops with 1000+ customers, increasing local business visibility.',
            'Built the backend using Python and Flask, hosted on DigitalOcean, and developed the frontend and mobile apps with React and React Native.',
        ],
    },
    {
        company: 'Ulabox',
        logo: '/career/ulabox.jpeg',
        position: 'Software Engineer',
        duration: '2017 - 2019',
        achievements: [
            'Built and deployed the first recommendation system, increasing the average order value by 2% for customers. Stack: Python, Flask, BigQuery, Pandas',
            'Developed a Delivery Windows module, providing users with flexible delivery options based on complex business constraints. Stack: PHP, Symfony, MariaDB',
            'Built a Purchasing System for easier supplier interactions, optimizing internal processes. Stack: PHP; Symfony, MariaDB',
        ],
    },
    {
        company: 'Google Summer of Code',
        logo: '/career/gsoc.png',
        position: 'Intern Software Engineer',
        duration: '2016 - 2016',
        achievements: [
            'Contributed to the FFmpeg project, improving testing accuracy and system stability. Stack: C, Python, Docker',
        ],
    }
]

export function CareerTimeline() {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Career Timeline</h2>
            <div className="max-w-4xl mx-auto">
                {timelineData.map((item, index) => (
                    <div key={index} className="mb-12 flex items-start">
                        <div className="flex-shrink-0 mr-6">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                                <Image
                                    src={item.logo}
                                    alt={`${item.company} logo`}
                                    width={48}
                                    height={48}
                                    className="rounded-full"
                                />
                            </div>
                        </div>
                        <div className="flex-grow">
                            <h3 className="text-xl font-semibold">{item.company}</h3>
                            <p className="text-gray-600 mb-1">{item.position}</p>
                            <p className="text-sm text-gray-500 mb-3">{item.duration}</p>
                            <ul className="list-disc pl-5 space-y-2">
                                {item.achievements.map((achievement, i) => (
                                    <li key={i} className="text-gray-700">
                                        {achievement}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}