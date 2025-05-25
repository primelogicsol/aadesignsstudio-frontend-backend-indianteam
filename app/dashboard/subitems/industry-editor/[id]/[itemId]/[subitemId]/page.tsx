// // // // "use client"

// // // // import { useState, useEffect, Fragment } from "react"
// // // // import Image from "next/image"
// // // // import Link from "next/link"
// // // // import { ChevronUp, Phone, Mail, MapPin, Clock, ChevronRight, ArrowRight } from "lucide-react"
// // // // import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
// // // // import { Button } from "@/components/ui/button"
// // // // import { motion } from "framer-motion"
// // // // import ContactForm from "@/app/components/layout/contactform"

// // // // // Editable IndustryDetailBody component
// // // // export default function IndustryDetailBody({ data, type = "industry", parentTitle, parentPath, category = "Industries", categoryPath = "/industries" }) {
// // // //   // Default values
// // // //   const defaultData = data || {
// // // //     id: "default-industry",
// // // //     title: "Industry Solutions",
// // // //     subtitle: "Comprehensive Industry Solutions",
// // // //     description: { intro: [""], conclusion: "" },
// // // //     industryStatus: { title: "Industry Status", items: [""] },
// // // //     challenges: [""],
// // // //     requirements: [""],
// // // //     solutions: [{ title: "", description: "", items: [""] }],
// // // //     benefits: [{ title: "", description: "" }],
// // // //     features: [{ title: "", description: "", image: "" }],
// // // //     faq: [{ question: "", answer: "" }],
// // // //     heroImage: "",
// // // //     sidebarImage: ""
// // // //   }

// // // //   const [formData, setFormData] = useState(defaultData)
// // // //   const [isSticky, setIsSticky] = useState(false)
// // // //   const [showBackToTop, setShowBackToTop] = useState(false)
// // // //   const [isVisible, setIsVisible] = useState({})

// // // //   // Generic update helper for nested fields
// // // //   const updateField = (path, value) => {
// // // //     setFormData(prev => {
// // // //       const next = JSON.parse(JSON.stringify(prev))
// // // //       const keys = path.split('.')
// // // //       let obj = next
// // // //       keys.slice(0, -1).forEach(key => {
// // // //         obj = obj[key]
// // // //       })
// // // //       obj[keys[keys.length - 1]] = value
// // // //       return next
// // // //     })
// // // //   }

// // // //   useEffect(() => {
// // // //     const handleScroll = () => {
// // // //       setIsSticky(window.scrollY > 100)
// // // //       setShowBackToTop(window.scrollY > 100)
// // // //       document.querySelectorAll("[data-aos]").forEach(el => {
// // // //         const rect = el.getBoundingClientRect()
// // // //         if (rect.top < window.innerHeight && rect.bottom > 0) {
// // // //           setIsVisible(prev => ({ ...prev, [el.id]: true }))
// // // //         }
// // // //       })
// // // //     }
// // // //     window.addEventListener("scroll", handleScroll)
// // // //     handleScroll()
// // // //     return () => window.removeEventListener("scroll", handleScroll)
// // // //   }, [])

// // // //   const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

// // // //   return (
// // // //     <div className="font-sans text-gray-800">
// // // //       {/* Hero Section */}
// // // //       <div className="bg-[#003087] py-20 animate-fadeIn">
// // // //         <div className="container mx-auto px-4 text-center">
// // // //           <h1
// // // //             contentEditable
// // // //             suppressContentEditableWarning
// // // //             onBlur={e => updateField('title', e.currentTarget.textContent || '')}
// // // //             className="text-4xl font-bold mb-4 text-white animate-slideUp"
// // // //           >{formData.title}</h1>
// // // //           <div className="flex items-center justify-center space-x-2 text-sm animate-slideUp" style={{ animationDelay: '0.2s' }}>
// // // //             <Link href="/" className="text-white hover:text-orange-500">Home</Link>
// // // //             <ChevronRight size={16} className="text-white" />
// // // //             <Link href={categoryPath} className="text-white hover:text-orange-500">
// // // //               <span
// // // //                 contentEditable
// // // //                 suppressContentEditableWarning
// // // //                 onBlur={e => updateField('category', e.currentTarget.textContent || '')}
// // // //               >{category}</span>
// // // //             </Link>
// // // //             <ChevronRight size={16} className="text-white" />
// // // //             <span className="text-orange-500">{formData.title}</span>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       {/* Main Content */}
// // // //       <main className="py-16">
// // // //         <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-8">

// // // //           {/* Sidebar */}
// // // //           <aside className="order-2 lg:order-1 space-y-8">
// // // //             {/* Services List Title */}
// // // //             <div className="bg-gray-100 p-6 rounded-lg">
// // // //               <h3
// // // //                 contentEditable
// // // //                 suppressContentEditableWarning
// // // //                 onBlur={e => updateField('sidebarTitle', e.currentTarget.textContent || '')}
// // // //                 className="text-xl font-bold mb-6 border-b border-gray-300 pb-4"
// // // //               >{formData.sidebarTitle || 'All Services'}</h3>
// // // //             </div>

// // // //             {/* Contact Info */}
// // // //             <div className="bg-[#003087] text-white p-8 rounded-lg">
// // // //               <h3
// // // //                 contentEditable
// // // //                 suppressContentEditableWarning
// // // //                 onBlur={e => updateField('contactTitle', e.currentTarget.textContent || '')}
// // // //                 className="text-xl font-bold mb-6"
// // // //               >{formData.contactTitle || 'Need Help?'}</h3>
// // // //               <p
// // // //                 contentEditable
// // // //                 suppressContentEditableWarning
// // // //                 onBlur={e => updateField('contactText', e.currentTarget.textContent || '')}
// // // //                 className="mb-6"
// // // //               >{formData.contactText || 'Contact our customer support team if you have any questions.'}</p>
// // // //               {/* Add editable phone, mail, address, hours if desired */}
// // // //             </div>

// // // //             {/* Sidebar Image */}
// // // //             <Image
// // // //               src={formData.sidebarImage || '/placeholder.svg'}
// // // //               alt=""
// // // //               width={300}
// // // //               height={400}
// // // //               className="w-full rounded-lg"
// // // //             />
// // // //           </aside>

// // // //           {/* Content Area */}
// // // //           <section className="lg:col-span-2 order-1 lg:order-2 space-y-8">

// // // //             {/* Hero Image */}
// // // //             <div data-aos="fade-up" id="section-1" className={isVisible['section-1'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}>
// // // //               <Image
// // // //                 src={formData.heroImage || '/placeholder.svg'}
// // // //                 alt=""
// // // //                 width={800}
// // // //                 height={500}
// // // //                 className="w-full rounded-lg mb-8"
// // // //               />
// // // //             </div>

// // // //             {/* Introduction */}
// // // //             <div data-aos="fade-up" id="section-2" className={isVisible['section-2'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}>
// // // //               <h2
// // // //                 contentEditable
// // // //                 suppressContentEditableWarning
// // // //                 onBlur={e => updateField('subtitle', e.currentTarget.textContent || '')}
// // // //                 className="text-3xl font-bold mb-6"
// // // //               >{formData.subtitle}</h2>
// // // //               {formData.description.intro.map((para, i) => (
// // // //                 <p
// // // //                   key={i}
// // // //                   contentEditable
// // // //                   suppressContentEditableWarning
// // // //                   onBlur={e => updateField(`description.intro.${i}`, e.currentTarget.textContent || '')}
// // // //                   className="mb-4 text-gray-700"
// // // //                 >{para}</p>
// // // //               ))}
// // // //               <p
// // // //                 contentEditable
// // // //                 suppressContentEditableWarning
// // // //                 onBlur={e => updateField('description.conclusion', e.currentTarget.textContent || '')}
// // // //                 className="mt-4 text-gray-700 italic"
// // // //               >{formData.description.conclusion}</p>
// // // //             </div>

