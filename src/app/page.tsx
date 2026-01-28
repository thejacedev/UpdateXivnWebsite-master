"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useRef, useEffect, FormEvent } from "react";
import {
  FaDiscord,
  FaTwitter,
  FaTiktok,
  FaYoutube,
  FaTwitch,
  FaInstagram,
} from "react-icons/fa";
import config from "../../config.yml";
import React from "react";
import { StarField } from "./components/StarField";
import { Canvas } from "@react-three/fiber";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  longDescription: string;
  images: string[];
}

interface Client {
  name: string;
  logo: string;
  link: string;
}

interface SocialLink {
  name: string;
  url: string;
  icon: string;
  username: string;
}

interface Project {
  name: string;
  description: string;
  image: string;
  longDescription: string;
  gallery: string[];
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("About");
  const [activeService, setActiveService] = useState<Service | null>(null);
  const clientsContainerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [expandedProject, setExpandedProject] = useState<Project | null>(null);
  const expandedRef = useRef<HTMLDivElement | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const iconMap = {
    FaDiscord,
    FaTwitter,
    FaTiktok,
    FaYoutube,
    FaTwitch,
    FaInstagram,
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } },
  };

  const toggleProjectExpansion = (project: Project) => {
    setExpandedProject(expandedProject === project ? null : project);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (expandedRef.current && !expandedRef.current.contains(event.target as Node)) {
        setExpandedProject(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const expandAnimation = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: { duration: 0.3 }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/sendtodiscord', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        console.log('Toast should appear now');
        toast.success('Message sent successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        
        // Reset form fields
        setName('');
        setEmail('');
        setMessage('');
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <StarField />
        </Canvas>
      </div>
      
      <motion.div
        className="flex justify-center items-center min-h-screen bg-transparent p-4 sm:p-8 relative z-10"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={pageTransition}
      >
        <motion.div
          className="flex max-w-6xl w-full gap-4 sm:gap-8 flex-col"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-8">
            {/* Left Box */}
            <motion.div
              className="w-full lg:w-1/4 bg-gradient-to-br from-gray-900 to-black rounded-3xl p-4 sm:p-6 flex flex-col items-center shadow-lg border border-gray-700"
              variants={itemVariants}
            >
              <Image
                src="https://api.mcheads.org/head/xivnn"
                alt="Xivnn Minecraft head"
                width={128}
                height={128}
                className="rounded-3xl mb-4 border-2 border-gray-600"
              />
              <h1 className="text-2xl font-bold mb-2 text-gray-200">Xivn</h1>
              <p className="text-gray-400 mb-6 px-4 py-1 bg-gray-800 rounded-full text-sm border border-gray-600">
                Developer
              </p>

              {/* Social Links */}
              <div className="w-full space-y-2">
                {config.socialLinks.map((platform: SocialLink) => (
                  <a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-gray-800 to-black p-2 rounded-2xl flex items-center hover:from-gray-700 hover:to-gray-900 transition-colors border border-gray-600"
                  >
                    {iconMap[platform.icon as keyof typeof iconMap] &&
                      React.createElement(
                        iconMap[platform.icon as keyof typeof iconMap],
                        { className: "w-6 h-6 mr-2 text-gray-300" }
                      )}
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400">
                        {platform.name}
                      </span>
                      <span className="text-sm text-gray-300">
                        {platform.username}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Right Box */}
            <motion.div
              className="w-full lg:w-3/4 bg-gradient-to-br from-gray-900 to-black rounded-3xl p-4 sm:p-6 flex flex-col shadow-lg border border-gray-700"
              variants={itemVariants}
            >
              {/* Navigation */}
              <nav className="self-center lg:self-end mb-4">
                <ul className="flex flex-wrap justify-center lg:justify-end space-x-2 sm:space-x-4">
                  {["About", "Past Work", "Contact Me"].map((section) => (
                    <li
                      key={section}
                      className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full cursor-pointer text-sm sm:text-base ${
                        activeSection === section
                          ? "bg-gray-800 text-gray-200 border border-gray-600"
                          : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
                      }`}
                      onClick={() => setActiveSection(section)}
                    >
                      {section}
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Content Sections */}
              <AnimatePresence mode="wait">
                {activeSection === "About" && (
                  <motion.div
                    key="about"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-200">
                      About Me
                    </h2>
                    <p className="mb-6 sm:mb-8 text-gray-400 text-sm sm:text-base">
                      Hi, I'm Xivn, and I specialize in Minecraft development, focusing on custom item creation, plugin configuration, 
                      and server management. I enjoy crafting unique experiences for players and am currently learning Java and Python 
                      to broaden my skill set and explore new projects. If you're looking for help with your Minecraft server or have 
                      a project in mind, feel free to reach out—I'd be happy to discuss how we can collaborate.
                    </p>

                    <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-200">
                      Provided Services
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      {config.services.map((service: Service, index: number) => (
                        <div
                          key={index}
                          className="bg-gradient-to-br from-gray-800 to-black p-4 rounded-2xl shadow transition-all duration-300 hover:from-gray-700 hover:to-gray-900 border border-gray-600 cursor-pointer"
                          onClick={() => setActiveService(service)}
                        >
                          <div className="flex items-center mb-2">
                            <span className="text-2xl mr-2 text-gray-300">
                              {service.icon}
                            </span>
                            <h4 className="text-lg font-semibold text-gray-200">
                              {service.title}
                            </h4>
                          </div>
                          <p className="text-gray-400 text-sm">
                            {service.description}
                          </p>
                        </div>
                      ))}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-200">
                      Clients
                    </h3>
                    <div className="bg-gradient-to-br from-gray-800 to-black p-4 rounded-2xl border border-gray-600">
                      <div className="overflow-x-auto custom-scrollbar">
                        <div className="flex space-x-4 pb-4">
                          {config.clients.map((client: Client, index: number) => (
                            <a
                              key={index}
                              href={client.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex-shrink-0"
                            >
                              <div className="w-36 h-36 bg-gray-800 rounded-2xl overflow-hidden">
                                <Image
                                  src={client.logo}
                                  alt={`${client.name} logo`}
                                  width={150}
                                  height={150}
                                  className="object-cover transition-transform duration-200 group-hover:scale-110"
                                />
                              </div>
                              <p className="mt-2 text-center text-sm text-gray-400 group-hover:text-gray-200 transition-colors duration-200">
                                {client.name}
                              </p>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                    <style jsx>{`
                      .custom-scrollbar {
                        scrollbar-width: thin;
                        scrollbar-color: #4b5563 #1f2937;
                      }
                      .custom-scrollbar::-webkit-scrollbar {
                        height: 8px;
                      }
                      .custom-scrollbar::-webkit-scrollbar-track {
                        background: #1f2937;
                        border-radius: 4px;
                      }
                      .custom-scrollbar::-webkit-scrollbar-thumb {
                        background-color: #4b5563;
                        border-radius: 4px;
                        border: 2px solid #1f2937;
                      }
                    `}</style>
                  </motion.div>
                )}

                {activeSection === "Past Work" && (
                  <motion.div
                    key="pastWork"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ duration: 0.5 }}
                  >
                    <div className="relative">
                      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-200">
                        Past Work
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {config.pastProjects.map((project: Project, index: number) => (
                          <motion.div
                            key={index}
                            className={`bg-gradient-to-br from-gray-800 to-black p-4 rounded-2xl shadow transition-all duration-300 hover:from-gray-700 hover:to-gray-900 border border-gray-600 cursor-pointer`}
                            onClick={() => toggleProjectExpansion(project)}
                            layout
                          >
                            <Image
                              src={project.image}
                              alt={`${project.name} preview`}
                              width={300}
                              height={200}
                              className="rounded-lg object-cover w-full h-40 mb-3"
                            />
                            <h3 className="text-lg font-semibold text-gray-200 mb-2">
                              {project.name}
                            </h3>
                            <p className="text-gray-400 text-sm">
                              {project.description}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                      <AnimatePresence>
                        {expandedProject && (
                          <motion.div
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                            {...expandAnimation}
                            onClick={() => setExpandedProject(null)}
                          >
                            <div
                              className="bg-gradient-to-br from-gray-800 to-black p-6 rounded-2xl shadow border border-gray-600 max-w-4xl w-full m-4"
                              onClick={(e) => e.stopPropagation()}
                              ref={expandedRef}
                            >
                              <Image
                                src={expandedProject.image}
                                alt={`${expandedProject.name} preview`}
                                width={600}
                                height={400}
                                className="rounded-lg object-cover w-full h-64 mb-4"
                              />
                              <h3 className="text-2xl font-semibold text-gray-200 mb-3">
                                {expandedProject.name}
                              </h3>
                              <p className="text-gray-400 mb-4">
                                {expandedProject.longDescription}
                              </p>
                              <div className="grid grid-cols-3 gap-4">
                                {expandedProject.gallery.map((img, imgIndex) => (
                                  <Image
                                    key={imgIndex}
                                    src={img}
                                    alt={`${expandedProject.name} gallery image ${imgIndex + 1}`}
                                    width={200}
                                    height={150}
                                    className="rounded-lg object-cover w-full h-32"
                                  />
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}

                {activeSection === "Contact Me" && (
                  <motion.div
                    key="contact"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-200">Contact Me</h2>
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                          <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-3 sm:px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                          <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 sm:px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                        <textarea
                          id="message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          required
                          rows={6}
                          className="w-full px-3 sm:px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 resize-none"
                        ></textarea>
                      </div>
                      <div>
                        <button
                          type="submit"
                          className="w-full px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-200"
                        >
                          Send Message
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
          
          {/* Add this new div for the attribution */}
          <div className="text-center text-gray-400 text-sm mt-4">
            <AnimatedLink href="https://square.link/u/LmXVXEOd">Donations!</AnimatedLink>
            <p>&copy; 2024 Xivn LLC. All rights reserved.</p>
          </div>
        </motion.div>
      </motion.div>
      <ToastContainer />
    </>
  );
}
const AnimatedLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="relative group overflow-hidden block"
  >
    <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-full inline-block text-gray-400">
      {children}
    </span>
    <span className="absolute inset-0 z-0 text-purple-400 transition-transform duration-300 translate-y-full group-hover:translate-y-0">
      {children}
    </span>
  </a>
);
