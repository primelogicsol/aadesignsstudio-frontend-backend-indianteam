"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronUp, Phone, Mail, MapPin, Clock, ChevronRight, ArrowRight } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import ContactForm from "@/app/components/layout/contactform"

// Define the types for the industry data
interface IndustryFeature {
  title: string
  description: string
  image?: string
}

interface IndustrySolution {
  title: string
  description: string
  image?: string
  items?: string[]
}

interface IndustryStatus {
  title: string
  items: string[]
}

interface IndustryBenefit {
  title: string
  description: string
}

interface IndustryFAQ {
  question: string
  answer: string
}

interface IndustryDetailData {
  id?: string
  title: string
  subtitle?: string
  description?: {
    intro: string[]
    conclusion?: string
  }
  industryStatus?: IndustryStatus
  challenges?: string[]
  requirements?: string[]
  solutions?: IndustrySolution[]
  benefits?: IndustryBenefit[]
  features?: IndustryFeature[]
  faq?: IndustryFAQ[]
  heroImage?: string
  sidebarImage?: string
}

interface IndustryDetailBodyProps {
  data?: IndustryDetailData
  type?: "industry" | "service"
  parentTitle?: string
  parentPath?: string
  category?: string
  categoryPath?: string
}

export default function IndustryDetailBody({
  data,
  type = "industry",
  parentTitle,
  parentPath,
  category = "Industries",
  categoryPath = "/industries",
}: IndustryDetailBodyProps) {
  // Default data to use when no props are provided
  const defaultData: IndustryDetailData = {
    id: "default-industry",
    title: "Industry Solutions",
    subtitle: "Comprehensive Industry Solutions",
    description: {
      intro: [
        "Our industry solutions are designed to address the unique challenges faced by businesses in this sector. We combine deep industry expertise with cutting-edge technology to deliver solutions that drive real business value.",
        "With years of experience working with leading organizations, we understand the specific requirements and pain points of this industry, allowing us to provide tailored solutions that meet your exact needs.",
      ],
      conclusion: "Partner with us to transform your business with innovative industry-specific solutions.",
    },
    industryStatus: {
      title: "Industry Status",
      items: [
        "The industry is experiencing rapid digital transformation",
        "Regulatory requirements are becoming increasingly complex",
        "Customer expectations for digital experiences are at an all-time high",
      ],
    },
    challenges: [
      "Keeping pace with technological advancements",
      "Meeting evolving regulatory requirements",
      "Addressing cybersecurity threats",
      "Improving operational efficiency",
    ],
    requirements: [
      "Scalable and secure infrastructure",
      "Compliance with industry regulations",
      "Seamless integration with existing systems",
      "User-friendly interfaces for all stakeholders",
    ],
    solutions: [
      {
        title: "Digital Transformation",
        items: [
          "Modern technology stack implementation",
          "Legacy system modernization",
          "Cloud migration services",
          "Process automation",
        ],
      },
      {
        title: "Data Analytics",
        items: [
          "Business intelligence solutions",
          "Predictive analytics",
          "Data visualization dashboards",
          "Real-time reporting",
        ],
      },
    ],
    benefits: [
      {
        title: "Increased Efficiency",
        description: "Streamline operations and reduce manual processes",
      },
      {
        title: "Enhanced Security",
        description: "Protect sensitive data with advanced security measures",
      },
      {
        title: "Improved Customer Experience",
        description: "Deliver seamless digital experiences to your customers",
      },
    ],
    features: [
      {
        title: "Cloud-Based Platform",
        description: "Secure, scalable infrastructure for your applications",
        image: "/interconnected-data-flow.png",
      },
      {
        title: "Advanced Analytics",
        description: "Data-driven insights to inform business decisions",
        image: "/abstract-data-flow.png",
      },
    ],
    faq: [
      {
        question: "How long does implementation typically take?",
        answer:
          "Implementation timelines vary based on the complexity of your requirements, but typically range from 2-6 months. We work closely with your team to establish a realistic timeline and ensure a smooth implementation process.",
      },
      {
        question: "Do you provide ongoing support after implementation?",
        answer:
          "Yes, we offer comprehensive support packages that include regular maintenance, updates, and technical support. Our team is available to address any issues and ensure your solution continues to meet your evolving needs.",
      },
      {
        question: "How do you ensure data security and compliance?",
        answer:
          "We implement multiple layers of security including encryption, access controls, and regular security assessments. Our solutions are designed to comply with relevant industry regulations and standards, and we work with your compliance team to ensure all requirements are met.",
      },
    ],
    heroImage: "/interconnected-industries.png",
    sidebarImage: "/tech-innovation-showcase.png",
  }

  // Use provided data or default data
  const industryData = data || defaultData

  const [isSticky, setIsSticky] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({})

  // Ensure we have arrays even if the props are undefined
  const introText = industryData?.description?.intro || ["No description available"]
  const solutions = industryData?.solutions || []
  const faqItems = industryData?.faq || []
  const challenges = industryData?.challenges || []
  const requirements = industryData?.requirements || []
  const statusItems = industryData?.industryStatus?.items || []

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true)
        setShowBackToTop(true)
      } else {
        setIsSticky(false)
        setShowBackToTop(false)
      }

      // Check for elements with data-aos attribute
      const elements = document.querySelectorAll("[data-aos]")
      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top
        const elementBottom = element.getBoundingClientRect().bottom

        if (elementTop < window.innerHeight && elementBottom > 0) {
          setIsVisible((prev) => ({ ...prev, [element.id]: true }))
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <div className="bg-[#003087] py-20 relative transition-all duration-500 ease-in-out animate-fadeIn">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4 text-white animate-slideUp">{industryData.title}</h1>
          <div
            className="flex items-center justify-center space-x-2 text-sm animate-slideUp"
            style={{ animationDelay: "0.2s" }}
          >
            <Link href="/" className="text-white hover:text-orange-500 transition-colors duration-300">
              Home
            </Link>
            <ChevronRight size={16} className="text-white" />
            {category && categoryPath && (
              <>
                <Link href={categoryPath} className="text-white hover:text-orange-500 transition-colors duration-300">
                  {category}
                </Link>
                <ChevronRight size={16} className="text-white" />
              </>
            )}
            {parentTitle && parentPath && (
              <>
                <Link href={parentPath} className="text-white hover:text-orange-500 transition-colors duration-300">
                  {parentTitle}
                </Link>
                <ChevronRight size={16} className="text-white" />
              </>
            )}
            <span className="text-orange-500">{industryData.title}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 order-2 lg:order-1 animate-slideRight">
              <div className="bg-gray-100 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-bold mb-6 pb-4 border-b border-gray-300">All Services</h3>
                <ul className="space-y-4 ">
                  <li>
                    <Link
                      href="/industries/healthcare-and-life"
                      className="flex items-center justify-between text-[#003087] bg-white hover:bg-[#003087] hover:text-[#FF6B35] p-4 rounded-md shadow-sm"
                    >
                      <span>Healthcare & Life Sciences</span>
                      <ArrowRight size={16} />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/industries/finance"
                      className="flex items-center justify-between text-gray-700 hover:text-[#FF6B35] p-4 transition-colors hover:bg-[#003087] rounded-md"
                    >
                      <span>Finance & Banking</span>
                      <ArrowRight size={16} />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/industries/ecommerce-retail"
                      className="flex items-center justify-between text-gray-700 hover:text-[#FF6B35] p-4 transition-colors hover:bg-[#003087] rounded-md"
                    >
                      <span>E-commerce & Retail</span>
                      <ArrowRight size={16} />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/industries/education"
                      className="flex items-center justify-between text-gray-700 hover:text-[#FF6B35] p-4 transition-colors hover:bg-[#003087] rounded-md"
                    >
                      <span>Education & E-Learning</span>
                      <ArrowRight size={16} />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/industries/manufacturing"
                      className="flex items-center justify-between text-gray-700 hover:text-[#FF6B35] p-4 transition-colors hover:bg-[#003087] rounded-md"
                    >
                      <span>Manufacturing & Logistics</span>
                      <ArrowRight size={16} />
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="text-white p-8 rounded-lg transition-all duration-300 bg-[#003087]">
                <h3 className="text-xl text-white font-bold mb-6">Need Help?</h3>
                <p className="mb-6">Contact our customer support team if you have any questions.</p>
                <div className="flex items-center space-x-3 mb-4">
                  <Phone size={20} className="text-[#FF6B35]" />
                  <span>+1 800 123 4567</span>
                </div>
                <div className="flex items-center space-x-3 mb-4">
                  <Mail size={20} className="text-[#FF6B35]" />
                  <span>info@company.com</span>
                </div>
                <div className="flex items-center space-x-3 mb-4">
                  <MapPin size={20} className="text-[#FF6B35]" />
                  <span>123 Main Street, Anytown</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock size={20} className="text-[#FF6B35]" />
                  <span>Mon-Fri: 9:00 - 17:00</span>
                </div>
              </div>

              <div className="mt-8">
                <Image
                  src={industryData.sidebarImage || "/placeholder.svg?height=400&width=300&query=industry brochure"}
                  alt="Industry Brochure"
                  width={300}
                  height={400}
                  className="w-full rounded-lg"
                />
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <div className="space-y-8">
                {/* Hero Image */}
                <div
                  data-aos="fade-up"
                  id="section-1"
                  className={`transition-all duration-500 transform ${
                    isVisible["section-1"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  }`}
                >
                  <Image
                    src={industryData.heroImage || "/placeholder.svg?height=500&width=800&query=industry solutions"}
                    alt={industryData.title}
                    width={800}
                    height={500}
                    className="w-full rounded-lg mb-8 transition-transform duration-300 hover:scale-[1.02]"
                  />
                </div>

                {/* Introduction */}
                <div
                  data-aos="fade-up"
                  id="section-2"
                  className={`transition-all duration-500 delay-100 transform ${
                    isVisible["section-2"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  }`}
                >
                  <h2 className="text-3xl font-bold mb-6">{industryData.subtitle || industryData.title}</h2>
                  {introText.map((paragraph, index) => (
                    <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Industry Status Section */}
                <div
                  data-aos="fade-up"
                  id="section-3"
                  className={`transition-all duration-500 delay-200 transform ${
                    isVisible["section-3"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  }`}
                >
                  <div className="py-12">
                    <motion.h2
                      className="text-3xl font-bold mb-8 text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      Industry Status, Challenges & Requirements
                    </motion.h2>

                    <motion.div
                      className="grid grid-cols-1 md:grid-cols-3 gap-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ staggerChildren: 0.1 }}
                    >
                      {/* Industry Status Card */}
                      <motion.div
                        className="bg-white rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl hover:bg-[#003087] hover:text-white group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="flex items-center mb-4">
                          <ChevronRight className="w-6 h-6 text-[#003087] group-hover:text-white mr-2" />
                          <h3 className="text-xl font-bold">Industry Status</h3>
                        </div>
                        <div className="space-y-4">
                          {statusItems.length > 0 ? (
                            statusItems.map((item, index) => (
                              <motion.div key={index} className="transition-all duration-300">
                                <p className="text-sm text-gray-600 group-hover:text-white">{item}</p>
                              </motion.div>
                            ))
                          ) : (
                            <p className="text-sm text-gray-600 group-hover:text-white">
                              No industry status information available.
                            </p>
                          )}
                        </div>
                      </motion.div>

                      {/* Industry Challenges Card */}
                      <motion.div
                        className="bg-white rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl hover:bg-[#003087] hover:text-white group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        <div className="flex items-center mb-4">
                          <ChevronRight className="w-6 h-6 text-[#003087] group-hover:text-white mr-2" />
                          <h3 className="text-xl font-bold">Industry Challenges</h3>
                        </div>
                        <div className="space-y-4">
                          {challenges.length > 0 ? (
                            challenges.map((challenge, index) => (
                              <motion.div key={index} className="transition-all duration-300">
                                <p className="text-sm text-gray-600 group-hover:text-white">{challenge}</p>
                              </motion.div>
                            ))
                          ) : (
                            <p className="text-sm text-gray-600 group-hover:text-white">
                              No industry challenges information available.
                            </p>
                          )}
                        </div>
                      </motion.div>

                      {/* Industry Requirements Card */}
                      <motion.div
                        className="bg-white rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl hover:bg-[#003087] hover:text-white group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <div className="flex items-center mb-4">
                          <ChevronRight className="w-6 h-6 text-[#003087] group-hover:text-white mr-2" />
                          <h3 className="text-xl font-bold">Industry Requirements</h3>
                        </div>
                        <div className="space-y-4">
                          {requirements.length > 0 ? (
                            requirements.map((requirement, index) => (
                              <motion.div key={index} className="transition-all duration-300">
                                <p className="text-sm text-gray-600 group-hover:text-white">{requirement}</p>
                              </motion.div>
                            ))
                          ) : (
                            <p className="text-sm text-gray-600 group-hover:text-white">
                              No industry requirements information available.
                            </p>
                          )}
                        </div>
                      </motion.div>
                    </motion.div>

                    <motion.p
                      className="mt-8 text-center text-gray-700"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <span className="text-[#003087] font-bold">💡 Our Company</span> delivers tailored technology
                      solutions to meet these evolving industry demands.
                    </motion.p>
                  </div>
                </div>

                {/* Solutions Cards */}
                {solutions.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {solutions.map((solution, index) => (
                      <motion.div
                        key={index}
                        className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-[#003087] hover:border-[#003087] group"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <h4 className="text-xl font-bold mb-4 group-hover:text-white transition-colors duration-300">
                          {solution.title}
                        </h4>
                        {solution.description && (
                          <p className="mb-4 text-gray-700 group-hover:text-gray-200">{solution.description}</p>
                        )}
                        {solution.items && solution.items.length > 0 && (
                          <ul className="space-y-2">
                            {solution.items.map((item, itemIndex) => (
                              <li key={itemIndex} className="flex items-start">
                                <div className="flex-shrink-0 w-5 h-5 bg-[#003087] rounded-full mt-1 mr-3 flex items-center justify-center group-hover:bg-[#FF6B35]">
                                  <div className="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                                <span className="text-gray-700 group-hover:text-white transition-colors duration-300">
                                  {item}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}
                        {solution.image && (
                          <div className="mt-4">
                            <Image
                              src={solution.image || "/placeholder.svg"}
                              alt={solution.title}
                              width={300}
                              height={200}
                              className="w-full rounded-lg object-cover"
                            />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Benefits Section */}
                {industryData.benefits && industryData.benefits.length > 0 && (
                  <div className="bg-gray-100 p-8 rounded-lg mb-8">
                    <h3 className="text-2xl font-bold mb-6">Key Benefits</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {industryData.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start">
                          <div className="flex-shrink-0 w-10 h-10 bg-[#003087] rounded-full flex items-center justify-center mr-4">
                            <span className="text-white font-bold">{index + 1}</span>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold mb-2">{benefit.title}</h4>
                            <p className="text-gray-700">{benefit.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Features Section */}
                {industryData.features && industryData.features.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold mb-6">Key Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {industryData.features.map((feature, index) => (
                        <div key={index} className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
                          <h4 className="text-xl font-bold mb-4">📌 {feature.title}</h4>
                          <p className="text-gray-700 mb-4">{feature.description}</p>
                          {feature.image && (
                            <Image
                              src={feature.image || "/placeholder.svg"}
                              alt={feature.title}
                              width={300}
                              height={150}
                              className="w-full rounded-lg"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* FAQ Section */}
                {faqItems.length > 0 && (
                  <div className="border-t border-b border-gray-200 py-8 my-8">
                    <h3 className="text-2xl font-bold mb-6">Frequently Asked Questions</h3>
                    <Accordion type="single" collapsible className="space-y-4">
                      {faqItems.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className="border-none">
                          <AccordionTrigger className="hover:bg-[#003087] hover:text-white p-4 rounded-lg transition-all duration-300 [&[data-state=open]]:bg-[#003087] [&[data-state=open]]:text-white">
                            <div className="flex items-center text-black hover:text-white gap-2 text-left">
                              <span className="text-xl font-bold">📌 {item.question}</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-4 pt-2 pb-4">
                            <p className="text-gray-700">{item.answer}</p>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                )}

                {/* Contact Form */}
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Back to Top Button */}
      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 rounded-full w-12 h-12 p-0"
          size="icon"
          variant="default"
        >
          <ChevronUp className="w-6 h-6" />
        </Button>
      )}

      {/* Animation Styles */}
      <style jsx global>{`
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes slideRight {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-slideDown { animation: slideDown 0.5s ease-in-out; }
        .animate-slideUp { animation: slideUp 0.5s ease-in-out; }
        .animate-slideRight { animation: slideRight 0.5s ease-in-out; }
        .animate-fadeIn { animation: fadeIn 0.5s ease-in-out; }

        /* Interactive elements transitions */
        a, button { transition: all 0.3s ease-in-out; }

        /* Enhanced hover effects */
        .hover-lift { transition: transform 0.3s ease-in-out; }
        .hover-lift:hover { transform: translateY(-5px); }

        /* Smooth scroll behavior */
        html { scroll-behavior: smooth; }

        /* Card hover effects */
        .card-hover {
          transition: all 0.3s ease-in-out;
        }
        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  )
}