// // // //             {/* Status, Challenges & Requirements */}
// // // //             <div data-aos="fade-up" id="section-3" className={isVisible['section-3'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}>
// // // //               <motion.h2 className="text-3xl font-bold mb-8 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>Industry Status, Challenges & Requirements</motion.h2>
// // // //               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // // //                 {['industryStatus', 'challenges', 'requirements'].map((section, idx) => {
// // // //                   const title = section === 'industryStatus' ? formData.industryStatus.title : section.charAt(0).toUpperCase() + section.slice(1)
// // // //                   const items = section === 'industryStatus' ? formData.industryStatus.items : formData[section]
// // // //                   return (
// // // //                     <div key={section} className="bg-white rounded-lg shadow-lg p-6">
// // // //                       <div className="flex items-center mb-4">
// // // //                         <ChevronRight className="w-6 h-6 text-[#003087] mr-2" />
// // // //                         <h3
// // // //                           contentEditable
// // // //                           suppressContentEditableWarning
// // // //                           onBlur={e => {
// // // //                             if(section==='industryStatus') updateField('industryStatus.title', e.currentTarget.textContent||'')
// // // //                           }}
// // // //                           className="text-xl font-bold"
// // // //                         >{title}</h3>
// // // //                       </div>
// // // //                       <div className="space-y-4">
// // // //                         {items.map((item, i) => (
// // // //                           <p
// // // //                             key={i}
// // // //                             contentEditable
// // // //                             suppressContentEditableWarning
// // // //                             onBlur={e => updateField(`${section === 'industryStatus' ? 'industryStatus.items' : section}.${i}`, e.currentTarget.textContent || '')}
// // // //                             className="text-sm text-gray-600"
// // // //                           >{item}</p>
// // // //                         ))}
// // // //                       </div>
// // // //                     </div>
// // // //                   )
// // // //                 })}
// // // //               </div>
// // // //             </div>

// // // //             {/* Solutions */}
// // // //             {formData.solutions.map((sol, idx) => (
// // // //               <div key={idx} className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
// // // //                 <h4
// // // //                   contentEditable
// // // //                   suppressContentEditableWarning
// // // //                   onBlur={e => updateField(`solutions.${idx}.title`, e.currentTarget.textContent || '')}
// // // //                   className="text-xl font-bold mb-4"
// // // //                 >{sol.title}</h4>
// // // //                 <p
// // // //                   contentEditable
// // // //                   suppressContentEditableWarning
// // // //                   onBlur={e => updateField(`solutions.${idx}.description`, e.currentTarget.textContent || '')}
// // // //                   className="mb-4 text-gray-700"
// // // //                 >{sol.description}</p>
// // // //                 {sol.items.map((item, j) => (
// // // //                   <div key={j} className="flex items-start mb-2">
// // // //                     <div className="flex-shrink-0 w-5 h-5 bg-[#003087] rounded-full mt-1 mr-3"></div>
// // // //                     <p
// // // //                       contentEditable
// // // //                       suppressContentEditableWarning
// // // //                       onBlur={e => updateField(`solutions.${idx}.items.${j}`, e.currentTarget.textContent || '')}
// // // //                       className="text-gray-700"
// // // //                     >{item}</p>
// // // //                   </div>
// // // //                 ))}
// // // //                 {sol.image && (
// // // //                   <Image src={sol.image} alt="" width={300} height={200} className="w-full rounded-lg mt-4" />
// // // //                 )}
// // // //               </div>
// // // //             ))}

// // // //             {/* Benefits */}
// // // //             <div className="bg-gray-100 p-8 rounded-lg">
// // // //               <h3 className="text-2xl font-bold mb-6">Key Benefits</h3>
// // // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // //                 {formData.benefits.map((ben, i) => (
// // // //                   <div key={i} className="flex items-start">
// // // //                     <div className="flex-shrink-0 w-10 h-10 bg-[#003087] rounded-full flex items-center justify-center mr-4">
// // // //                       <span className="text-white font-bold">{i+1}</span>
// // // //                     </div>
// // // //                     <div>
// // // //                       <h4
// // // //                         contentEditable
// // // //                         suppressContentEditableWarning
// // // //                         onBlur={e => updateField(`benefits.${i}.title`, e.currentTarget.textContent || '')}
// // // //                         className="text-lg font-semibold mb-2"
// // // //                       >{ben.title}</h4>
// // // //                       <p
// // // //                         contentEditable
// // // //                         suppressContentEditableWarning
// // // //                         onBlur={e => updateField(`benefits.${i}.description`, e.currentTarget.textContent || '')}
// // // //                         className="text-gray-700"
// // // //                       >{ben.description}</p>
// // // //                     </div>
// // // //                   </div>
// // // //                 ))}
// // // //               </div>
// // // //             </div>

// // // //             {/* Features */}
// // // //             <div>
// // // //               <h3 className="text-2xl font-bold mb-6">Key Features</h3>
// // // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // //                 {formData.features.map((feat, i) => (
// // // //                   <div key={i} className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
// // // //                     <h4
// // // //                       contentEditable
// // // //                       suppressContentEditableWarning
// // // //                       onBlur={e => updateField(`features.${i}.title`, e.currentTarget.textContent || '')}
// // // //                       className="text-xl font-bold mb-4"
// // // //                     >{feat.title}</h4>
// // // //                     <p
// // // //                       contentEditable
// // // //                       suppressContentEditableWarning
// // // //                       onBlur={e => updateField(`features.${i}.description`, e.currentTarget.textContent || '')}
// // // //                       className="text-gray-700 mb-4"
// // // //                     >{feat.description}</p>
// // // //                     {feat.image && (
// // // //                       <Image src={feat.image} alt="" width={300} height={150} className="w-full rounded-lg" />
// // // //                     )}
// // // //                   </div>
// // // //                 ))}
// // // //               </div>
// // // //             </div>

// // // //             {/* FAQ */}
// // // //             <div className="border-t border-b border-gray-200 py-8 my-8">
// // // //               <h3 className="text-2xl font-bold mb-6">Frequently Asked Questions</h3>
// // // //               <Accordion type="single" collapsible className="space-y-4">
// // // //                 {formData.faq.map((item, i) => (
// // // //                   <AccordionItem key={i} value={`faq-${i}`} className="border-none">
// // // //                     <AccordionTrigger className="hover:bg-[#003087] hover:text-white p-4 rounded-lg">
// // // //                       <span className="text-xl font-bold">📌 </span>
// // // //                       <span
// // // //                         contentEditable
// // // //                         suppressContentEditableWarning
// // // //                         onBlur={e => updateField(`faq.${i}.question`, e.currentTarget.textContent || '')}
// // // //                       >{item.question}</span>
// // // //                     </AccordionTrigger>
// // // //                     <AccordionContent className="px-4 pt-2 pb-4">
// // // //                       <p
// // // //                         contentEditable
// // // //                         suppressContentEditableWarning
// // // //                         onBlur={e => updateField(`faq.${i}.answer`, e.currentTarget.textContent || '')}
// // // //                         className="text-gray-700"
// // // //                       >{item.answer}</p>
// // // //                     </AccordionContent>
// // // //                   </AccordionItem>
// // // //                 ))}
// // // //               </Accordion>
// // // //             </div>

// // // //             {/* Contact Form */}
// // // //             <ContactForm />

// // // //             {/* Update Button */}
// // // //             <div className="mt-6 text-center">
// // // //               <Button
// // // //                 onClick={() => console.log('Updated Industry Data:', formData)}
// // // //                 className="bg-[#FF6B35] text-white"
// // // //               >
// // // //                 Update Industry
// // // //               </Button>
// // // //             </div>

// // // //           </section>
// // // //         </div>
// // // //       </main>

// // // //       {/* Back to Top Button */}
// // // //       {showBackToTop && (
// // // //         <Button onClick={scrollToTop} className="fixed bottom-6 right-6 rounded-full" size="icon">
// // // //           <ChevronUp />
// // // //         </Button>
// // // //       )}

// // // //       {/* Global Animations */}
// // // //       <style jsx global>{`
// // // //         @keyframes slideDown { from { transform: translateY(-100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
// // // //         @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
// // // //         @keyframes slideRight { from { transform: translateX(-20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
// // // //         @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
// // // //         .animate-slideDown { animation: slideDown 0.5s ease-in-out; }
// // // //         .animate-slideUp { animation: slideUp 0.5s ease-in-out; }
// // // //         .animate-slideRight { animation: slideRight 0.5s ease-in-out; }
// // // //         .animate-fadeIn { animation: fadeIn 0.5s ease-in-out; }
// // // //         a, button { transition: all 0.3s ease-in-out; }
// // // //         .hover-lift { transition: transform 0.3s ease-in-out; }
// // // //         .hover-lift:hover { transform: translateY(-5px); }
// // // //         html { scroll-behavior: smooth; }
// // // //         .card-hover { transition: all 0.3s ease-in-out; }
// // // //         .card-hover:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
// // // //       `}</style>
// // // //     </div>
// // // //   )
// // // // }
// // // "use client"

// // // import { useState, useEffect } from "react"
// // // import Image from "next/image"
// // // import Link from "next/link"
// // // import { ChevronUp, ChevronRight, ArrowRight } from "lucide-react"
// // // import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
// // // import { Button } from "@/components/ui/button"
// // // import { motion } from "framer-motion"
// // // import ContactForm from "@/app/components/layout/contactform"

