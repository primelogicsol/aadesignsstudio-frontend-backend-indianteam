import type { ServiceDetail } from "@/types/service"

export const dummyServiceData: ServiceDetail = {
  id: "service-1",
  title: "Professional Interior Design Services",
  content:
    "Our interior design services are tailored to meet the unique needs of each client. We work closely with you to understand your vision, preferences, and requirements to create spaces that are not only aesthetically pleasing but also functional and comfortable.\n\nWith years of experience in the industry, our team of skilled designers brings creativity, expertise, and attention to detail to every project. We handle everything from concept development to final implementation, ensuring a seamless and stress-free experience for our clients.",
  planningWork: {
    title: "Our Planning Process",
    description:
      "We follow a comprehensive planning process to ensure that every aspect of your project is carefully considered and executed to perfection.",
    features: [
      "Initial consultation to understand your needs and preferences",
      "Site assessment and measurements",
      "Concept development and mood boards",
      "Space planning and layout optimization",
      "Material and finish selection",
      "Furniture and accessory sourcing",
      "Project management and implementation",
    ],
  },
  additionalInfo:
    "We pride ourselves on delivering exceptional results that exceed our clients' expectations. Our commitment to quality, creativity, and customer satisfaction has earned us a reputation as one of the leading interior design firms in the region.",
  additionalFeatures: [
    "Customized design solutions tailored to your needs",
    "Transparent pricing with no hidden costs",
    "Timely project completion",
    "Post-project support and maintenance advice",
    "Eco-friendly and sustainable design options",
  ],
  tabContent: {
    materials: {
      title: "Quality Materials",
      image: "/textile-texture-closeups.png",
      content:
        "We source only the highest quality materials for our projects, ensuring durability, aesthetics, and value for money. Our extensive network of suppliers allows us to offer a wide range of options to suit different styles and budgets.\n\nFrom premium hardwoods and natural stones to eco-friendly alternatives and innovative synthetic materials, we carefully select each element to create spaces that are not only beautiful but also built to last.",
    },
    design: {
      title: "Interior Design",
      image: "/modern-living-space.png",
      content:
        "Our design philosophy centers around creating spaces that reflect the personality and lifestyle of our clients while optimizing functionality and comfort. We blend timeless principles with contemporary trends to deliver designs that stand the test of time.\n\nWhether you prefer minimalist modern, classic traditional, or eclectic fusion styles, our designers have the expertise to bring your vision to life with creativity and precision.",
    },
    care: {
      title: "Personal Care",
      image: "/self-care-essentials.png",
      content:
        "We believe in providing personalized attention to each client, taking the time to understand your unique needs and preferences. Our client-centered approach ensures that your voice is heard throughout the design process.\n\nFrom the initial consultation to the final walkthrough, we maintain open communication and transparency, keeping you informed and involved at every stage of your project.",
    },
    support: {
      title: "Super Support",
      image: "/placeholder.svg?height=300&width=400&query=customer support",
      content:
        "Our commitment to excellence extends beyond project completion. We offer comprehensive support services to ensure that you continue to enjoy your newly designed space for years to come.\n\nFrom maintenance advice and troubleshooting to future updates and renovations, our team is always available to assist you with any questions or concerns you may have.",
      hasForm: true,
    },
  },
}
