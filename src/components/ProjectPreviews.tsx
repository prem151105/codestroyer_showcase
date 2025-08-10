'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Project {
  name: string
  tech: string
  description: string
  github?: string
  demo?: string
}

interface ProjectPreviewsProps {
  projects: Project[]
}

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  
  // Enhanced thumbnail with particle effects
  const getThumbnail = (name: string) => {
    const thumbnails: Record<string, string> = {
      'ResuRank': `
        <div class="relative bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800 p-6 h-full flex flex-col items-center justify-center overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-tr from-blue-400/20 to-purple-600/20"></div>
          <div class="absolute top-2 right-2 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <div class="text-5xl mb-3 transform hover:scale-110 transition-transform duration-300">📄</div>
          <div class="text-xl font-bold text-white mb-1 text-center">AI Resume</div>
          <div class="text-sm text-blue-200 mb-2">Ranking System</div>
          <div class="mt-2 px-2 py-1 bg-green-500/20 rounded-full text-xs text-green-300 font-semibold">35% efficiency ↗</div>
          <div class="absolute -bottom-10 -right-10 w-20 h-20 border-2 border-blue-300/30 rounded-full"></div>
          <div class="absolute -top-10 -left-10 w-16 h-16 border-2 border-purple-300/20 rounded-full"></div>
        </div>
      `,
      'AI News Hound': `
        <div class="relative bg-gradient-to-br from-green-600 via-teal-700 to-emerald-800 p-6 h-full flex flex-col items-center justify-center overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-tr from-green-400/20 to-teal-600/20"></div>
          <div class="absolute top-2 right-2 w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
          <div class="text-5xl mb-3 transform hover:scale-110 transition-transform duration-300">📰</div>
          <div class="text-xl font-bold text-white mb-1 text-center">News AI</div>
          <div class="text-sm text-green-200 mb-2">Auto Curator</div>
          <div class="mt-2 px-2 py-1 bg-green-500/20 rounded-full text-xs text-green-300 font-semibold">90% success rate</div>
          <div class="absolute -bottom-8 -right-8 w-16 h-16 border-2 border-teal-300/30 rounded-full"></div>
          <div class="absolute -top-8 -left-8 w-12 h-12 border-2 border-green-300/20 rounded-full"></div>
        </div>
      `,
      'Smart Code Review Bot': `
        <div class="relative bg-gradient-to-br from-orange-600 via-red-700 to-pink-800 p-6 h-full flex flex-col items-center justify-center overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-tr from-orange-400/20 to-red-600/20"></div>
          <div class="absolute top-2 right-2 w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
          <div class="text-5xl mb-3 transform hover:scale-110 transition-transform duration-300">🤖</div>
          <div class="text-xl font-bold text-white mb-1 text-center">Code AI</div>
          <div class="text-sm text-orange-200 mb-2">Review Bot</div>
          <div class="mt-2 px-2 py-1 bg-orange-500/20 rounded-full text-xs text-orange-300 font-semibold">60% faster</div>
          <div class="absolute -bottom-12 -right-12 w-24 h-24 border-2 border-orange-300/30 rounded-full"></div>
          <div class="absolute -top-6 -left-6 w-14 h-14 border-2 border-red-300/20 rounded-full"></div>
        </div>
      `
    }
    return thumbnails[name] || `
      <div class="relative bg-gradient-to-br from-gray-600 to-gray-700 p-6 h-full flex flex-col items-center justify-center overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-tr from-gray-400/20 to-gray-600/20"></div>
        <div class="text-5xl mb-3 transform hover:scale-110 transition-transform duration-300">⚙️</div>
        <div class="text-xl font-bold text-white mb-1">${name}</div>
        <div class="text-sm text-gray-200">Project</div>
      </div>
    `
  }

  return (
    <>
      <motion.div
        className="group relative cursor-pointer"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ scale: 1.02, y: -5 }}
        onClick={() => setIsExpanded(true)}
      >
        {/* Thumbnail */}
        <div className="relative h-40 md:h-48 rounded-lg overflow-hidden shadow-lg border border-gray-600">
          <div 
            dangerouslySetInnerHTML={{ __html: getThumbnail(project.name) }}
            className="absolute inset-0"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300" />
          
          {/* Hover effects */}
          <motion.div
            className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-400 transition-all duration-300 rounded-lg"
            whileHover={{
              boxShadow: '0 0 20px rgba(6, 182, 212, 0.5)'
            }}
          />
          
          {/* Click indicator */}
          <motion.div
            className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 md:transition-opacity md:duration-300"
          >
            <span className="hidden md:inline">Click to expand ↗</span>
            <span className="md:hidden">Tap ↗</span>
          </motion.div>
        </div>
        
        {/* Project title */}
        <motion.h3 
          className="text-base md:text-lg font-semibold text-cyan-400 mt-2 md:mt-3 group-hover:text-orange-400 transition-colors duration-300"
        >
          {project.name}
        </motion.h3>
        <p className="text-xs md:text-sm text-gray-400 mt-1 line-clamp-2">{project.description}</p>
      </motion.div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50"
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-gray-900 rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <motion.h2 
                  className="text-2xl font-bold text-cyan-400"
                  initial={{ x: -20 }}
                  animate={{ x: 0 }}
                >
                  {project.name}
                </motion.h2>
                <motion.button
                  className="text-gray-400 hover:text-white transition-colors text-2xl"
                  onClick={() => setIsExpanded(false)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ×
                </motion.button>
              </div>
              
              {/* Expanded thumbnail */}
              <motion.div 
                className="h-64 rounded-lg mb-6 overflow-hidden"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div 
                  dangerouslySetInnerHTML={{ __html: getThumbnail(project.name) }}
                  className="h-full w-full"
                />
              </motion.div>

              {/* Project details */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <div>
                  <h3 className="text-orange-400 font-semibold mb-2">🛠️ Technologies Used:</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.split(', ').map((tech, i) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.05 }}
                        className="bg-gray-800 px-3 py-1 rounded-full text-sm text-gray-300 border border-gray-600"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-orange-400 font-semibold mb-2">📋 Description:</h3>
                  <p className="text-gray-300 leading-relaxed">{project.description}</p>
                </div>

                {/* Action buttons */}
                <div className="flex gap-4 pt-4">
                  {project.github && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-cyan-400 flex items-center gap-2 transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      📂 View Code
                    </motion.a>
                  )}
                  {project.demo && (
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-4 py-2 rounded-lg text-white flex items-center gap-2 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      🌐 Live Demo
                    </motion.a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const ProjectPreviews: React.FC<ProjectPreviewsProps> = ({ projects }) => {
  return (
    <div className="space-y-8">
      {/* Enhanced Header with Animation */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        className="text-center mb-8 md:mb-12 relative"
      >
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent blur-xl"></div>
        
        <motion.h2 
          className="text-2xl md:text-4xl font-bold mb-4 relative"
          initial={{ backgroundPosition: '0% 50%' }}
          animate={{ 
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{ duration: 5, repeat: Infinity }}
          style={{
            background: 'linear-gradient(90deg, #06b6d4, #8b5cf6, #06b6d4)',
            backgroundSize: '200% 200%',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent'
          }}
        >
          🚀 Featured Projects & Innovations
        </motion.h2>
        
        <motion.p 
          className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <span className="hidden md:inline">
            Dive deep into my AI/ML projects with interactive demos, comprehensive code analysis, 
            and detailed technical breakdowns. Click any card to explore!
          </span>
          <span className="md:hidden">
            Explore my AI/ML projects with interactive demos and code insights
          </span>
        </motion.p>

        {/* Floating decorative elements */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-60"
              animate={{
                y: [0, -20, 0],
                x: [0, Math.sin(i) * 30, 0],
                opacity: [0.4, 0.8, 0.4],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
              style={{
                left: `${-20 + i * 20}px`,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Enhanced Project Grid with Staggered Animation */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {projects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} />
        ))}
      </motion.div>
      
      {/* Enhanced Stats with Animation */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="relative mt-12"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-500/10 to-transparent"></div>
        
        <div className="relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 md:p-8">
          <h3 className="text-lg md:text-xl font-semibold text-center text-gray-300 mb-6">
            🏆 Project Portfolio Highlights
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { 
                value: projects.length, 
                label: 'Featured Projects', 
                color: 'from-orange-400 to-red-400',
                icon: '🎯',
                description: 'Production-ready applications'
              },
              { 
                value: '100%', 
                label: 'Open Source', 
                color: 'from-green-400 to-emerald-400',
                icon: '🌟',
                description: 'All code publicly available'
              },
              { 
                value: 'AI/ML', 
                label: 'Technology Focus', 
                color: 'from-purple-400 to-pink-400',
                icon: '🤖',
                description: 'Advanced artificial intelligence'
              }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center group cursor-pointer"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  delay: 1.2 + index * 0.2, 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="mb-3">
                  <motion.div
                    className="text-3xl mb-2"
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                  >
                    {stat.icon}
                  </motion.div>
                  
                  <motion.div 
                    className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                    style={{ backgroundSize: '200% 200%' }}
                  >
                    {stat.value}
                  </motion.div>
                </div>
                
                <div className="text-sm font-semibold text-gray-300 mb-1">
                  {stat.label}
                </div>
                
                <div className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {stat.description}
                </div>
                
                {/* Hover glow effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300`}
                  whileHover={{ scale: 1.1 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ProjectPreviews