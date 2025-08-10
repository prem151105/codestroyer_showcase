'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { portfolioData } from '@/data/portfolioData'

const sections = [
  { id: 'about', title: 'About', icon: '👨‍💻' },
  { id: 'experience', title: 'Experience', icon: '💼' },
  { id: 'projects', title: 'Projects', icon: '🚀' },
  { id: 'skills', title: 'Skills', icon: '⚡' },
  { id: 'education', title: 'Education', icon: '🎓' },
  { id: 'achievements', title: 'Achievements', icon: '🏆' },
  { id: 'contact', title: 'Contact', icon: '📧' }
]

export default function LeftContent() {
  const [activeSection, setActiveSection] = useState('about')

  const renderContent = () => {
    switch (activeSection) {
      case 'about':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">About Me</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              {portfolioData.about}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800/50 p-4 rounded-lg">
                <h3 className="text-purple-400 font-semibold mb-2">Location</h3>
                <p className="text-gray-300">{portfolioData.personal.location}</p>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-lg">
                <h3 className="text-purple-400 font-semibold mb-2">Role</h3>
                <p className="text-gray-300">{portfolioData.personal.title}</p>
              </div>
            </div>
          </motion.div>
        )

      case 'experience':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">Experience</h2>
            {portfolioData.experience.map((exp, index) => (
              <div key={index} className="bg-slate-800/50 p-6 rounded-lg mb-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{exp.role}</h3>
                    <p className="text-purple-400">{exp.company}</p>
                  </div>
                  <span className="text-gray-400 text-sm">{exp.period}</span>
                </div>
                <ul className="space-y-2">
                  {exp.highlights.map((highlight, i) => (
                    <li key={i} className="text-gray-300 flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        )

      case 'projects':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">Projects</h2>
            <div className="space-y-6">
              {portfolioData.projects.map((project, index) => (
                <div key={index} className="bg-slate-800/50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-white mb-2">{project.name}</h3>
                  <p className="text-purple-400 text-sm mb-3">{project.tech}</p>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex gap-3">
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                    >
                      GitHub
                    </a>
                    {project.demo && (
                      <a 
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                      >
                        Demo
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )

      case 'skills':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">Skills</h2>
            <div className="space-y-6">
              <div className="bg-slate-800/50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-purple-400 mb-4">Languages</h3>
                <div className="flex flex-wrap gap-3">
                  {portfolioData.skills.languages.map((skill, index) => (
                    <span key={index} className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="bg-slate-800/50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">AI/ML</h3>
                <div className="flex flex-wrap gap-3">
                  {portfolioData.skills.aiml.map((skill, index) => (
                    <span key={index} className="bg-cyan-600/20 text-cyan-300 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800/50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-400 mb-4">Tools & Technologies</h3>
                <div className="flex flex-wrap gap-3">
                  {portfolioData.skills.tools.map((skill, index) => (
                    <span key={index} className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )

      case 'education':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">Education</h2>
            <div className="space-y-4">
              {portfolioData.education.map((edu, index) => (
                <div key={index} className="bg-slate-800/50 p-6 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{edu.degree}</h3>
                      <p className="text-purple-400">{edu.institution}</p>
                    </div>
                    <span className="text-gray-400 text-sm">{edu.period}</span>
                  </div>
                  <p className="text-gray-300">
                    {edu.cgpa ? `CGPA: ${edu.cgpa}` : `Percentage: ${edu.percentage}`}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )

      case 'achievements':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">Achievements</h2>
            <div className="space-y-4">
              {portfolioData.achievements.map((achievement, index) => (
                <div key={index} className="bg-slate-800/50 p-4 rounded-lg flex items-center">
                  <span className="text-2xl mr-4">🏆</span>
                  <p className="text-gray-300">{achievement}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )

      case 'contact':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">Contact Me</h2>
            <div className="space-y-4">
              <div className="bg-slate-800/50 p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-purple-400 font-semibold mb-2">Email</h3>
                    <p className="text-gray-300">{portfolioData.personal.email}</p>
                  </div>
                  <div>
                    <h3 className="text-purple-400 font-semibold mb-2">Phone</h3>
                    <p className="text-gray-300">{portfolioData.personal.phone}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <a 
                  href="https://linkedin.com/in/anurag-jayaswal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
                >
                  LinkedIn
                </a>
                <a 
                  href="https://github.com/anuragj7879"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
                >
                  GitHub
                </a>
              </div>
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
          {portfolioData.personal.name}
        </h1>
        <p className="text-xl text-gray-300">
          {portfolioData.personal.title}
        </p>
      </motion.div>

      {/* Navigation */}
      <motion.nav
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex flex-wrap gap-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                activeSection === section.id
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25'
                  : 'bg-slate-800/50 text-gray-300 hover:bg-slate-700/50 hover:text-white'
              }`}
            >
              <span>{section.icon}</span>
              {section.title}
            </button>
          ))}
        </div>
      </motion.nav>

      {/* Content */}
      <AnimatePresence mode="wait">
        <div key={activeSection}>
          {renderContent()}
        </div>
      </AnimatePresence>
    </div>
  )
}