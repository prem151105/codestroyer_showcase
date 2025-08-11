'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { portfolioData } from '@/data/portfolioData'

const sections = [
  { id: 'about', title: 'About', icon: '🤖', gradient: 'from-cyan-500 to-blue-500' },
  { id: 'experience', title: 'Experience', icon: '⚡', gradient: 'from-purple-500 to-pink-500' },
  { id: 'projects', title: 'Projects', icon: '🚀', gradient: 'from-emerald-500 to-teal-500' },
  { id: 'skills', title: 'Skills', icon: '🧠', gradient: 'from-orange-500 to-red-500' },
  { id: 'education', title: 'Education', icon: '🎓', gradient: 'from-indigo-500 to-purple-500' },
  { id: 'achievements', title: 'Achievements', icon: '🏆', gradient: 'from-yellow-500 to-orange-500' },
  { id: 'contact', title: 'Contact', icon: '📡', gradient: 'from-pink-500 to-rose-500' }
]

// Helper function for tool icons
const getToolIcon = (tool: string) => {
  const iconMap: { [key: string]: string } = {
    'Git': '🌿',
    'Docker': '🐳',
    'VS Code': '🆚',
    'Jupyter': '📓',
    'AWS': '☁️',
    'React': '⚛️',
    'Next.js': '🔺',
    'Node.js': '🟢',
    'TensorFlow': '🧠',
    'PyTorch': '🔥',
    'Python': '🐍',
    'JavaScript': '🟨',
    'TypeScript': '🔷'
  }
  return iconMap[tool] || '🔧'
}

