"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronUp, ChevronRight } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import ContactForm from "@/app/components/layout/contactform"

// Editable IndustryDetailBody component
export default function IndustryDetailBodyEditor({
  data,
  type = "industry",
  parentTitle,
  parentPath,
  category = "Industries",
  categoryPath = "/industries",
  categoryId,
  itemId,
  subitemId,
}) {
  // Default values
  const defaultData = data || {
    id: "default-industry",
    title: "Industry Solutions",
    subtitle: "Comprehensive Industry Solutions",
    description: { intro: [""], conclusion: "" },
    industryStatus: { title: "Industry Status", items: [""] },
    challenges: [""],
    requirements: [""],
    solutions: [{ title: "", description: "", items: [""] }],
    benefits: [{ title: "", description: "" }],
    features: [{ title: "", description: "", image: "" }],
    faq: [{ question: "", answer: "" }],
    heroImage: "",
    sidebarImage: "",
  }

  const [formData, setFormData] = useState(defaultData)
  const [isSticky, setIsSticky] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [isVisible, setIsVisible] = useState({})
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")

  // Generic update helper for nested fields
  const updateField = (path, value) => {
    setFormData((prev) => {
      const next = JSON.parse(JSON.stringify(prev))
      const keys = path.split(".")
      let obj = next
      keys.slice(0, -1).forEach((key) => {
        obj = obj[key]
      })
      obj[keys[keys.length - 1]] = value
      return next
    })
  }

  // Handle saving the data
  const handleSave = async () => {
    try {
      setIsSaving(true)
      setSaveMessage("Saving...")

      const response = await fetch("/api/industry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          categoryId,
          itemId,
          subitemId,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to save industry data")
      }

      setSaveMessage("Saved successfully!")
      setTimeout(() => setSaveMessage(""), 3000)
    } catch (error) {
      console.error("Error saving industry data:", error)
      setSaveMessage("Error saving data")
      setTimeout(() => setSaveMessage(""), 3000)
    } finally {
      setIsSaving(false)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100)
      setShowBackToTop(window.scrollY > 100)
      document.querySelectorAll("[data-aos]").forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setIsVisible((prev) => ({ ...prev, [el.id]: true }))
        }
      })
    }
    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <div className="font-sans text-gray-800">
      {/* Sticky Save Button */}
      {isSticky && (
        <div className="fixed top-0 left-0 right-0 bg-white z-50 shadow-md p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Editing: {formData.title}</h2>
          <div className="flex items-center gap-4">
            {saveMessage && (
              <span className={saveMessage.includes("Error") ? "text-red-500" : "text-green-500"}>{saveMessage}</span>
            )}
            <Button onClick={handleSave} disabled={isSaving} className="bg-[#003087] hover:bg-[#002060]">
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="bg-[#003087] py-20 animate-fadeIn">
        <div className="container mx-auto px-4 text-center">
          <h1
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => updateField("title", e.currentTarget.textContent || "")}
            className="text-4xl font-bold mb-4 text-white animate-slideUp"
          >
            {formData.title}
          </h1>

          {/* Hero Image URL Input */}
          <div className="mb-4 flex justify-center">
            <div className="bg-white rounded-lg p-2 w-full max-w-md flex">
              <input
                type="text"
                placeholder="Hero Image URL"
                value={formData.heroImage || ""}
                onChange={(e) => updateField("heroImage", e.target.value)}
                className="flex-1 p-2 outline-none"
              />
            </div>
          </div>

          {/* Display Hero Image if available */}
          {formData.heroImage && (
            <div className="mb-6">
              <Image
                src={formData.heroImage || "/placeholder.svg"}
                alt="Hero"
                width={800}
                height={400}
                className="mx-auto rounded-lg"
              />
            </div>
          )}

          <div
            className="flex items-center justify-center space-x-2 text-sm animate-slideUp"
            style={{ animationDelay: "0.2s" }}
          >
            <Link href="/" className="text-white hover:text-orange-500">
              Home
            </Link>
            <ChevronRight size={16} className="text-white" />
            <Link href={categoryPath} className="text-white hover:text-orange-500">
              <span
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => updateField("category", e.currentTarget.textContent || "")}
              >
                {category}
              </span>
            </Link>
            <ChevronRight size={16} className="text-white" />
            <span className="text-orange-500">{formData.title}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="py-16">
        <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <aside className="order-2 lg:order-1 space-y-8">
            {/* Services List Title */}
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => updateField("sidebarTitle", e.currentTarget.textContent || "")}
                className="text-xl font-bold mb-6 border-b border-gray-300 pb-4"
              >
                {formData.sidebarTitle || "All Services"}
              </h3>
            </div>

            {/* Contact Info */}
            <div className="bg-[#003087] text-white p-8 rounded-lg">
              <h3
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => updateField("contactTitle", e.currentTarget.textContent || "")}
                className="text-xl font-bold mb-6"
              >
                {formData.contactTitle || "Need Help?"}
              </h3>
              <p
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => updateField("contactText", e.currentTarget.textContent || "")}
                className="mb-6"
              >
                {formData.contactText || "Contact our customer support team if you have any questions."}
              </p>
            </div>

            {/* Sidebar Image URL Input */}
            <div className="mb-4">
              <div className="bg-white rounded-lg p-2 w-full flex">
                <input
                  type="text"
                  placeholder="Sidebar Image URL"
                  value={formData.sidebarImage || ""}
                  onChange={(e) => updateField("sidebarImage", e.target.value)}
                  className="flex-1 p-2 outline-none border rounded-l-lg"
                />
              </div>
            </div>

            {/* Sidebar Image */}
            {formData.sidebarImage && (
              <Image
                src={formData.sidebarImage || "/placeholder.svg"}
                alt=""
                width={300}
                height={400}
                className="w-full rounded-lg"
              />
            )}
          </aside>

          {/* Content Area */}
          <section className="lg:col-span-2 order-1 lg:order-2 space-y-8">
            {/* Introduction */}
            <div
              data-aos="fade-up"
              id="section-2"
              className={isVisible["section-2"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
            >
              <h2
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => updateField("subtitle", e.currentTarget.textContent || "")}
                className="text-3xl font-bold mb-6"
              >
                {formData.subtitle}
              </h2>

              {/* Introduction Paragraphs */}
              {formData.description.intro.map((para, i) => (
                <div key={i} className="mb-4 relative group">
                  <p
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => updateField(`description.intro.${i}`, e.currentTarget.textContent || "")}
                    className="text-gray-700"
                  >
                    {para}
                  </p>
                </div>
              ))}

              {/* Add Paragraph Button */}
              <Button
                onClick={() => {
                  const newIntro = [...formData.description.intro, "New paragraph"]
                  updateField("description.intro", newIntro)
                }}
                variant="outline"
                size="sm"
                className="mt-2"
              >
                Add Paragraph
              </Button>

              <p
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => updateField("description.conclusion", e.currentTarget.textContent || "")}
                className="mt-4 text-gray-700 italic"
              >
                {formData.description.conclusion}
              </p>
            </div>

            {/* Status, Challenges & Requirements */}
            <div
              data-aos="fade-up"
              id="section-3"
              className={isVisible["section-3"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
            >
              <motion.h2
                className="text-3xl font-bold mb-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Industry Status, Challenges & Requirements
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {["industryStatus", "challenges", "requirements"].map((section, idx) => {
                  const title =
                    section === "industryStatus"
                      ? formData.industryStatus.title
                      : section.charAt(0).toUpperCase() + section.slice(1)
                  const items = section === "industryStatus" ? formData.industryStatus.items : formData[section]
                  return (
                    <div key={section} className="bg-white rounded-lg shadow-lg p-6">
                      <div className="flex items-center mb-4">
                        <ChevronRight className="w-6 h-6 text-[#003087] mr-2" />
                        <h3
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) => {
                            if (section === "industryStatus")
                              updateField("industryStatus.title", e.currentTarget.textContent || "")
                          }}
                          className="text-xl font-bold"
                        >
                          {title}
                        </h3>
                      </div>
                      <div className="space-y-4">
                        {items.map((item, i) => (
                          <p
                            key={i}
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={(e) =>
                              updateField(
                                `${section === "industryStatus" ? "industryStatus.items" : section}.${i}`,
                                e.currentTarget.textContent || "",
                              )
                            }
                            className="text-sm text-gray-600"
                          >
                            {item}
                          </p>
                        ))}

                        {/* Add Item Button */}
                        <Button
                          onClick={() => {
                            if (section === "industryStatus") {
                              const newItems = [...formData.industryStatus.items, "New status item"]
                              updateField("industryStatus.items", newItems)
                            } else {
                              const newItems = [...formData[section], "New item"]
                              updateField(section, newItems)
                            }
                          }}
                          variant="outline"
                          size="sm"
                          className="mt-2 w-full"
                        >
                          Add Item
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Solutions */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Solutions</h3>
              {formData.solutions.map((sol, idx) => (
                <div key={idx} className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm mb-6">
                  <h4
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => updateField(`solutions.${idx}.title`, e.currentTarget.textContent || "")}
                    className="text-xl font-bold mb-4"
                  >
                    {sol.title}
                  </h4>
                  <p
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => updateField(`solutions.${idx}.description`, e.currentTarget.textContent || "")}
                    className="mb-4 text-gray-700"
                  >
                    {sol.description}
                  </p>

                  {/* Solution Items */}
                  {sol.items &&
                    sol.items.map((item, j) => (
                      <div key={j} className="flex items-start mb-2">
                        <div className="flex-shrink-0 w-5 h-5 bg-[#003087] rounded-full mt-1 mr-3"></div>
                        <p
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) => updateField(`solutions.${idx}.items.${j}`, e.currentTarget.textContent || "")}
                          className="text-gray-700"
                        >
                          {item}
                        </p>
                      </div>
                    ))}

                  {/* Add Solution Item Button */}
                  <Button
                    onClick={() => {
                      const newItems = [...(sol.items || []), "New solution item"]
                      updateField(`solutions.${idx}.items`, newItems)
                    }}
                    variant="outline"
                    size="sm"
                    className="mt-2 mb-4"
                  >
                    Add Solution Item
                  </Button>

                  {/* Solution Image URL Input */}
                  <div className="mt-4">
                    <div className="bg-white rounded-lg p-2 w-full flex">
                      <input
                        type="text"
                        placeholder="Solution Image URL"
                        value={sol.image || ""}
                        onChange={(e) => updateField(`solutions.${idx}.image`, e.target.value)}
                        className="flex-1 p-2 outline-none border rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Display Solution Image if available */}
                  {sol.image && (
                    <Image
                      src={sol.image || "/placeholder.svg"}
                      alt=""
                      width={300}
                      height={200}
                      className="w-full rounded-lg mt-4"
                    />
                  )}
                </div>
              ))}

              {/* Add Solution Button */}
              <Button
                onClick={() => {
                  const newSolutions = [
                    ...formData.solutions,
                    {
                      title: "New Solution",
                      description: "Solution description",
                      items: ["Solution item"],
                      image: "",
                    },
                  ]
                  updateField("solutions", newSolutions)
                }}
                variant="outline"
                className="mt-2"
              >
                Add Solution
              </Button>
            </div>

            {/* Benefits */}
            <div className="bg-gray-100 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-6">Key Benefits</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {formData.benefits.map((ben, i) => (
                  <div key={i} className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-[#003087] rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold">{i + 1}</span>
                    </div>
                    <div>
                      <h4
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => updateField(`benefits.${i}.title`, e.currentTarget.textContent || "")}
                        className="text-lg font-semibold mb-2"
                      >
                        {ben.title}
                      </h4>
                      <p
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => updateField(`benefits.${i}.description`, e.currentTarget.textContent || "")}
                        className="text-gray-700"
                      >
                        {ben.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Benefit Button */}
              <Button
                onClick={() => {
                  const newBenefits = [
                    ...formData.benefits,
                    {
                      title: "New Benefit",
                      description: "Benefit description",
                    },
                  ]
                  updateField("benefits", newBenefits)
                }}
                variant="outline"
                className="mt-6"
              >
                Add Benefit
              </Button>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Key Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {formData.features.map((feat, i) => (
                  <div key={i} className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
                    <h4
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => updateField(`features.${i}.title`, e.currentTarget.textContent || "")}
                      className="text-xl font-bold mb-4"
                    >
                      {feat.title}
                    </h4>
                    <p
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => updateField(`features.${i}.description`, e.currentTarget.textContent || "")}
                      className="text-gray-700 mb-4"
                    >
                      {feat.description}
                    </p>

                    {/* Feature Image URL Input */}
                    <div className="mt-4">
                      <div className="bg-white rounded-lg p-2 w-full flex">
                        <input
                          type="text"
                          placeholder="Feature Image URL"
                          value={feat.image || ""}
                          onChange={(e) => updateField(`features.${i}.image`, e.target.value)}
                          className="flex-1 p-2 outline-none border rounded-lg"
                        />
                      </div>
                    </div>

                    {/* Display Feature Image if available */}
                    {feat.image && (
                      <Image
                        src={feat.image || "/placeholder.svg"}
                        alt=""
                        width={300}
                        height={150}
                        className="w-full rounded-lg mt-4"
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Add Feature Button */}
              <Button
                onClick={() => {
                  const newFeatures = [
                    ...formData.features,
                    {
                      title: "New Feature",
                      description: "Feature description",
                      image: "",
                    },
                  ]
                  updateField("features", newFeatures)
                }}
                variant="outline"
                className="mt-6"
              >
                Add Feature
              </Button>
            </div>

            {/* FAQ */}
            <div className="border-t border-b border-gray-200 py-8 my-8">
              <h3 className="text-2xl font-bold mb-6">Frequently Asked Questions</h3>
              <Accordion type="single" collapsible className="space-y-4">
                {formData.faq.map((item, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border-none">
                    <AccordionTrigger className="hover:bg-[#003087] hover:text-white p-4 rounded-lg">
                      <span className="text-xl font-bold">📌 </span>
                      <span
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => updateField(`faq.${i}.question`, e.currentTarget.textContent || "")}
                      >
                        {item.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pt-2 pb-4">
                      <p
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => updateField(`faq.${i}.answer`, e.currentTarget.textContent || "")}
                        className="text-gray-700"
                      >
                        {item.answer}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {/* Add FAQ Button */}
              <Button
                onClick={() => {
                  const newFaq = [
                    ...formData.faq,
                    {
                      question: "New Question?",
                      answer: "Answer to the question.",
                    },
                  ]
                  updateField("faq", newFaq)
                }}
                variant="outline"
                className="mt-6"
              >
                Add FAQ
              </Button>
            </div>

            {/* Contact Form */}
            <ContactForm />

            {/* Save Button */}
            <div className="mt-6 text-center">
              {saveMessage && (
                <p className={saveMessage.includes("Error") ? "text-red-500 mb-2" : "text-green-500 mb-2"}>
                  {saveMessage}
                </p>
              )}
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-[#003087] hover:bg-[#002060] text-white px-8 py-3 text-lg"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </section>
        </div>
      </main>

      {/* Back to Top Button */}
      {showBackToTop && (
        <Button onClick={scrollToTop} className="fixed bottom-6 right-6 rounded-full" size="icon">
          <ChevronUp />
        </Button>
      )}

      {/* Global Animations */}
      <style jsx global>{`
        @keyframes slideDown { from { transform: translateY(-100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes slideRight { from { transform: translateX(-20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-slideDown { animation: slideDown 0.5s ease-in-out; }
        .animate-slideUp { animation: slideUp 0.5s ease-in-out; }
        .animate-slideRight { animation: slideRight 0.5s ease-in-out; }
        .animate-fadeIn { animation: fadeIn 0.5s ease-in-out; }
        a, button { transition: all 0.3s ease-in-out; }
        .hover-lift { transition: transform 0.3s ease-in-out; }
        .hover-lift:hover { transform: translateY(-5px); }
        html { scroll-behavior: smooth; }
        .card-hover { transition: all 0.3s ease-in-out; }
        .card-hover:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
      `}</style>
    </div>
  )
}