// // // export default function IndustryDetailBody({
// // //   data,
// // //   type = "industry",
// // //   parentTitle,
// // //   parentPath,
// // //   category = "Industries",
// // //   categoryPath = "/industries",
// // //   categoryId,
// // //   itemId,
// // // }) {
// // //   // default structure
// // //   const defaultData = data || {
// // //     id: "default-industry",
// // //     title: "Industry Solutions",
// // //     subtitle: "Comprehensive Industry Solutions",
// // //     description: {
// // //       intro: [""] ,
// // //       conclusion: ""
// // //     },
// // //     industryStatus: { title: "Industry Status", items: ["", ""] },
// // //     challenges: ["", ""],
// // //     requirements: ["", ""],
// // //     solutions: [ { title: "", description: "", items: ["", ""], image: "" } ],
// // //     benefits: [ { title: "", description: "" } ],
// // //     features: [ { title: "", description: "", image: "" } ],
// // //     faq: [ { question: "", answer: "" } ],
// // //     heroImage: "",
// // //     sidebarImage: ""
// // //   }
// // //   const [formData, setFormData] = useState(defaultData)
// // //   const [imageInputs, setImageInputs] = useState({ heroImage: "", sidebarImage: "", solutions: {}, features: {} })
// // //   const [isVisible, setIsVisible] = useState({})

// // //   // Update field helper
// // //   const updateField = (path, value) => { /* ... unchanged ... */ }

// // //   // Save handler
// // //   const handleSave = async () => {
// // //     try {
// // //       const payload = { ...formData, categoryId, itemId }
// // //       const res = await fetch('/api/industry', {
// // //         method: 'POST',
// // //         headers: { 'Content-Type': 'application/json' },
// // //         body: JSON.stringify(payload),
// // //       })
// // //       if (!res.ok) throw new Error('Save failed')
// // //       console.log('Saved:', await res.json())
// // //     } catch (err) {
// // //       console.error(err)
// // //     }
// // //   }

// // //   useEffect(() => { /* ... unchanged ... */ }, [])

// // //   return (
// // //     <div className="font-sans text-gray-800">
// // //       {/* Hero Section */}
// // //       <div className="bg-[#003087] py-20 relative animate-fadeIn">
// // //         <div className="absolute top-4 right-4 flex space-x-2">
// // //           <Button onClick={() => console.log('Form Data:', formData)} size="sm" className="bg-gray-500 text-white">
// // //             Preview Data
// // //           </Button>
// // //           <Button onClick={handleSave} size="sm" className="bg-[#FF6B35] text-white">
// // //             Save to DB
// // //           </Button>
// // //         </div>
// // //         <div className="container mx-auto px-4 text-center space-y-4">
// // //           <h1
// // //             contentEditable suppressContentEditableWarning
// // //             onBlur={e => updateField('title', e.currentTarget.textContent || '')}
// // //             className="text-4xl font-bold text-white"
// // //           >
// // //             {formData.title}
// // //           </h1>
// // //           {/* Hero Image URL Input & Apply */}
// // //           <div className="flex justify-center space-x-2">
// // //             <input
// // //               type="text"
// // //               value={imageInputs.heroImage}
// // //               onChange={e => setImageInputs(prev => ({ ...prev, heroImage: e.target.value }))}
// // //               placeholder="Hero Image URL"
// // //               className="p-2 rounded border bg-white w-2/3"
// // //             />
// // //             <Button onClick={() => updateField('heroImage', imageInputs.heroImage)}>
// // //               Apply
// // //             </Button>
// // //           </div>
// // //           {formData.heroImage && (
// // //             <div className="mx-auto w-full md:w-2/3">
// // //               <Image
// // //                 src={formData.heroImage}
// // //                 alt="Hero"
// // //                 width={800}
// // //                 height={400}
// // //                 className="w-full rounded-lg"
// // //               />
// // //             </div>
// // //           )}
// // //           <div className="flex items-center justify-center space-x-2 text-sm text-white">
// // //             <Link href="/">Home</Link>
// // //             <ChevronRight size={16} />
// // //             <Link href={categoryPath}>
// // //               <span contentEditable suppressContentEditableWarning onBlur={e => updateField('category', e.currentTarget.textContent || '')}>
// // //                 {category}
// // //               </span>
// // //             </Link>
// // //             <ChevronRight size={16} />
// // //             <span className="text-orange-500">{formData.title}</span>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Main Content */}
// // //       <main className="py-16">
// // //         <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-8">

// // //           {/* Sidebar */}
// // //           <aside className="order-2 lg:order-1 space-y-8">
// // //             <div className="bg-gray-100 p-6 rounded-lg">
// // //               <h3
// // //                 contentEditable suppressContentEditableWarning
// // //                 onBlur={e => updateField('sidebarTitle', e.currentTarget.textContent || '')}
// // //                 className="text-xl font-bold mb-6 border-b border-gray-300 pb-4"
// // //               >
// // //                 {formData.sidebarTitle || 'All Services'}
// // //               </h3>
// // //             </div>
// // //             {/* Sidebar Image Input & Apply */}
// // //             <div className="flex space-x-2">
// // //               <input
// // //                 type="text"
// // //                 value={imageInputs.sidebarImage}
// // //                 onChange={e => setImageInputs(prev => ({ ...prev, sidebarImage: e.target.value }))}
// // //                 placeholder="Sidebar Image URL"
// // //                 className="p-2 rounded border bg-white w-full"
// // //               />
// // //               <Button onClick={() => updateField('sidebarImage', imageInputs.sidebarImage)}>
// // //                 Apply
// // //               </Button>
// // //             </div>
// // //             {formData.sidebarImage && (
// // //               <Image
// // //                 src={formData.sidebarImage}
// // //                 alt="Sidebar"
// // //                 width={300}
// // //                 height={400}
// // //                 className="w-full rounded-lg"
// // //               />
// // //             )}
// // //             <div className="bg-[#003087] text-white p-8 rounded-lg">
// // //               <h3
// // //                 contentEditable suppressContentEditableWarning
// // //                 onBlur={e => updateField('contactTitle', e.currentTarget.textContent || '')}
// // //                 className="text-xl font-bold mb-6"
// // //               >
// // //                 {formData.contactTitle || 'Need Help?'}
// // //               </h3>
// // //               <p
// // //                 contentEditable suppressContentEditableWarning
// // //                 onBlur={e => updateField('contactText', e.currentTarget.textContent || '')}
// // //                 className="mb-6"
// // //               >
// // //                 {formData.contactText || 'Contact our customer support team if you have any questions.'}
// // //               </p>
// // //             </div>
// // //           </aside>

// // //           {/* Content Area */}
// // //           <section className="lg:col-span-2 order-1 lg:order-2 space-y-12">

// // //             {/* Introduction */}
// // //             <div>
// // //               <h2
// // //                 contentEditable suppressContentEditableWarning
// // //                 onBlur={e => updateField('subtitle', e.currentTarget.textContent || '')}
// // //                 className="text-3xl font-bold mb-4"
// // //               >
// // //                 {formData.subtitle}
// // //               </h2>
// // //               {formData.description.intro.map((para, i) => (
// // //                 <p
// // //                   key={i}
// // //                   contentEditable suppressContentEditableWarning
// // //                   onBlur={e => updateField(`description.intro.${i}`, e.currentTarget.textContent || '')}
// // //                   className="mb-2 text-gray-700"
// // //                 >
// // //                   {para}
// // //                 </p>
// // //               ))}
// // //               <p
// // //                 contentEditable suppressContentEditableWarning
// // //                 onBlur={e => updateField('description.conclusion', e.currentTarget.textContent || '')}
// // //                 className="mt-4 italic text-gray-700"
// // //               >
// // //                 {formData.description.conclusion}
// // //               </p>
// // //             </div>

// // //             {/* Status, Challenges & Requirements */}
// // //             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // //               {['industryStatus', 'challenges', 'requirements'].map(section => {
// // //                 const title = section === 'industryStatus' ? formData.industryStatus.title : section.charAt(0).toUpperCase() + section.slice(1)
// // //                 const items = section === 'industryStatus' ? formData.industryStatus.items : formData[section]
// // //                 return (
// // //                   <div key={section} className="bg-white p-6 rounded-lg shadow">
// // //                     <h3
// // //                       contentEditable suppressContentEditableWarning
// // //                       onBlur={e => section === 'industryStatus' && updateField('industryStatus.title', e.currentTarget.textContent || '')}
// // //                       className="text-xl font-semibold mb-4"
// // //                     >
// // //                       {title}
// // //                     </h3>
// // //                     {items.map((item, i) => (
// // //                       <p
// // //                         key={i}
// // //                         contentEditable suppressContentEditableWarning
// // //                         onBlur={e => updateField(`${section === 'industryStatus' ? 'industryStatus.items' : section}.${i}`, e.currentTarget.textContent || '')}
// // //                         className="text-gray-600 mb-2"
// // //                       >
// // //                         {item}
// // //                       </p>
// // //                     ))}
// // //                   </div>
// // //                 )
// // //               })}
// // //             </div>

