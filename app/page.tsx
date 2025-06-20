"use client"
import { useEffect, useRef, useState } from 'react';
import styles from '../styles/Home_About_Us.module.css'; // Import the CSS module
import styles5 from '../styles/Home_Projects.module.css'; // Import the CSS module
import styles4 from '../styles/Home_Review.module.css'; // Import the CSS module
import styles1 from '../styles/Home_Services.module.css'; // Import the CSS module
import styles3 from '../styles/Home_Sponsers.module.css'; // Import the CSS module
import styles2 from '../styles/Home_Statistics.module.css'; // Import the CSS module

import 'swiper/css';
import 'swiper/css/pagination';

import TestimonialCard from '@/components/testimonialCard';
import { projects } from "../data/projects";
import { testimonials } from "../data/testimonials";


import ProjectCard from '@/components/ProjectCard';
import { ChevronRight } from 'lucide-react';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

// app/layout.tsx or pages/_app.tsx
import "aos/dist/aos.css";
import AOS from "aos";





export default function Home() {
  const [filter, setFilter] = useState("all")
  const [domLoaded, setDomLoaded] = useState(false)

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800, // animation duration in ms
      easing: "ease-in-out",
      once: true, // whether animation should happen only once
    });
  }, []);

  const handlePlay = () => {
    setIsPlaying(true);
    const video = document.getElementById("services-video") as HTMLVideoElement;
    video?.play();
  };

  // Fix for hydration issues with Swiper
  useEffect(() => {
    setDomLoaded(true)
  }, [])

  const filteredProjects = filter === "all" ? projects : projects.filter((p) => p.category === filter)

  const handleFilterChange = (category: string) => {
    setFilter(category)
  }

  const numbersRef = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const startCountUp = (entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        numbersRef.current.forEach((el) => {
          if (!el) return // Ensure element exists before accessing properties

          const endValue = Number.parseInt(el.getAttribute("data-end-value") || "0", 10)
          const start = 0
          const duration = 2000 // Animation duration in ms
          const startTime = performance.now()

          const animate = (currentTime: number) => {
            const elapsedTime = currentTime - startTime
            const progress = Math.min(elapsedTime / duration, 1)
            el.innerText = Math.floor(progress * endValue).toString()
            if (progress < 1) {
              requestAnimationFrame(animate)
            } else {
              el.innerText = endValue.toString() // Ensure final value is correct
            }
          }
          requestAnimationFrame(animate)
        })
      }
    }

    const observer = new IntersectionObserver((entries) => entries.forEach(startCountUp), { threshold: 0.5 })

    numbersRef.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])


  return (
    // Main container with responsive padding
    <div className="pt-4 md:pt-8 lg:pt-12 px-4 md:px-6 lg:px-8 max-w-full overflow-x-hidden">
      {/* About Us Section */}
      <div className={styles.pageContainer} data-aos="fade-in">
        <section className={styles.webpage_about_section}>
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12">
              <div className="w-full md:w-7/12">
                <h2 className={`${styles.about_us_heading} `}>About us</h2>
                <div
                  className={`${styles.about_section_pseudoheading}  text-3xl md:text-4xl lg:text-5xl`}
                >
                  Strategy-led <span className="text-blue-600">design</span> in every detail
                </div>
                <div className={`${styles.about_section_text} `}>
                  Founded in 2007, Sparch specializes in providing innovative services such as website design, brand
                  identity, and marketing.
                </div>
                <a className={`${styles.about_section_learn_more}  inline-block`} href="about.html">
                  Learn more
                </a>
              </div>
              <div className={` w-full md:w-5/12 mt-8 md:mt-0`}>
                <div className={styles.about_image}>
                  <img
                    src="/about_section_image_download.jpg"
                    alt="House"
                    className="w-full h-auto max-w-full"
                    style={{ borderRadius: "0 70px 0 70px" }}
                  />
                </div>
                <div className={`${styles.about_section_cite_wrapper} relative mt-6 md:mt-8`}>
                  <blockquote className={`${styles.about_section_blockquote} text-lg md:text-xl italic`}>
                    If you will be copying someone, you will never be the best"
                  </blockquote>
                  <cite className={`${styles.about_section_cite} text-base md:text-lg`}>
                    Paul.
                    <br />
                    Designer
                  </cite>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Services section */}
      {/* <section className={`${styles1.services_section_outer_container} py-16 ml-20 md:py-16 lg:py-20`} data-aos="fade-in">
        <div className={`${styles1.services_section_inner_container} container mx-auto`}>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <h1 className={`${styles1.services_section_heading} `}>Services</h1>
              <div
                className={`${styles1.services_section_pseudoheading}  text-2xl md:text-3xl lg:text-4xl`}
              >
                Thought out to the smallest detail
              </div>
              <ul className={`${styles1.services_section_list} mt-6 md:mt-8`}>
                <li className={`${styles1.services_section_item} `}>
                  <a className={styles1.services_section_link} href="projects-detail.html">
                    01. Logo Design
                  </a>
                </li>
                <li className={`${styles1.services_section_item} `}>
                  <a className={styles1.services_section_link} href="projects-detail.html">
                    02. Business Card Design
                  </a>
                </li>
                <li className={`${styles1.services_section_item} `}>
                  <a className={styles1.services_section_link} href="projects-detail.html">
                    03. Stationery Design
                  </a>
                </li>
                <li className={`${styles1.services_section_item} `}>
                  <a className={styles1.services_section_link} href="projects-detail.html">
                    04. Letterhead Design
                  </a>
                </li>
                <li className={`${styles1.services_section_item} `}>
                  <a className={styles1.services_section_link} href="projects-detail.html">
                    05. Brouchers
                  </a>
                </li>
              </ul>
            </div>

            <div className="w-full md:w-1/2 order-1 md:order-2 flex items-stretch ml-40">
              <div className={`relative w-full h-full ${styles1.services_section_image}`}>
                {!isPlaying ? (
                  <>
                    <img
                      src="/image.png"
                      alt="House"
                      className="object-cover"
                      style={{ borderRadius: "0 70px 0 70px", width: "100%", height: "100%" }}
                    />
                    <button
                      onClick={handlePlay}
                      className="absolute inset-0 flex items-center justify-center"
                      aria-label="Play video"
                    >
                      <svg
                        className="w-16 h-16 text-white bg-black bg-opacity-60 rounded-full p-3"
                        viewBox="0 0 100 100"
                        fill="white"
                      >
                        <polygon points="40,30 70,50 40,70" />
                      </svg>
                    </button>
                  </>
                ) : (
                  <video
                    className="w-full h-full object-cover rounded-[0_70px_0_70px]"
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    <source src="/home.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section
  className={`${styles1.services_section_outer_container} py-12 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20`}
  data-aos="fade-in"
>
  <div className={`${styles1.services_section_inner_container} container mx-auto`}>
    <div className="flex flex-col md:flex-row gap-10 md:gap-8">
      {/* Text Content */}
      <div className="w-full md:w-1/2 order-2 md:order-1">
        <h1 className={`${styles1.services_section_heading}`}>Services</h1>
        <div className={`${styles1.services_section_pseudoheading} text-2xl md:text-3xl lg:text-4xl`}>
          Thought out to the smallest detail
        </div>
        <ul className={`${styles1.services_section_list} mt-6 md:mt-8 space-y-3`}>
          {[
            '01. Logo Design',
            '02. Business Card Design',
            '03. Stationery Design',
            '04. Letterhead Design',
            '05. Brouchers',
          ].map((item, index) => (
            <li key={index} className={styles1.services_section_item}>
              <a className={styles1.services_section_link} href="projects-detail.html">
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Media Content */}
      <div className="w-full md:w-1/2 order-1 md:order-2 flex items-center">
        <div className={`relative w-full h-64 sm:h-80 md:h-full ${styles1.services_section_image}`}>
          {!isPlaying ? (
            <>
              <img
              src="/image.png"
              alt="House"
              style={{ borderRadius: "0 70px 0 70px", width: "100%", height: "100%" }}
              />
              <button
              onClick={handlePlay}
              className="absolute inset-0 flex items-center justify-center"
              aria-label="Play video"
              >
              <svg
                className="w-16 h-16 text-white bg-black bg-opacity-60 rounded-full p-3"
                viewBox="0 0 100 100"
                fill="white"
              >
                <polygon points="40,30 70,50 40,70" />
              </svg>
              </button>
            </>
          ) : (
            <video
              className="w-full h-full object-cover rounded-[0_70px_0_70px]"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/home.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </div>
    </div>
  </div>
</section>


      {/* Statistics section */}
      <div className={`${styles2.statistics_outer_container}  py-12 md:py-16`} data-aos="fade-in">
        <div className={`${styles2.statistics_container} container mx-auto`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`${styles2.statistics_item} flex items-center`}>
              <div
                className={`${styles2.statistics_item_value} text-4xl md:text-5xl lg:text-6xl text-yellow-500 font-bold mr-4`}
              >
                <span ref={(el) => (numbersRef.current[0] = el)} className="__js_number" data-end-value="20" style={{ color: "#003087" }}>
                  0
                </span>
              </div>
              <div className={`${styles2.statistics_item_text} text-sm md:text-base uppercase font-semibold`}>
                Years
                <br />
                working
              </div>
            </div>
            <div className={`${styles2.statistics_item} flex items-center`}>
              <div
                className={`${styles2.statistics_item_value} text-4xl md:text-5xl lg:text-6xl text-yellow-500 font-bold mr-4`}
              >
                <span ref={(el) => (numbersRef.current[1] = el)} className="__js_number" data-end-value="7" style={{ color: "#003087" }}>
                  0
                </span>
              </div>
              <div className={`${styles2.statistics_item_text} text-sm md:text-base uppercase font-semibold`}>
                Talented
                <br />
                managers
              </div>
            </div>
            <div className={`${styles2.statistics_item} flex items-center`}>
              <div
                className={`${styles2.statistics_item_value} text-4xl md:text-5xl lg:text-6xl text-yellow-500 font-bold mr-4`}
              >
                <span ref={(el) => (numbersRef.current[2] = el)} className="__js_number" data-end-value="100" style={{ color: "#003087" }}>
                  0
                </span>
              </div>
              <div className={`${styles2.statistics_item_text} text-sm md:text-base uppercase font-semibold`}>
                Completed
                <br />
                projects
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects section */}
      <section className="py-12 md:py-16 lg:py-20" data-aos="fade-in">
        <header
          className={`${styles5.projects_header}  container mx-auto flex flex-col md:flex-row items-start md:items-center mb-8 md:mb-12`}
        >
          <h2 className={`${styles5.projects_header_heading} text-3xl md:text-4xl font-bold mb-4 md:mb-0`}>
            Latest projects
          </h2>
          <div className={`${styles5.project_filters} flex flex-wrap gap-4 mb-4 md:mb-0`}>
            <button
              className={`${styles5.filter_item} ${filter === "all" ? styles5.active_filter : ""}`}
              type="button"
              onClick={() => handleFilterChange("all")}
            >
              all
            </button>
            <button
              className={`${styles5.filter_item} ${filter === "building" ? styles5.active_filter : ""}`}
              type="button"
              onClick={() => handleFilterChange("building")}
            >
              Building
            </button>
            <button
              className={`${styles5.filter_item} ${filter === "interior" ? styles5.active_filter : ""}`}
              type="button"
              onClick={() => handleFilterChange("interior")}
            >
              Interior
            </button>
          </div>

          <a
            className={`${styles5.projects_more} flex items-center text-gray-500 hover:text-black ml-0 md:ml-auto mt-4 md:mt-0`}
            href="projects-grid.html"
          >
            View all projects
            <ChevronRight className="ml-1 h-5 w-5" />
          </a>
        </header>
        <div className="container mx-auto">
          <div className={``}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.slice(0, 3).map((project, index) => (
                <ProjectCard
                  key={index}
                  title={project.title}
                  imageUrl={project.link}
                  description={project.description}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors section */}
      <section className={`${styles3.sponsors_section} py-12 md:py-16 lg:py-20`} data-aos="fade-in">
        <div className={`${styles3.sponsors_inner_container} container mx-auto`}>
          <ul className="flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-4">
            <li className={` w-1/2 md:w-auto text-center`}>
              <img src="/sponsor1.png" width="150" height="45" alt="behr handelsagentur" className="max-w-full h-auto inline-block" />
            </li>
            <li className={` w-1/2 md:w-auto text-center`}>
              <img src="/sponsor2.png" width="150" height="45" alt="christopher willis" className="max-w-full h-auto inline-block" />
            </li>
            <li className={` w-1/2 md:w-auto text-center`}>
              <img src="/sponsor3.png" width="150" height="45" alt="artchive crafts gallery" className="max-w-full h-auto inline-block" />
            </li>
            <li className={` w-1/2 md:w-auto text-center`}>
              <img src="/sponsor4.png" width="150" height="45" alt="artchive crafts gallery" className="max-w-full h-auto inline-block" />
            </li>
          </ul>
        </div>
      </section>

      {/* Testimonials section */}
      <div className={`${styles4.review_swiper_container}  py-12 md:py-16 lg:py-20`} data-aos="fade-in">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">What Our Clients Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {testimonials.slice(0, 2).map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  name={testimonial.name}
                  role={testimonial.role}
                  company={testimonial.company}
                  companyColor={testimonial.companyColor}
                  description={testimonial.description}
                  imageSrc={testimonial.imageSrc}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

