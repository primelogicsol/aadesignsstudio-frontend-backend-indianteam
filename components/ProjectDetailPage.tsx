// import { useRouter } from 'next/router';
// import { motion } from 'framer-motion';
// import { useEffect, useState } from 'react';

// const ProjectDetailPage = () => {
//   const router = useRouter();
//   const { slug } = router.query;

//   const [project, setProject] = useState<{
//     title: string;
//     description: string;
//     images: string[];
//     category: string;
//     content: string;
//   } | null>(null);

//   // Simulated project fetch
//   useEffect(() => {
//     if (slug) {
//       // You'd replace this with real fetching based on slug
//       setProject({
//         title: `Project ${slug}`,
//         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//         category: 'Residential',
//         images: ['/sample1.jpg', '/sample2.jpg'],
//         content: `
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
//           Aenean tincidunt eros in justo cursus, at ultrices lacus fermentum. 
//           Donec posuere tincidunt augue, in efficitur justo lobortis et.
//         `,
//       });
//     }
//   }, [slug]);

//   if (!project) return <div className="p-10 text-center text-gray-500">Loading...</div>;

//   return (
//     <motion.div
//       className="min-h-screen bg-white text-gray-900 px-6 py-12"
//       initial={{ opacity: 0, y: 40 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//     >
//       <motion.div
//         className="max-w-5xl mx-auto"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.3 }}
//       >
//         <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
//         <p className="text-lg text-blue-700 mb-4 uppercase tracking-wider">{project.category}</p>
//         <p className="text-gray-600 mb-8">{project.description}</p>

//         <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
//           {project.images.map((src, index) => (
//             <motion.img
//               key={index}
//               src={src}
//               alt={`Project image ${index + 1}`}
//               className="rounded-xl shadow-lg object-cover w-full h-72"
//               whileHover={{ scale: 1.02 }}
//               transition={{ type: 'spring', stiffness: 200 }}
//             />
//           ))}
//         </motion.div>

//         <motion.div
//           className="prose prose-lg max-w-3xl text-gray-800"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5 }}
//         >
//           <p>{project.content}</p>
//         </motion.div>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default ProjectDetailPage;
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const ProjectDetailPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [project, setProject] = useState<{
    title: string;
    description: string;
    images: string[];
    category: string;
    content: string;
    location: string;
    client: string;
    dateCompleted: string;
    services: string[];
    technologies: string[];
    tags: string[];
    testimonial: {
      name: string;
      quote: string;
    };
  } | null>(null);

  // Simulated project fetch
  useEffect(() => {
    if (slug) {
      setProject({
        title: `Project ${slug}`,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida ipsum ut feugiat cursus.',
        category: 'Commercial',
        images: ['/sample1.jpg', '/sample2.jpg'],
        content: `
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Aenean tincidunt eros in justo cursus, at ultrices lacus fermentum. 
          Donec posuere tincidunt augue, in efficitur justo lobortis et.

          Morbi blandit tincidunt est, ac tincidunt mauris feugiat ac. 
          Vivamus bibendum lacus nec lorem luctus, vitae pulvinar felis pretium.
        `,
        location: 'New York City, NY',
        client: 'Acme Corporation',
        dateCompleted: 'March 2024',
        services: ['Architectural Design', 'Interior Design', 'Project Management'],
        technologies: ['Revit', 'AutoCAD', 'Lumion'],
        tags: ['Commercial', 'Modern', 'Sustainable', 'Glass Facade'],
        testimonial: {
          name: 'Jane Doe, CEO of Acme Corp',
          quote: 'Their creativity and professionalism were beyond our expectations. The final result exceeded what we envisioned.',
        },
      });
    }
  }, [slug]);

  if (!project) return <div className="p-10 text-center text-gray-500">Loading...</div>;

  return (
    <motion.div
      className="min-h-screen bg-white text-gray-900 px-6 py-12"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
        <p className="text-lg text-blue-700 mb-4 uppercase tracking-wider">{project.category}</p>
        <p className="text-gray-600 mb-4">{project.description}</p>

        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div><strong>Client:</strong> {project.client}</div>
          <div><strong>Location:</strong> {project.location}</div>
          <div><strong>Completed:</strong> {project.dateCompleted}</div>
          <div><strong>Services:</strong> {project.services.join(', ')}</div>
        </div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {project.images.map((src, index) => (
            <motion.img
              key={index}
              src={src}
              alt={`Project image ${index + 1}`}
              className="rounded-xl shadow-lg object-cover w-full h-72"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 200 }}
            />
          ))}
        </motion.div>

        <motion.div
          className="prose prose-lg max-w-3xl text-gray-800 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p>{project.content}</p>
        </motion.div>

        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Technologies Used</h2>
          <ul className="list-disc list-inside text-gray-700">
            {project.technologies.map((tech, index) => (
              <li key={index}>{tech}</li>
            ))}
          </ul>
        </div>

        <div className="mb-10 bg-gray-50 p-6 rounded-lg shadow-sm">
          <blockquote className="text-lg italic text-gray-700 mb-2">“{project.testimonial.quote}”</blockquote>
          <p className="text-sm text-gray-500">— {project.testimonial.name}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetailPage;