// // //             {/* Solutions */}
// // //             {formData.solutions.map((sol, idx) => (
// // //               <div key={idx} className="bg-white p-6 rounded-lg shadow">
// // //                 <h4
// // //                   contentEditable suppressContentEditableWarning
// // //                   onBlur={e => updateField(`solutions.${idx}.title`, e.currentTarget.textContent || '')}
// // //                   className="text-2xl font-semibold mb-4"
// // //                 >
// // //                   {sol.title}
// // //                 </h4>
// // //                 <div className="flex space-x-2 mb-4">
// // //                   <input
// // //                     type="text"
// // //                     value={imageInputs.solutions[idx] || ''}
// // //                     onChange={e => setImageInputs(prev => ({ ...prev, solutions: { ...prev.solutions, [idx]: e.target.value } }))}
// // //                     placeholder="Solution Image URL"
// // //                     className="p-2 rounded border bg-white w-full"
// // //                   />
// // //                   <Button onClick={() => updateField(`solutions.${idx}.image`, imageInputs.solutions[idx] || '')}>
// // //                     Apply
// // //                   </Button>
// // //                 </div>
// // //                 {formData.solutions[idx].image && (
// // //                   <Image
// // //                     src={formData.solutions[idx].image}
// // //                     alt="Solution"
// // //                     width={600}
// // //                     height={300}
// // //                     className="w-full mb-4 rounded"
// // //                   />
// // //                 )}
// // //                 <p
// // //                   contentEditable suppressContentEditableWarning
// // //                   onBlur={e => updateField(`solutions.${idx}.description`, e.currentTarget.textContent || '')}
// // //                   className="text-gray-700"
// // //                 >
// // //                   {sol.description}
// // //                 </p>
// // //               </div>
// // //             ))}

// // //             {/* Benefits */}
// // //             <div className="bg-gray-100 p-6 rounded-lg">
// // //               <h3 className="text-2xl font-bold mb-4">Key Benefits</h3>
// // //               {formData.benefits.map((ben, i) => (
// // //                 <div key={i} className="flex mb-4">
// // //                   <div className="flex-shrink-0 w-8 h-8 bg-[#003087] rounded-full flex items-center justify-center mr-3">
// // //                     <span className="text-white">{i+1}</span>
// // //                   </div>
// // //                   <div>
// // //                     <h4
// // //                       contentEditable suppressContentEditableWarning
// // //                       onBlur={e => updateField(`benefits.${i}.title`, e.currentTarget.textContent || '')}
// // //                       className="font-semibold"
// // //                     >
// // //                       {ben.title}
// // //                     </h4>
// // //                     <p
// // //                       contentEditable suppressContentEditableWarning
// // //                       onBlur={e => updateField(`benefits.${i}.description`, e.currentTarget.textContent || '')}
// // //                       className="text-gray-700"
// // //                     >
// // //                       {ben.description}
// // //                     </p>
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </div>

// // //             {/* Features */}
// // //             <div>
// // //               <h3 className="text-2xl font-bold mb-4">Key Features</h3>
// // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //                 {formData.features.map((feat, i) => (
// // //                   <div key={i} className="bg-white p-6 rounded-lg shadow">
// // //                     <h4
// // //                       contentEditable suppressContentEditableWarning
// // //                       onBlur={e => updateField(`features.${i}.title`, e.currentTarget.textContent || '')}
// // //                       className="text-xl font-semibold mb-2"
// // //                     >
// // //                       {feat.title}
// // //                     </h4>
// // //                     <div className="flex space-x-2 mb-3">
// // //                       <input
// // //                         type="text"
// // //                         value={imageInputs.features[i] || ''}
// // //                         onChange={e => setImageInputs(prev => ({ ...prev, features: { ...prev.features, [i]: e.target.value } }))}
// // //                         placeholder="Feature Image URL"
// // //                         className="p-2 rounded border bg-white w-full"
// // //                       />
// // //                       <Button onClick={() => updateField(`features.${i}.image`, imageInputs.features[i] || '')}>
// // //                         Apply
// // //                       </Button>
// // //                     </div>
// // //                     {formData.features[i].image && (
// // //                       <Image
// // //                         src={formData.features[i].image}
// // //                         alt="Feature"
// // //                         width={400}
// // //                         height={200}
// // //                         className="w-full mb-3 rounded"
// // //                       />
// // //                     )}
// // //                     <p
// // //                       contentEditable suppressContentEditableWarning
// // //                       onBlur={e => updateField(`features.${i}.description`, e.currentTarget.textContent || '')}
// // //                       className="text-gray-700"
// // //                     >
// // //                       {feat.description}
// // //                     </p>
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //             </div>

// // //             {/* FAQ */}
// // //             <div className="border-t border-b py-6">
// // //               <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
// // //               <Accordion type="single" collapsible>
// // //                 {formData.faq.map((item, i) => (
// // //                   <AccordionItem key={i} value={`faq-${i}`}> 
// // //                     <AccordionTrigger>
// // //                       <span contentEditable suppressContentEditableWarning onBlur={e => updateField(`faq.${i}.question`, e.currentTarget.textContent || '')}>
// // //                         {item.question || 'Question'}
// // //                       </span>
// // //                     </AccordionTrigger>
// // //                     <AccordionContent>
// // //                       <p contentEditable suppressContentEditableWarning onBlur={e => updateField(`faq.${i}.answer`, e.currentTarget.textContent || '')}>
// // //                         {item.answer || 'Answer'}
// // //                       </p>
// // //                     </AccordionContent>
// // //                   </AccordionItem>
// // //                 ))}
// // //               </Accordion>
// // //             </div>

// // //             {/* Contact Form */}
// // //             <ContactForm />

// // //           </section>
// // //         </div>
// // //       </main>

// // //       {/* Back to Top */}
// // //       <style jsx global>{`
// // //         @keyframes slideUp { from { opacity:0; transform: translateY(20px);} to {opacity:1; transform:translateY(0);} }
// // //         .animate-fadeIn { animation: slideUp 0.5s ease-in-out; }
// // //       `}</style>
// // //     </div>
// // //   )
// // // }
// // "use client"

// // import { useState, useEffect } from "react"
// // import Image from "next/image"
// // import Link from "next/link"
// // import { ChevronUp, ChevronRight, ArrowRight } from "lucide-react"
// // import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
// // import { Button } from "@/components/ui/button"
// // import { motion } from "framer-motion"
// // import ContactForm from "@/app/components/layout/contactform"

// // interface IndustryDetailBodyProps {
// //   data?: any
// //   categoryId: string
// //   itemId: string
// // }

// // export default function IndustryDetailBody({ data, categoryId, itemId }: IndustryDetailBodyProps) {
// //   const defaultData = data || {
// //     id: itemId,
// //     title: "",
// //     subtitle: "",
// //     description: { intro: [""], conclusion: "" },
// //     industryStatus: { title: "", items: [""] },
// //     challenges: [""],
// //     requirements: [""],
// //     solutions: [{ title: "", description: "", items: [""], image: "" }],
// //     benefits: [{ title: "", description: "" }],
// //     features: [{ title: "", description: "", image: "" }],
// //     faq: [{ question: "", answer: "" }],
// //     heroImage: "",
// //     sidebarImage: ""
// //   }

// //   const [formData, setFormData] = useState(defaultData)
// //   const [imageInputs, setImageInputs] = useState({ heroImage: "", sidebarImage: "", solutions: {}, features: {} })

// //   // Update nested field helper
// //   const updateField = (path: string, value: any) => {
// //     setFormData(prev => {
// //       const next = JSON.parse(JSON.stringify(prev))
// //       const keys = path.split('.')
// //       let obj: any = next
// //       keys.slice(0, -1).forEach(key => { obj = obj[key] })
// //       obj[keys[keys.length - 1]] = value
// //       return next
// //     })
// //   }

// //   // Save to MongoDB via API
// //   const handleUpdate = async () => {
// //     try {
// //       await fetch('/api/industries/update', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ categoryId, itemId, data: formData })
// //       })
// //     } catch (error) {
// //       console.error('Failed to update industry data:', error)
// //     }
// //   }

