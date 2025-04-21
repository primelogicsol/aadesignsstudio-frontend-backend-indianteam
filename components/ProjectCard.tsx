import type React from "react"

interface ProjectCardProps {
  title: string
  imageUrl: string
  description: string
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, imageUrl, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden m-4">
      <div className="relative h-64">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-[#003087]">{title}</h3>
        <p className="text-gray-700">{description}</p>
        <button className="mt-4 text-[#003087] font-medium flex items-center">
          View Project
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default ProjectCard

