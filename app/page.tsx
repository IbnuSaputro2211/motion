'use client';
// pages/index.js
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Sample project data
const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-featured online store built with Next.js and Stripe integration.',
    image: '/a.jpg',
    technology: 'Next.js, Tailwind CSS, Stripe',
    link: 'https://project1.example.com'
  },
  {
    id: 2,
    title: 'Portfolio Dashboard',
    description: 'Interactive dashboard for tracking investments and financial goals.',
    image: '/b.jpg',
    technology: 'React, Chart.js, Firebase',
    link: 'https://project2.example.com'
  },
  {
    id: 3,
    title: 'Task Management App',
    description: 'Collaborative task manager with real-time updates and notifications.',
    image: '/c.jpg',
    technology: 'Next.js, Socket.io, MongoDB',
    link: 'https://project3.example.com'
  },
  {
    id: 4,
    title: 'Weather Application',
    description: 'Location-based weather forecasting with beautiful visualizations.',
    image: '/d.jpg',
    technology: 'React, OpenWeather API, Tailwind CSS',
    link: 'https://project4.example.com'
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-800 via-blue-600 to-green-500 text-white">
      <Head>
        <title>Ibnu Risqi Saputro - Portfolio</title>
        <meta name="description" content="Full-stack developer portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-20">
        <section className="mb-20">
          <h1 className="text-4xl font-bold mb-4">Hello, I'm Ibnu Risqi Saputro</h1>
          <p className="text-xl">Full-stack developer with a focus on React and Next.js</p>
        </section>

        <section id="projects" className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">My Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      </main>

      <footer className="text-center py-6 border-t border-gray-700">
        <p>© {new Date().getFullYear()} Ibnu Risqi Saputro. All rights reserved.</p>
      </footer>
    </div>
  );
}

// First, define an interface for your project data
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technology: string;
  link: string;
}

// Then update your ProjectCard function to use this type
function ProjectCard({ project }: { project: Project }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0.8 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: { 
      scale: 1.05,
      transition: { 
        duration: 0.2 
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl"
      whileHover={{ y: -5 }}
    >
      <div className="relative h-48 overflow-hidden">
        <motion.div
          className="w-full h-full relative"
          variants={imageVariants}
          initial="hidden"
          animate={controls}
          whileHover="hover"
        >
          <Image src={project.image} alt={project.title} layout="fill" objectFit="cover" />
        </motion.div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-300 mb-4">{project.description}</p>
        <p className="text-sm text-gray-400 mb-4">
          <span className="font-semibold">Technologies:</span> {project.technology}
        </p>
        <a 
          href={project.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
        >
          View Project
        </a>
      </div>
    </motion.div>
  );
}