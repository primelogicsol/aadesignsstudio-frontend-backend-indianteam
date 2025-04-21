import type React from "react"

interface TestimonialCardProps {
  name: string
  role: string
  company: string
  companyColor: string
  description: string
  imageSrc: string
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  company,
  companyColor,
  description,
  imageSrc,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 m-4">
      <div className="flex items-center mb-4">
        <img src={imageSrc || "/placeholder.svg"} alt={name} className="w-16 h-16 rounded-full object-cover mr-4" />
        <div>
          <h3 className="text-lg font-bold">{name}</h3>
          <p className="text-gray-600">{role}</p>
          <p style={{ color: companyColor }} className="font-medium">
            {company}
          </p>
        </div>
      </div>
      <p className="text-gray-700 italic">{description}</p>
    </div>
  )
}

export default TestimonialCard