// //   return (
// //     <div className="font-sans text-gray-800">
// //       {/* Hero Section */}
// //       <div className="bg-[#003087] py-20 relative animate-fadeIn">
// //         {/* Update Button */}
// //         <div className="absolute top-4 right-4">
// //           <Button onClick={handleUpdate} size="sm" className="bg-[#FF6B35] text-white">
// //             Update Industry
// //           </Button>
// //         </div>
// //         <div className="container mx-auto px-4 text-center space-y-4">
// //           <h1 contentEditable suppressContentEditableWarning onBlur={e => updateField('title', e.currentTarget.textContent || '')} className="text-4xl font-bold text-white">
// //             {formData.title}
// //           </h1>
// //           {/* Hero Image Input */}
// //           <div className="flex justify-center space-x-2">
// //             <input type="text" value={imageInputs.heroImage} onChange={e => setImageInputs(prev => ({ ...prev, heroImage: e.target.value }))} placeholder="Hero Image URL" className="p-2 rounded border w-2/3" />
// //             <Button onClick={() => updateField('heroImage', imageInputs.heroImage)}>Apply</Button>
// //           </div>
// //           {formData.heroImage && (
// //             <div className="mx-auto w-full md:w-2/3">
// //               <Image src={formData.heroImage} alt="Hero" width={800} height={400} className="w-full rounded-lg" />
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {/* Main Content */}
// //       <main className="py-16">
// //         <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-8">
// //           {/* Sidebar */}
// //           <aside className="order-2 lg:order-1 space-y-8">
// //             <div className="bg-gray-100 p-6 rounded-lg">
// //               <h3 contentEditable suppressContentEditableWarning onBlur={e => updateField('sidebarTitle', e.currentTarget.textContent || '')} className="text-xl font-bold mb-6 border-b border-gray-300 pb-4">
// //                 {formData.sidebarTitle || 'All Services'}
// //               </h3>
// //             </div>
// //             {/* Sidebar Image */}
// //             <div className="flex space-x-2">
// //               <input type="text" value={imageInputs.sidebarImage} onChange={e => setImageInputs(prev => ({ ...prev, sidebarImage: e.target.value }))} placeholder="Sidebar Image URL" className="p-2 rounded border w-full" />
// //               <Button onClick={() => updateField('sidebarImage', imageInputs.sidebarImage)}>Apply</Button>
// //             </div>
// //             {formData.sidebarImage && <Image src={formData.sidebarImage} alt="Sidebar" width={300} height={400} className="w-full rounded-lg" />}
// //             <div className="bg-[#003087] text-white p-8 rounded-lg">
// //               <h3 contentEditable suppressContentEditableWarning onBlur={e => updateField('contactTitle', e.currentTarget.textContent || '')} className="text-xl font-bold mb-6">
// //                 {formData.contactTitle || 'Need Help?'}
// //               </h3>
// //               <p contentEditable suppressContentEditableWarning onBlur={e => updateField('contactText', e.currentTarget.textContent || '')} className="mb-6">
// //                 {formData.contactText || 'Contact our customer support team.'}
// //               </p>
// //             </div>
// //           </aside>

// //           {/* Content Area */}
// //           <section className="lg:col-span-2 order-1 lg:order-2 space-y-12">
// //             {/* Introduction */}
// //             <div>
// //               <h2
// //                 contentEditable suppressContentEditableWarning
// //                 onBlur={e => updateField('subtitle', e.currentTarget.textContent || '')}
// //                 className="text-3xl font-bold mb-4"
// //               >{formData.subtitle}</h2>
// //               {formData.description.intro.map((para, idx) => (
// //                 <p
// //                   key={idx}
// //                   contentEditable suppressContentEditableWarning
// //                   onBlur={e => updateField(`description.intro.${idx}`, e.currentTarget.textContent || '')}
// //                   className="mb-2 text-gray-700"
// //                 >
// //                   {para}
// //                 </p>
// //               ))}
// //               <p
// //                 contentEditable suppressContentEditableWarning
// //                 onBlur={e => updateField('description.conclusion', e.currentTarget.textContent || '')}
// //                 className="mt-4 italic text-gray-700"
// //               >
// //                 {formData.description.conclusion}
// //               </p>
// //             </div>

// //             {/* Status, Challenges & Requirements */}
// //             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //               {/* Status */}
// //               <div className="bg-white p-6 rounded-lg shadow">
// //                 <h3
// //                   contentEditable suppressContentEditableWarning
// //                   onBlur={e => updateField('industryStatus.title', e.currentTarget.textContent || '')}
// //                   className="text-xl font-semibold mb-4"
// //                 >{formData.industryStatus.title}</h3>
// //                 {formData.industryStatus.items.map((item, idx) => (
// //                   <p
// //                     key={idx}
// //                     contentEditable suppressContentEditableWarning
// //                     onBlur={e => updateField(`industryStatus.items.${idx}`, e.currentTarget.textContent || '')}
// //                     className="text-gray-600 mb-2"
// //                   >
// //                     {item}
// //                   </p>
// //                 ))}
// //               </div>
// //               {/* Challenges */}
// //               <div className="bg-white p-6 rounded-lg shadow">
// //                 <h3 contentEditable suppressContentEditableWarning onBlur={e => updateField('challenges.0', e.currentTarget.textContent || '')} className="text-xl font-semibold mb-4">
// //                   Challenges
// //                 </h3>
// //                 {formData.challenges.map((ch, idx) => (
// //                   <p
// //                     key={idx}
// //                     contentEditable suppressContentEditableWarning
// //                     onBlur={e => updateField(`challenges.${idx}`, e.currentTarget.textContent || '')}
// //                     className="text-gray-600 mb-2"
// //                   >
// //                     {ch}
// //                   </p>
// //                 ))}
// //               </div>
// //               {/* Requirements */}
// //               <div className="bg-white p-6 rounded-lg shadow">
// //                 <h3 contentEditable suppressContentEditableWarning onBlur={e => updateField('requirements.0', e.currentTarget.textContent || '')} className="text-xl font-semibold mb-4">
// //                   Requirements
// //                 </h3>
// //                 {formData.requirements.map((req, idx) => (
// //                   <p
// //                     key={idx}
// //                     contentEditable suppressContentEditableWarning
// //                     onBlur={e => updateField(`requirements.${idx}`, e.currentTarget.textContent || '')}
// //                     className="text-gray-600 mb-2"
// //                   >
// //                     {req}
// //                   </p>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* Solutions */}
// //             {formData.solutions.map((sol, idx) => (
// //               <div key={idx} className="bg-white p-6 rounded-lg shadow">
// //                 <h4
// //                   contentEditable suppressContentEditableWarning
// //                   onBlur={e => updateField(`solutions.${idx}.title`, e.currentTarget.textContent || '')}
// //                   className="text-2xl font-semibold mb-4"
// //                 >{sol.title}</h4>
// //                 <div className="flex space-x-2 mb-4">
// //                   <input
// //                     type="text"
// //                     value={imageInputs.solutions[idx] || ''}
// //                     onChange={e => setImageInputs(prev => ({ ...prev, solutions: { ...prev.solutions, [idx]: e.target.value } }))}
// //                     placeholder="Solution Image URL"
// //                     className="p-2 rounded border w-full"
// //                   />
// //                   <Button onClick={() => updateField(`solutions.${idx}.image`, imageInputs.solutions[idx] || '')}>
// //                     Apply
// //                   </Button>
// //                 </div>
// //                 {sol.image && (
// //                   <Image src={sol.image} alt="Solution" width={600} height={300} className="w-full mb-4 rounded" />
// //                 )}
// //                 <p
// //                   contentEditable suppressContentEditableWarning
// //                   onBlur={e => updateField(`solutions.${idx}.description`, e.currentTarget.textContent || '')}
// //                   className="text-gray-700"
// //                 >
// //                   {sol.description}
// //                 </p>
// //               </div>
// //             ))}

// //             {/* Benefits */}
// //             <div className="bg-gray-100 p-6 rounded-lg">
// //               <h3 className="text-2xl font-bold mb-4">Key Benefits</h3>
// //               {formData.benefits.map((ben, idx) => (
// //                 <div key={idx} className="flex mb-4">
// //                   <div className="flex-shrink-0 w-8 h-8 bg-[#003087] rounded-full flex items-center justify-center mr-3">
// //                     <span className="text-white">{idx + 1}</span>
// //                   </div>
// //                   <div>
// //                     <h4
// //                       contentEditable suppressContentEditableWarning
// //                       onBlur={e => updateField(`benefits.${idx}.title`, e.currentTarget.textContent || '')}
// //                       className="font-semibold"
// //                     >{ben.title}</h4>
// //                     <p
// //                       contentEditable suppressContentEditableWarning
// //                       onBlur={e => updateField(`benefits.${idx}.description`, e.currentTarget.textContent || '')}
// //                       className="text-gray-700"
// //                     >{ben.description}</p>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>

