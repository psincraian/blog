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
    company: 'Tech Corp',
    logo: '/tech-corp-logo.png',
    position: 'Senior Developer',
    duration: '2020 - Present',
    achievements: [
      'Led a team of 5 developers in creating a new product feature',
      'Improved application performance by 40%',
      'Implemented CI/CD pipeline, reducing deployment time by 60%',
    ],
  },
  {
    company: 'Startup Inc',
    logo: '/startup-inc-logo.png',
    position: 'Full Stack Developer',
    duration: '2018 - 2020',
    achievements: [
      'Developed and launched the company\'s flagship product',
      'Increased user engagement by 25% through UI/UX improvements',
      'Mentored junior developers and interns',
    ],
  },
  // Add more timeline items as needed
]

export const CareerTimeline = () => {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Career Timeline</h2>
      <div className="relative">
        {timelineData.map((item, index) => (
          <div key={index} className="mb-8 flex justify-between items-center">
            <div className="w-1/2 pr-8 text-right">
              <h3 className="text-xl font-semibold">{item.company}</h3>
              <p className="text-gray-600">{item.position}</p>
              <p className="text-sm text-gray-500">{item.duration}</p>
            </div>
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <Image
                src={item.logo}
                alt={`${item.company} logo`}
                width={32}
                height={32}
                className="rounded-full"
              />
            </div>
            <div className="w-1/2 pl-8">
              <ul className="list-disc pl-4">
                {item.achievements.map((achievement, i) => (
                  <li key={i} className="mb-2 text-sm">
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-blue-200 transform -translate-x-1/2"></div>
      </div>
    </section>
  )
}