export default function LeftContent() {
  const [activeSection, setActiveSection] = useState('about')
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [hoveredNav, setHoveredNav] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const backgroundShift = useTransform(scrollYProgress, [0, 1], [0, 300])

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
            <div className="flex items-center gap-4 mb-8">
              <motion.div
                className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-2xl"
                whileHover={{ scale: 1.1, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                🚀
              </motion.div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                AI/ML Projects
              </h2>
            </div>

            {/* Horizontal scroll container */}
            <div className="relative mb-6">
              <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-gradient-to-r scrollbar-thumb-from-emerald-500 scrollbar-thumb-to-teal-500">
                {portfolioData.projects.map((project, index) => (
                  <motion.div
                    key={index}
                    className="group relative min-w-[350px] bg-gradient-to-br from-slate-900/90 to-slate-800/90 rounded-2xl border border-emerald-500/20 hover:border-emerald-400/50 transition-all duration-500 overflow-hidden cursor-pointer"
                    whileHover={{ 
                      scale: 1.05, 
                      rotateY: 5,
                      boxShadow: "0 25px 50px rgba(16, 185, 129, 0.2)"
                    }}
                    onHoverStart={() => setHoveredProject(index)}
                    onHoverEnd={() => setHoveredProject(null)}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Animated background gradient */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      animate={{
                        background: hoveredProject === index ? [
                          "radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)",
                          "radial-gradient(circle at 80% 50%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)",
                          "radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)"
                        ] : undefined
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />

                    {/* Neural network pattern overlay */}
                    <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                      <svg width="100%" height="100%" className="absolute inset-0">
                        <pattern id={`neural-${index}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                          <circle cx="20" cy="20" r="2" fill="currentColor" className="text-emerald-400">
                            <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
                          </circle>
                          <line x1="20" y1="20" x2="40" y2="20" stroke="currentColor" strokeWidth="0.5" className="text-emerald-400" opacity="0.3" />
                          <line x1="20" y1="20" x2="20" y2="40" stroke="currentColor" strokeWidth="0.5" className="text-emerald-400" opacity="0.3" />
                        </pattern>
                        <rect width="100%" height="100%" fill={`url(#neural-${index})`} />
                      </svg>
                    </div>

                    <div className="relative z-10 p-6 h-full flex flex-col">
                      {/* Project header */}
                      <div className="flex items-start justify-between mb-4">
                        <motion.div
                          className="flex items-center gap-3"
                          whileHover={{ x: 5 }}
                        >
                          <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50">
                            <motion.div
                              className="w-full h-full rounded-full bg-emerald-300"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                          </div>
                          <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                            {project.name}
                          </h3>
                        </motion.div>
                        
                        <motion.div
                          className="text-2xl opacity-50 group-hover:opacity-100 transition-opacity"
                          animate={{ rotate: hoveredProject === index ? [0, 360] : 0 }}
                          transition={{ duration: 1 }}
                        >
                          🧠
                        </motion.div>
                      </div>

                      {/* Tech stack with animated tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.split(', ').map((tech, techIndex) => (
                          <motion.span
                            key={techIndex}
                            className="px-3 py-1 text-xs bg-emerald-500/10 text-emerald-300 rounded-full border border-emerald-500/30 hover:border-emerald-400/50 transition-all"
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(16, 185, 129, 0.2)" }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: techIndex * 0.05 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>

                      {/* Description */}
                      <p className="text-gray-300 text-sm mb-6 flex-grow leading-relaxed group-hover:text-gray-200 transition-colors">
                        {project.description}
                      </p>

                      {/* Action buttons */}
                      <div className="flex gap-3 mt-auto">
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-slate-800/50 hover:bg-slate-700/50 text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm transition-all border border-slate-600/50 hover:border-emerald-500/50 flex items-center justify-center gap-2"
                          whileHover={{ scale: 1.02, boxShadow: "0 4px 15px rgba(16, 185, 129, 0.2)" }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span>📂</span>
                          GitHub
                        </motion.a>
                        {project.demo && (
                          <motion.a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-4 py-2 rounded-lg text-sm transition-all shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2"
                            whileHover={{ scale: 1.02, boxShadow: "0 8px 25px rgba(16, 185, 129, 0.4)" }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span>🚀</span>
                            Live Demo
                          </motion.a>
                        )}
                      </div>
                    </div>

                    {/* Floating particles */}
                    {hoveredProject === index && (
                      <>
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-emerald-400 rounded-full"
                            style={{
                              left: `${20 + Math.random() * 60}%`,
                              top: `${20 + Math.random() * 60}%`,
                            }}
                            animate={{
                              y: [0, -20, 0],
                              opacity: [0, 1, 0],
                              scale: [0, 1, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.3,
                              ease: "easeInOut"
                            }}
                          />
                        ))}
                      </>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Project statistics */}
            <motion.div
              className="grid grid-cols-3 gap-4 mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {[
                { label: "Projects Built", value: `${portfolioData.projects.length}+`, color: "emerald" },
                { label: "Technologies", value: "15+", color: "teal" },
                { label: "Success Rate", value: "90%", color: "cyan" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className={`bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-4 text-center border border-${stat.color}-500/20 hover:border-${stat.color}-400/40 transition-all cursor-pointer`}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className={`text-2xl font-bold text-${stat.color}-400`}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-gray-300 text-sm mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )

      case 'skills':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="flex items-center gap-4 mb-8">
              <motion.div
                className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-2xl"
                whileHover={{ scale: 1.1, rotate: -15 }}
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🧠
              </motion.div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Technical Arsenal
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* AI/ML Skills - Featured prominently */}
              <motion.div
                className="lg:col-span-2 bg-gradient-to-br from-orange-900/30 to-red-900/30 backdrop-blur-sm border border-orange-500/30 rounded-2xl p-6 relative overflow-hidden"
                whileHover={{ scale: 1.02, borderColor: "rgba(249, 115, 22, 0.5)" }}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {/* AI neural network animation */}
                <div className="absolute inset-0 opacity-10">
                  <svg className="w-full h-full">
                    <defs>
                      <pattern id="neural-bg" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                        <circle cx="30" cy="30" r="2" fill="currentColor" className="text-orange-400">
                          <animate attributeName="r" values="1;3;1" dur="3s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="15" cy="15" r="1.5" fill="currentColor" className="text-red-400">
                          <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="45" cy="15" r="1.5" fill="currentColor" className="text-orange-300">
                          <animate attributeName="opacity" values="0.5;0.8;0.5" dur="2.5s" repeatCount="indefinite" />
                        </circle>
                        <path d="M15,15 L30,30 L45,15" stroke="currentColor" strokeWidth="0.5" className="text-orange-400" opacity="0.4" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#neural-bg)" />
                  </svg>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div
                      className="text-2xl"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      🤖
                    </motion.div>
                    <h3 className="text-2xl font-bold text-orange-300">AI/ML Expertise</h3>
                    <div className="flex-1 h-px bg-gradient-to-r from-orange-400 to-transparent ml-4" />
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {portfolioData.skills.aiml.map((skill, index) => (
                      <motion.div
                        key={skill}
                        className="group relative bg-gradient-to-r from-orange-500/10 to-red-500/10 hover:from-orange-500/20 hover:to-red-500/20 border border-orange-500/20 hover:border-orange-400/40 rounded-xl p-3 text-center cursor-pointer transition-all"
                        whileHover={{ 
                          scale: 1.05, 
                          y: -2,
                          boxShadow: "0 8px 25px rgba(249, 115, 22, 0.3)" 
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {/* Skill level indicator */}
                        <motion.div
                          className="w-full h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-2 origin-left"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 0.7 + (index % 3) * 0.1 }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                        />
                        
                        <span className="text-sm font-medium text-orange-200 group-hover:text-white transition-colors">
                          {skill}
                        </span>

                        {/* Floating particles on hover */}
                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                        >
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-1 h-1 bg-orange-400 rounded-full"
                              style={{
                                left: `${30 + Math.cos(i * 120 * Math.PI / 180) * 15}%`,
                                top: `${30 + Math.sin(i * 120 * Math.PI / 180) * 15}%`,
                              }}
                              animate={{
                                scale: [0, 1, 0],
                                opacity: [0, 1, 0],
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.2,
                              }}
                            />
                          ))}
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Programming Languages */}
              <motion.div
                className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 relative overflow-hidden"
                whileHover={{ scale: 1.02, borderColor: "rgba(147, 51, 234, 0.5)" }}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    className="text-xl"
                    animate={{ 
                      rotateY: [0, 180, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    💻
                  </motion.div>
                  <h3 className="text-xl font-bold text-purple-300">Languages</h3>
                </div>
                
                <div className="space-y-3">
                  {portfolioData.skills.languages.map((skill, index) => (
                    <motion.div
                      key={skill}
                      className="relative group"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-purple-200">{skill}</span>
                        <span className="text-xs text-purple-400">{85 - index * 5}%</span>
                      </div>
                      <div className="w-full bg-purple-900/30 rounded-full h-2">
                        <motion.div
                          className="h-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${85 - index * 5}%` }}
                          transition={{ delay: 0.7 + index * 0.1, duration: 0.8, ease: "easeOut" }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Tools & Technologies */}
            <motion.div
              className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-6 relative overflow-hidden"
              whileHover={{ scale: 1.01, borderColor: "rgba(6, 182, 212, 0.4)" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400" 
                     style={{
                       maskImage: "repeating-conic-gradient(from 0deg at 50% 50%, transparent 0deg, black 20deg, transparent 40deg)",
                       WebkitMaskImage: "repeating-conic-gradient(from 0deg at 50% 50%, transparent 0deg, black 20deg, transparent 40deg)"
                     }} 
                />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    className="text-2xl"
                    animate={{ 
                      rotateX: [0, 360],
                      scale: [1, 1.2, 1] 
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                  >
                    ⚡
                  </motion.div>
                  <h3 className="text-2xl font-bold text-cyan-300">Tools & Technologies</h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-cyan-400 to-transparent ml-4" />
                </div>

                {/* Hexagonal grid layout for tools */}
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                  {portfolioData.skills.tools.map((tool, index) => (
                    <motion.div
                      key={tool}
                      className="group relative aspect-square bg-gradient-to-br from-cyan-500/10 to-blue-500/10 hover:from-cyan-500/20 hover:to-blue-500/20 border border-cyan-500/20 hover:border-cyan-400/40 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all p-2"
                      style={{
                        clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
                      }}
                      whileHover={{ 
                        scale: 1.1,
                        rotate: 5,
                        boxShadow: "0 8px 25px rgba(6, 182, 212, 0.3)"
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        delay: 0.6 + index * 0.05,
                        type: "spring",
                        stiffness: 200,
                        damping: 15
                      }}
                    >
                      <div className="text-center">
                        <motion.div
                          className="text-lg mb-1"
                          animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{ 
                            duration: 3, 
                            repeat: Infinity, 
                            delay: index * 0.2 
                          }}
                        >
                          {getToolIcon(tool)}
                        </motion.div>
                        <span className="text-xs font-medium text-cyan-200 group-hover:text-white transition-colors leading-tight">
                          {tool}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Skills Summary Stats */}
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {[
                { label: "Languages", value: portfolioData.skills.languages.length, icon: "💻", color: "purple" },
                { label: "AI/ML Tools", value: portfolioData.skills.aiml.length, icon: "🤖", color: "orange" },
                { label: "Technologies", value: portfolioData.skills.tools.length, icon: "⚡", color: "cyan" },
                { label: "Experience", value: "2+ Years", icon: "🚀", color: "emerald" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className={`bg-gradient-to-br from-${stat.color}-900/20 to-${stat.color}-800/20 border border-${stat.color}-500/30 rounded-xl p-4 text-center cursor-pointer hover:border-${stat.color}-400/50 transition-all`}
                  whileHover={{ scale: 1.05, y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                >
                  <motion.div
                    className="text-2xl mb-2"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  >
                    {stat.icon}
                  </motion.div>
                  <motion.div
                    className={`text-xl font-bold text-${stat.color}-400`}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-gray-300 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
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
    <div className="max-w-4xl relative" ref={containerRef}>
      {/* Animated Background Elements */}
      <motion.div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ y: backgroundShift }}
      >
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full blur-3xl" />
        <div className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/3 w-56 h-56 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full blur-3xl" />
      </motion.div>

      {/* Enhanced Header */}
      <motion.div
        className="mb-8 lg:mb-12 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative">
          {/* Floating particles around name */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 opacity-30"
              style={{
                left: `${10 + i * 12}%`,
                top: `${-10 + Math.sin(i) * 20}px`
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}

          <motion.h1 
            className="text-4xl lg:text-6xl font-bold mb-2 lg:mb-4 relative"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {portfolioData.personal.name.split(' ').map((word, index) => (
              <motion.span
                key={word}
                className="inline-block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mr-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ 
                  scale: 1.05,
                  textShadow: "0 0 20px rgba(34, 211, 238, 0.5)"
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              className="w-3 h-3 rounded-full bg-emerald-400"
              animate={{ 
                boxShadow: [
                  "0 0 10px rgba(16, 185, 129, 0.5)",
                  "0 0 20px rgba(16, 185, 129, 0.8)",
                  "0 0 10px rgba(16, 185, 129, 0.5)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.p 
              className="text-base lg:text-xl text-gray-300 font-medium"
              whileHover={{ color: "rgb(209, 213, 219)" }}
            >
              {portfolioData.personal.title}
            </motion.p>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {[
              { label: "Projects", value: `${portfolioData.projects.length}+`, color: "emerald" },
              { label: "Experience", value: "2+ Years", color: "blue" },
              { label: "Skills", value: "15+", color: "purple" },
              { label: "LeetCode", value: "1500+", color: "orange" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-3 rounded-xl bg-slate-800/30 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-all cursor-pointer"
                whileHover={{ scale: 1.05, y: -2 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <motion.div
                  className={`text-lg font-bold text-${stat.color}-400`}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Navigation */}
      <motion.nav
        className="mb-6 lg:mb-8 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Navigation container with horizontal scroll */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-600">
          {sections.map((section, index) => {
            const isActive = activeSection === section.id
            const isHovered = hoveredNav === section.id
            
            return (
              <motion.button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                onHoverStart={() => setHoveredNav(section.id)}
                onHoverEnd={() => setHoveredNav(null)}
                className={`relative px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-3 whitespace-nowrap min-w-fit ${
                  isActive
                    ? 'text-white shadow-lg'
                    : 'bg-slate-800/30 text-gray-300 hover:text-white backdrop-blur-sm border border-white/5 hover:border-white/10'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                style={isActive ? {
                  background: `linear-gradient(135deg, ${section.gradient.includes('from-cyan') ? 'rgb(6, 182, 212)' : 
                                                         section.gradient.includes('from-purple') ? 'rgb(147, 51, 234)' :
                                                         section.gradient.includes('from-emerald') ? 'rgb(16, 185, 129)' :
                                                         section.gradient.includes('from-orange') ? 'rgb(249, 115, 22)' :
                                                         section.gradient.includes('from-indigo') ? 'rgb(99, 102, 241)' :
                                                         section.gradient.includes('from-yellow') ? 'rgb(245, 158, 11)' :
                                                         'rgb(236, 72, 153)'} 0%, ${
                                                         section.gradient.includes('to-blue') ? 'rgb(59, 130, 246)' :
                                                         section.gradient.includes('to-pink') ? 'rgb(236, 72, 153)' :
                                                         section.gradient.includes('to-teal') ? 'rgb(20, 184, 166)' :
                                                         section.gradient.includes('to-red') ? 'rgb(239, 68, 68)' :
                                                         section.gradient.includes('to-purple') ? 'rgb(147, 51, 234)' :
                                                         section.gradient.includes('to-orange') ? 'rgb(249, 115, 22)' :
                                                         'rgb(244, 63, 94)'} 100%)`,
                  boxShadow: `0 8px 32px ${section.gradient.includes('from-cyan') ? 'rgba(6, 182, 212, 0.3)' : 
                                          section.gradient.includes('from-purple') ? 'rgba(147, 51, 234, 0.3)' :
                                          section.gradient.includes('from-emerald') ? 'rgba(16, 185, 129, 0.3)' :
                                          section.gradient.includes('from-orange') ? 'rgba(249, 115, 22, 0.3)' :
                                          section.gradient.includes('from-indigo') ? 'rgba(99, 102, 241, 0.3)' :
                                          section.gradient.includes('from-yellow') ? 'rgba(245, 158, 11, 0.3)' :
                                          'rgba(236, 72, 153, 0.3)'}`
                } : {}}
              >
                {/* Background glow effect */}
                {(isActive || isHovered) && (
                  <motion.div
                    className="absolute inset-0 rounded-xl blur-xl opacity-30"
                    style={{
                      background: `linear-gradient(135deg, ${section.gradient.includes('from-cyan') ? 'rgb(6, 182, 212)' : 
                                                             section.gradient.includes('from-purple') ? 'rgb(147, 51, 234)' :
                                                             section.gradient.includes('from-emerald') ? 'rgb(16, 185, 129)' :
                                                             section.gradient.includes('from-orange') ? 'rgb(249, 115, 22)' :
                                                             section.gradient.includes('from-indigo') ? 'rgb(99, 102, 241)' :
                                                             section.gradient.includes('from-yellow') ? 'rgb(245, 158, 11)' :
                                                             'rgb(236, 72, 153)'} 0%, ${
                                                             section.gradient.includes('to-blue') ? 'rgb(59, 130, 246)' :
                                                             section.gradient.includes('to-pink') ? 'rgb(236, 72, 153)' :
                                                             section.gradient.includes('to-teal') ? 'rgb(20, 184, 166)' :
                                                             section.gradient.includes('to-red') ? 'rgb(239, 68, 68)' :
                                                             section.gradient.includes('to-purple') ? 'rgb(147, 51, 234)' :
                                                             section.gradient.includes('to-orange') ? 'rgb(249, 115, 22)' :
                                                             'rgb(244, 63, 94)'} 100%)`
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.3, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                  />
                )}

                {/* Icon with animation */}
                <motion.span
                  className="text-lg relative z-10"
                  animate={isActive ? { 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  } : {}}
                  transition={{ 
                    duration: 2, 
                    repeat: isActive ? Infinity : 0,
                    ease: "easeInOut"
                  }}
                >
                  {section.icon}
                </motion.span>

                {/* Title */}
                <span className="relative z-10 font-semibold">
                  {section.title}
                </span>

                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    className="absolute -bottom-1 left-1/2 w-6 h-1 bg-white rounded-full"
                    initial={{ width: 0, x: "-50%" }}
                    animate={{ width: 24, x: "-50%" }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            )
          })}
        </div>

        {/* Navigation indicator line */}
        <motion.div
          className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mt-4"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        />
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