// //             {/* Features */}
// //             <div>
// //               <h3 className="text-2xl font-bold mb-4">Key Features</h3>
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                 {formData.features.map((feat, idx) => (
// //                   <div key={idx} className="bg-white p-6 rounded-lg shadow">
// //                     <h4
// //                       contentEditable suppressContentEditableWarning
// //                       onBlur={e => updateField(`features.${idx}.title`, e.currentTarget.textContent || '')}
// //                       className="text-xl font-semibold mb-2"
// //                     >{feat.title}</h4>
// //                     <div className="flex space-x-2 mb-3">
// //                       <input
// //                         type="text"
// //                         value={imageInputs.features[idx] || ''}
// //                         onChange={e => setImageInputs(prev => ({ ...prev, features: { ...prev.features, [idx]: e.target.value } }))}
// //                         placeholder="Feature Image URL"
// //                         className="p-2 rounded border w-full"
// //                       />
// //                       <Button onClick={() => updateField(`features.${idx}.image`, imageInputs.features[idx] || '')}>
// //                         Apply
// //                       </Button>
// //                     </div>
// //                     {feat.image && (
// //                       <Image src={feat.image} alt="Feature" width={400} height={200} className="w-full mb-3 rounded" />
// //                     )}
// //                     <p
// //                       contentEditable suppressContentEditableWarning
// //                       onBlur={e => updateField(`features.${idx}.description`, e.currentTarget.textContent || '')}
// //                       className="text-gray-700"
// //                     >{feat.description}</p>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* FAQ */}
// //             <div className="border-t border-b py-6">
// //               <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
// //               <Accordion type="single" collapsible>
// //                 {formData.faq.map((faqItem, idx) => (
// //                   <AccordionItem key={idx} value={`faq-${idx}`}> 
// //                     <AccordionTrigger>
// //                       <span
// //                         contentEditable suppressContentEditableWarning
// //                         onBlur={e => updateField(`faq.${idx}.question`, e.currentTarget.textContent || '')}
// //                       >{faqItem.question}</span>
// //                     </AccordionTrigger>
// //                     <AccordionContent>
// //                       <p
// //                         contentEditable suppressContentEditableWarning
// //                         onBlur={e => updateField(`faq.${idx}.answer`, e.currentTarget.textContent || '')}
// //                       >{faqItem.answer}</p>
// //                     </AccordionContent>
// //                   </AccordionItem>
// //                 ))}
// //               </Accordion>
// //             </div>
// //             <ContactForm />
// //           </section>
// //         </div>
// //       </main>
// //     </div>
// //   )
// // }
// "use client"

// import { useState, useEffect } from "react"
// import Image from "next/image"
// import Link from "next/link"
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
// import { Button } from "@/components/ui/button"
// import ContactForm from "@/app/components/layout/contactform"

// interface IndustryDetailBodyProps {
//   data?: any
//   categoryId: string
//   itemId: string
// }

// export default function IndustryDetailBody({ data, categoryId, itemId }: IndustryDetailBodyProps) {
//   const defaultData = data || {
//     id: itemId,
//     title: "",
//     subtitle: "",
//     description: { intro: [""], conclusion: "" },
//     industryStatus: { title: "", items: ["", ""] },
//     challenges: ["", ""],
//     requirements: ["", ""],
//     solutions: [{ title: "", description: "", items: ["", ""], image: "" }],
//     benefits: [{ title: "", description: "" }],
//     features: [{ title: "", description: "", image: "" }],
//     faq: [{ question: "", answer: "" }],
//     heroImage: "",
//     sidebarImage: "",
//     sidebarTitle: "All Services",
//     contactTitle: "Need Help?",
//     contactText: "Contact our customer support team."
//   }

//   const [formData, setFormData] = useState(defaultData)
//   const [imageInputs, setImageInputs] = useState({ heroImage: "", sidebarImage: "", solutions: {}, features: {} })
//   const [statusMessage, setStatusMessage] = useState<string | null>(null)

//   const updateField = (path: string, value: any) => {
//     setFormData(prev => {
//       const next = JSON.parse(JSON.stringify(prev))
//       const keys = path.split('.')
//       let obj: any = next
//       keys.slice(0, -1).forEach(key => { obj = obj[key] })
//       obj[keys[keys.length - 1]] = value
//       return next
//     })
//   }

//   useEffect(() => {
//     const handleScroll = () => {
//       document.querySelectorAll("[data-aos]").forEach(el => {
//         const rect = el.getBoundingClientRect()
//         if (rect.top < window.innerHeight && rect.bottom > 0) {
//           el.classList.add('animate-fadeIn')
//         }
//       })
//     }
//     window.addEventListener("scroll", handleScroll)
//     handleScroll()
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   const handleUpdate = async () => {
//     setStatusMessage(null)
//     try {
//       const res = await fetch('/api/industries/update', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ categoryId, itemId, data: formData })
//       })
//       if (!res.ok) throw new Error(`Status ${res.status}`)
//       setStatusMessage('Update successful!')
//     } catch (error) {
//       console.error('Failed to update:', error)
//       setStatusMessage('Update failed')
//     }
//   }

//   return (
//     <div className="font-sans text-gray-800">
//       {/* Hero Section */}
//       <div className="bg-[#003087] py-20 relative">
//         <div className="absolute top-4 right-4">
//           <Button onClick={handleUpdate} size="sm" className="bg-[#FF6B35] text-white">
//             Update Industry
//           </Button>
//         </div>
//         <div className="container mx-auto px-4 text-center space-y-4">
//           <h1
//             contentEditable suppressContentEditableWarning
//             onBlur={e => updateField('title', e.currentTarget.textContent || '')}
//             className="text-4xl font-bold text-white"
//           >{formData.title}</h1>
//           <div className="flex justify-center space-x-2">
//             <input
//               type="text"
//               value={imageInputs.heroImage}
//               onChange={e => setImageInputs(prev => ({ ...prev, heroImage: e.target.value }))}
//               placeholder="Hero Image URL"
//               className="p-2 rounded border w-2/3"
//             />
//             <Button onClick={() => updateField('heroImage', imageInputs.heroImage)}>Apply</Button>
//           </div>
//           {formData.heroImage && (
//             <div className="mx-auto w-full md:w-2/3">
//               <Image
//                 src={formData.heroImage}
//                 alt="Hero"
//                 width={800}
//                 height={400}
//                 className="w-full rounded-lg"
//               />
//             </div>
//           )}
//           {statusMessage && <p className="text-white mt-2">{statusMessage}</p>}
//         </div>
//       </div>

//       <main className="py-16">
//         <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-8">
//           {/* Sidebar */}
//           <aside className="order-2 lg:order-1 space-y-8">
//             <div className="bg-gray-100 p-6 rounded-lg">
//               <h3
//                 contentEditable suppressContentEditableWarning
//                 onBlur={e => updateField('sidebarTitle', e.currentTarget.textContent || '')}
//                 className="text-xl font-bold mb-6 border-b border-gray-300 pb-4"
//               >{formData.sidebarTitle}</h3>
//             </div>
//             <div className="flex space-x-2">
//               <input
//                 type="text"
//                 value={imageInputs.sidebarImage}
//                 onChange={e => setImageInputs(prev => ({ ...prev, sidebarImage: e.target.value }))}
//                 placeholder="Sidebar Image URL"
//                 className="p-2 rounded border w-full"
//               />
//               <Button onClick={() => updateField('sidebarImage', imageInputs.sidebarImage)}>Apply</Button>
//             </div>
//             {formData.sidebarImage && (
//               <Image
//                 src={formData.sidebarImage}
//                 alt="Sidebar"
//                 width={300}
//                 height={400}
//                 className="w-full rounded-lg"
//               />
//             )}
//             <div className="bg-[#003087] text-white p-8 rounded-lg">
//               <h3
//                 contentEditable suppressContentEditableWarning
//                 onBlur={e => updateField('contactTitle', e.currentTarget.textContent || '')}
//                 className="text-xl font-bold mb-6"
//               >{formData.contactTitle}</h3>
//               <p
//                 contentEditable suppressContentEditableWarning
//                 onBlur={e => updateField('contactText', e.currentTarget.textContent || '')}
//                 className="mb-6"
//               >{formData.contactText}</p>
//             </div>
//           </aside>

//           {/* Content Area */}
//           <section className="lg:col-span-2 order-1 lg:order-2 space-y-12">
//             {/* Introduction */}
//             <div>
//               <h2
//                 contentEditable suppressContentEditableWarning
//                 onBlur={e => updateField('subtitle', e.currentTarget.textContent || '')}
//                 className="text-3xl font-bold mb-4"
//               >{formData.subtitle}</h2>
//               {formData.description.intro.map((para, idx) => (
//                 <p
//                   key={idx}
//                   contentEditable suppressContentEditableWarning
//                   onBlur={e => updateField(`description.intro.${idx}`, e.currentTarget.textContent || '')}
//                   className="mb-2 text-gray-700"
//                 >{para}</p>
//               ))}
//               <p
//                 contentEditable suppressContentEditableWarning
//                 onBlur={e => updateField('description.conclusion', e.currentTarget.textContent || '')}
//                 className="mt-4 italic text-gray-700"
//               >{formData.description.conclusion}</p>
//             </div>

//             {/* Status, Challenges & Requirements */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div className="bg-white p-6 rounded-lg shadow">
//                 <h3
//                   contentEditable suppressContentEditableWarning
//                   onBlur={e => updateField('industryStatus.title', e.currentTarget.textContent || '')}
//                   className="text-xl font-semibold mb-4"
//                 >{formData.industryStatus.title}</h3>
//                 {formData.industryStatus.items.map((item, idx) => (
//                   <p
//                     key={idx}
//                     contentEditable suppressContentEditableWarning
//                     onBlur={e => updateField(`industryStatus.items.${idx}`, e.currentTarget.textContent || '')}
//                     className="text-gray-600 mb-2"
//                   >{item}</p>
//                 ))}
//               </div>
//               <div className="bg-white p-6 rounded-lg shadow">
//                 <h3 className="text-xl font-semibold mb-4">Challenges</h3>
//                 {formData.challenges.map((ch, idx) => (
//                   <p
//                     key={idx}
//                     contentEditable suppressContentEditableWarning
//                     onBlur={e => updateField(`challenges.${idx}`, e.currentTarget.textContent || '')}
//                     className="text-gray-600 mb-2"
//                   >{ch}</p>
//                 ))}
//               </div>
//               <div className="bg-white p-6 rounded-lg shadow">
//                 <h3 className="text-xl font-semibold mb-4">Requirements</h3>
//                 {formData.requirements.map((req, idx) => (
//                   <p
//                     key={idx}
//                     contentEditable suppressContentEditableWarning
//                     onBlur={e => updateField(`requirements.${idx}`, e.currentTarget.textContent || '')}
//                     className="text-gray-600 mb-2"
//                   >{req}</p>
//                 ))}
//               </div>
//             </div>

//             {/* Solutions */}
//             {formData.solutions.map((sol, idx) => (
//               <div key={idx} className="bg-white p-6 rounded-lg shadow">
//                 <h4
//                   contentEditable suppressContentEditableWarning
//                   onBlur={e => updateField(`solutions.${idx}.title`, e.currentTarget.textContent || '')}
//                   className="text-2xl font-semibold mb-4"
//                 >{sol.title}</h4>
//                 <div className="flex space-x-2 mb-4">
//                   <input
//                     type="text"
//                     value={imageInputs.solutions[idx] || ''}
//                     onChange={e => setImageInputs(prev => ({ ...prev, solutions: { ...prev.solutions, [idx]: e.target.value } }))}
//                     placeholder="Solution Image URL"
//                     className="p-2 rounded border w-full"
//                   />
//                   <Button onClick={() => updateField(`solutions.${idx}.image`, imageInputs.solutions[idx] || '')}>Apply</Button>
//                 </div>
//                 {sol.image && <Image src={sol.image} alt="Solution" width={600} height={300} className="w-full mb-4 rounded" />}<p
//                   contentEditable suppressContentEditableWarning
//                   onBlur={e => updateField(`solutions.${idx}.description`, e.currentTarget.textContent || '')}
//                   className="text-gray-700"
//                 >{sol.description}</p>
//               </div>
//             ))}

//             {/* Benefits */}
//             <div className="bg-gray-100 p-6 rounded-lg">
//               <h3 className="text-2xl font-bold mb-4">Key Benefits</h3>
//               {formData.benefits.map((ben, idx) => (
//                 <div key={idx} className="flex mb-4">
//                   <div className="flex-shrink-0 w-8 h-8 bg-[#003087] rounded-full flex items-center justify-center mr-3"><span className="text-white">{idx + 1}</span></div>
//                   <div><h4
//                     contentEditable suppressContentEditableWarning
//                     onBlur={e => updateField(`benefits.${idx}.title`, e.currentTarget.textContent || '')}
//                     className="font-semibold"
//                   >{ben.title}</h4><p
//                     contentEditable suppressContentEditableWarning
//                     onBlur={e => updateField(`benefits.${idx}.description`, e.currentTarget.textContent || '')}
//                     className="text-gray-700"
//                   >{ben.description}</p></div>
//                 </div>
//               ))}
//             </div>

//             {/* Features */}
//             <div><h3 className="text-2xl font-bold mb-4">Key Features</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-6">{formData.features.map((feat, idx) => (<div key={idx} className="bg-white p-6 rounded-lg shadow"><h4
//                     contentEditable suppressContentEditableWarning
//                     onBlur={e => updateField(`features.${idx}.title`, e.currentTarget.textContent || '')}
//                     className="text-xl font-semibold mb-2"
//                   >{feat.title}</h4><div className="flex space-x-2 mb-3"><input type="text" value={imageInputs.features[idx] || ''} onChange={e => setImageInputs(prev => ({ ...prev, features: { ...prev.features, [idx]: e.target.value } }))} placeholder="Feature Image URL" className="p-2 rounded border w-full" /><Button onClick={()=>updateField(`features.${idx}.image`, imageInputs.features[idx]||'')}>Apply</Button></div>{feat.image&&<Image src={feat.image} alt="Feature" width={400} height={200} className="w-full mb-3 rounded"/>}<p
//                     contentEditable suppressContentEditableWarning
//                     onBlur={e => updateField(`features.${idx}.description`, e.currentTarget.textContent || '')}
//                     className="text-gray-700"
//                   >{feat.description}</p></div>))}</div></div>

//             {/* FAQ */}
//             <div className="border-t border-b py-6"><h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3><Accordion type="single" collapsible>{formData.faq.map((faqItem, idx)=>(<AccordionItem key={idx} value={`faq-${idx}`}><AccordionTrigger><span contentEditable suppressContentEditableWarning onBlur={e=>updateField(`faq.${idx}.question`, e.currentTarget.textContent||'')}>{faqItem.question}</span></AccordionTrigger><AccordionContent><p contentEditable suppressContentEditableWarning onBlur={e=>updateField(`faq.${idx}.answer`, e.currentTarget.textContent||'')}>{faqItem.answer}</p></AccordionContent></AccordionItem>))}</Accordion></div>

//             <ContactForm />
//           </section>
//         </div>
//       </main>
//     </div>
//   )
// }
"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import ContactForm from "@/app/components/layout/contactform"

export default function IndustryDetailBody({ data }: { data?: any }) {
  // Retrieve categoryId and itemId from route params
  const { id, itemId } = useParams() as { id: string; itemId: string }

  const defaultData = data || {
    id: itemId,
    title: "",
    subtitle: "",
    description: { intro: [""], conclusion: "" },
    industryStatus: { title: "", items: ["", ""] },
    challenges: ["", ""],
    requirements: ["", ""],
    solutions: [{ title: "", description: "", items: ["", ""], image: "" }],
    benefits: [{ title: "", description: "" }],
    features: [{ title: "", description: "", image: "" }],
    faq: [{ question: "", answer: "" }],
    heroImage: "",
    sidebarImage: "",
    sidebarTitle: "All Services",
    contactTitle: "Need Help?",
    contactText: "Contact our customer support team."
  }

  const [formData, setFormData] = useState(defaultData)
  const [imageInputs, setImageInputs] = useState<{ heroImage: string; sidebarImage: string; solutions: Record<number, string>; features: Record<number, string> }>(
    { heroImage: "", sidebarImage: "", solutions: {}, features: {} }
  )
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  const updateField = (path: string, value: any) => {
    setFormData(prev => {
      const next = JSON.parse(JSON.stringify(prev))
      const keys = path.split('.')
      let obj: any = next
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]]
      obj[keys[keys.length - 1]] = value
      return next
    })
  }

  useEffect(() => {
    const handleScroll = () => {
      document.querySelectorAll('[data-aos]').forEach(el => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) el.classList.add('animate-fadeIn')
      })
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleUpdate = async () => {
    setStatusMessage(null)
    console.log('Updating with payload:', { id, itemId, data: formData })
    try {
      const res = await fetch('/api/industries/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, itemId, data: formData })
      })
      const result = await res.json()
      console.log('Update response:', result)
      if (!res.ok) throw new Error(result.message || `Status ${res.status}`)
      setStatusMessage('Update successful!')
    } catch (error: any) {
      console.error('Failed to update:', error)
      setStatusMessage('Update failed: ' + error.message)
    }
  }

  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <div className="bg-[#003087] py-20 relative">
        <div className="absolute top-4 right-4">
          <Button onClick={handleUpdate} size="sm" className="bg-[#FF6B35] text-white">
            Update Industry
          </Button>
        </div>
        <div className="container mx-auto px-4 text-center space-y-4">
          <h1
            contentEditable suppressContentEditableWarning
            onBlur={e => updateField('title', e.currentTarget.textContent || '')}
            className="text-4xl font-bold text-white"
          >
            {formData.title}
          </h1>
          <div className="flex justify-center space-x-2">
            <input
              type="text"
              value={imageInputs.heroImage}
              onChange={e => setImageInputs(prev => ({ ...prev, heroImage: e.target.value }))}
              placeholder="Hero Image URL"
              className="p-2 rounded border w-2/3"
            />
            <Button onClick={() => updateField('heroImage', imageInputs.heroImage)}>Apply</Button>
          </div>
          {formData.heroImage && (
            <div className="mx-auto w-full md:w-2/3">
              <Image src={formData.heroImage} alt="Hero" width={800} height={400} className="w-full rounded-lg" />
            </div>
          )}
          {statusMessage && <p className="text-white mt-2">{statusMessage}</p>}
        </div>
      </div>

      {/* Main Content */}
      <main className="py-16">
        <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <aside className="order-2 lg:order-1 space-y-8">
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3
                contentEditable suppressContentEditableWarning
                onBlur={e => updateField('sidebarTitle', e.currentTarget.textContent || '')}
                className="text-xl font-bold mb-6 border-b border-gray-300 pb-4"
              >
                {formData.sidebarTitle}
              </h3>
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                value={imageInputs.sidebarImage}
                onChange={e => setImageInputs(prev => ({ ...prev, sidebarImage: e.target.value }))}
                placeholder="Sidebar Image URL"
                className="p-2 rounded border w-full"
              />
              <Button onClick={() => updateField('sidebarImage', imageInputs.sidebarImage)}>Apply</Button>
            </div>
            {formData.sidebarImage && (
              <Image src={formData.sidebarImage} alt="Sidebar" width={300} height={400} className="w-full rounded-lg" />
            )}
            <div className="bg-[#003087] text-white p-8 rounded-lg">
              <h3
                contentEditable suppressContentEditableWarning
                onBlur={e => updateField('contactTitle', e.currentTarget.textContent || '')}
                className="text-xl font-bold mb-6"
              >
                {formData.contactTitle}
              </h3>
              <p
                contentEditable suppressContentEditableWarning
                onBlur={e => updateField('contactText', e.currentTarget.textContent || '')}
                className="mb-6"
              >
                {formData.contactText}
              </p>
            </div>
          </aside>

          {/* Editable Content */}
          <section className="lg:col-span-2 order-1 lg:order-2 space-y-12">
            {/* Introduction */}
            <div>
              <h2
                contentEditable suppressContentEditableWarning
                onBlur={e => updateField('subtitle', e.currentTarget.textContent || '')}
                className="text-3xl font-bold mb-4"
              >
                {formData.subtitle}
              </h2>
              {formData.description.intro.map((para, idx) => (
                <p
                  key={idx}
                  contentEditable suppressContentEditableWarning
                  onBlur={e => updateField(`description.intro.${idx}`, e.currentTarget.textContent || '')}
                  className="mb-2 text-gray-700"
                >
                  {para}
                </p>
              ))}
              <p
                contentEditable suppressContentEditableWarning
                onBlur={e => updateField('description.conclusion', e.currentTarget.textContent || '')}
                className="mt-4 italic text-gray-700"
              >
                {formData.description.conclusion}
              </p>
            </div>

            {/* Status/Challenges/Requirements */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3
                  contentEditable suppressContentEditableWarning
                  onBlur={e => updateField('industryStatus.title', e.currentTarget.textContent || '')}
                  className="text-xl font-semibold mb-4"
                >{formData.industryStatus.title}</h3>
                {formData.industryStatus.items.map((item, idx) => (
                  <p
                    key={idx}
                    contentEditable suppressContentEditableWarning
                    onBlur={e => updateField(`industryStatus.items.${idx}`, e.currentTarget.textContent || '')}
                    className="text-gray-600 mb-2"
                  >{item}</p>
                ))}
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-4">Challenges</h3>
                {formData.challenges.map((ch, idx) => (
                  <p
                    key={idx}
                    contentEditable suppressContentEditableWarning
                    onBlur={e => updateField(`challenges.${idx}`, e.currentTarget.textContent || '')}
                    className="text-gray-600 mb-2"
                  >{ch}</p>
                ))}
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-4">Requirements</h3>
                {formData.requirements.map((req, idx) => (
                  <p
                    key={idx}
                    contentEditable suppressContentEditableWarning
                    onBlur={e => updateField(`requirements.${idx}`, e.currentTarget.textContent || '')}
                    className="text-gray-600 mb-2"
                  >{req}</p>
                ))}
              </div>
            </div>

            {/* Solutions */}
            {formData.solutions.map((sol, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow">
                <h4
                  contentEditable suppressContentEditableWarning
                  onBlur={e => updateField(`solutions.${idx}.title`, e.currentTarget.textContent || '')}
                  className="text-2xl font-semibold mb-4"
                >{sol.title}</h4>
                <div className="flex space-x-2 mb-4">
                  <input
                    type="text"
                    value={imageInputs.solutions[idx] || ''}
                    onChange={e => setImageInputs(prev => ({ ...prev, solutions: { ...prev.solutions, [idx]: e.target.value } }))}
                    placeholder="Solution Image URL"
                    className="p-2 rounded border w-full"
                  />
                  <Button onClick={() => updateField(`solutions.${idx}.image`, imageInputs.solutions[idx] || '')}>Apply</Button>
                </div>
                {sol.image && <Image src={sol.image} alt="Solution" width={600} height={300} className="w-full mb-4 rounded" />}
                <p
                  contentEditable suppressContentEditableWarning
                  onBlur={e => updateField(`solutions.${idx}.description`, e.currentTarget.textContent || '')}
                  className="text-gray-700"
                >{sol.description}</p>
              </div>
            ))}

            {/* Benefits */}
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Key Benefits</h3>
              {formData.benefits.map((ben, idx) => (
                <div key={idx} className="flex mb-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#003087] rounded-full flex items-center justify-center mr-3"><span className="text-white">{idx + 1}</span></div>
                  <div><h4
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={e => updateField(`benefits.${idx}.title`, e.currentTarget.textContent || '')}
                    className="font-semibold"
                  >{ben.title}</h4><p
                    contentEditable suppressContentEditableWarning
                    onBlur={e => updateField(`benefits.${idx}.description`, e.currentTarget.textContent || '')}
                    className="text-gray-700"
                  >{ben.description}</p></div>
                </div>
              ))}
            </div>

            {/* Features */}
            <div>
              <h3 className="text-2xl font-bold mb-4">Key Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {formData.features.map((feat, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-lg shadow">
                    <h4
                      contentEditable suppressContentEditableWarning
                      onBlur={e => updateField(`features.${idx}.title`, e.currentTarget.textContent || '')}
                      className="text-xl font-semibold mb-2"
                    >{feat.title}</h4>
                    <div className="flex space-x-2 mb-3">
                      <input
                        type="text"
                        value={imageInputs.features[idx] || ''}
                        onChange={e => setImageInputs(prev => ({ ...prev, features: { ...prev.features, [idx]: e.target.value } }))}
                        placeholder="Feature Image URL"
                        className="p-2 rounded border w-full"
                      />
                      <Button onClick={() => updateField(`features.${idx}.image`, imageInputs.features[idx] || '')}>Apply</Button>
                    </div>
                    {feat.image && <Image src={feat.image} alt="Feature" width={400} height={200} className="w-full mb-3 rounded" />}                    <p
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={e => updateField(`features.${idx}.description`, e.currentTarget.textContent || '')}
                      className="text-gray-700"
                    >{feat.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="border-t border-b py-6">
              <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
              <Accordion type="single" collapsible>
                {formData.faq.map((faqItem, idx) => (
                  <AccordionItem key={idx} value={`faq-${idx}`}>
                    <AccordionTrigger>
                      <span
                        contentEditable suppressContentEditableWarning
                        onBlur={e => updateField(`faq.${idx}.question`, e.currentTarget.textContent || '')}
                      >{faqItem.question}</span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p
                        contentEditable suppressContentEditableWarning
                        onBlur={e => updateField(`faq.${idx}.answer`, e.currentTarget.textContent || '')}
                      >{faqItem.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <ContactForm />
          </section>
        </div>
      </main>
    </div>
  )
}
