import { portfolioData } from '@/data/portfolioData'
import { commands, commandCategories } from '@/data/commands'

const colors = {
  primary: '<span class="text-success">',
  secondary: '<span class="text-accent">',
  accent: '<span class="text-warning">',
  error: '<span class="text-error">',
  success: '<span class="text-success">',
  end: '</span>'
}

const formatWithColor = (text: string, color: string) => `${color}${text}${colors.end}`

// Helper function to get project impact details
const getProjectImpact = (projectName: string): string => {
  const impacts: Record<string, string> = {
    'ResuRank': '35% improvement in recruitment efficiency, processes 100+ resumes/min',
    'AI News Hound': '90% automation success rate, reduced manual curation by 80%',
    'Smart Code Review Bot': 'Automated review for 10+ developers, 60% faster code quality checks'
  }
  return impacts[projectName] || 'Enhanced development workflow and user experience'
}

export const formatOutput = {
  help: () => {
    const output = `Available commands:

  ${formatWithColor('about', colors.primary)}      Learn about me
  ${formatWithColor('experience', colors.primary)} View my work experience  
  ${formatWithColor('projects', colors.primary)}   Explore my projects
  ${formatWithColor('skills', colors.primary)}     View my technical skills
  ${formatWithColor('education', colors.primary)}  Check my education
  ${formatWithColor('contact', colors.primary)}    Get my contact info
  ${formatWithColor('resume', colors.primary)}     View/download my resume
  ${formatWithColor('clear', colors.primary)}      Clear the screen

Type any command to get started!`
    return output
  },

  about: () => {
    return `${formatWithColor('👨‍💻 About Anurag Jayaswal', colors.secondary)}

AI/ML Developer & Computer Science Student
📍 Gwalior, MP | 🎓 IIIT Bhagalpur (CGPA: 7.71)

${formatWithColor('Quick Stats:', colors.accent)}
🏆 LeetCode Expert (1500+ rating, 250+ problems)
⭐ Codeforces Specialist (1468 max rating)
🚀 AI Agent Developer at Contentkosh

${formatWithColor('🟢 Currently seeking SDE & AI/ML opportunities!', colors.success)}
`
  },

  education: () => {
    let output = `
┌─────────────────────────────────────────┐
│           EDUCATIONAL BACKGROUND        │
└─────────────────────────────────────────┘

`
    portfolioData.education.forEach((edu, index) => {
      output += `
${formatWithColor(`${index + 1}. ${edu.institution}`, colors.secondary)}
   ${formatWithColor('Degree:', colors.primary)}    ${edu.degree}
   ${formatWithColor('Period:', colors.primary)}    ${edu.period}
`
      if (edu.cgpa) {
        output += `   ${formatWithColor('CGPA:', colors.primary)}      ${edu.cgpa}\n`
      }
      if (edu.percentage) {
        output += `   ${formatWithColor('Percentage:', colors.primary)} ${edu.percentage}\n`
      }
    })

    return output
  },

  experience: () => {
    let output = `
┌─────────────────────────────────────────┐
│             WORK EXPERIENCE             │
└─────────────────────────────────────────┘

`
    portfolioData.experience.forEach((exp, index) => {
      output += `
${formatWithColor(`${index + 1}. ${exp.company}`, colors.secondary)}
   ${formatWithColor('Role:', colors.primary)}     ${exp.role}
   ${formatWithColor('Period:', colors.primary)}   ${exp.period}

   ${formatWithColor('Key Highlights:', colors.primary)}
`
      exp.highlights.forEach(highlight => {
        output += `     • ${highlight}\n`
      })
    })

    output += `\n${formatWithColor('💡 Want to know more?', colors.accent)} Contact me for detailed discussions!`
    return output
  },

  projects: () => {
    let output = `
┌─────────────────────────────────────────────────────────────────┐
│                    🚀 TECHNICAL PROJECTS SHOWCASE               │
└─────────────────────────────────────────────────────────────────┘

${formatWithColor('Featured AI/ML Projects with Real Impact:', colors.accent)}

`
    portfolioData.projects.forEach((project, index) => {
      output += `
${formatWithColor(`${index + 1}. ${project.name}`, colors.secondary)} ${index === 0 ? '⭐' : index === 1 ? '🔥' : '💎'}
   ${formatWithColor('🛠️  Tech Stack:', colors.primary)} ${project.tech}
   ${formatWithColor('📋 Description:', colors.primary)} ${project.description}
   ${formatWithColor('💡 Impact:', colors.accent)} ${getProjectImpact(project.name)}
`
      if (project.github) {
        output += `   ${formatWithColor('📂 Repository:', colors.primary)} ${project.github}\n`
      }
      if (project.demo) {
        output += `   ${formatWithColor('🌐 Live Demo:', colors.primary)} ${project.demo}\n`
      }
    })

    output += `
${formatWithColor('🌟 PROJECT HIGHLIGHTS:', colors.secondary)}
• Built production-ready AI systems with measurable performance improvements
• Integrated multiple APIs and services for seamless user experiences  
• Applied cutting-edge ML techniques including NLP, Transformers, and LLMs
• Focus on real-world problem solving with practical business value

${formatWithColor('💻 EXPLORE MORE:', colors.accent)} 
→ GitHub: https://github.com/anuragj7879 (10+ repositories)
→ All projects include comprehensive documentation & deployment guides
→ Many projects are deployed live - click the demo links above!

${formatWithColor('🤝 COLLABORATION:', colors.success)} Interested in any project? Let's discuss improvements or collaborations!`
    return output
  },

  skills: () => {
    const output = `
┌─────────────────────────────────────────┐
│            TECHNICAL SKILLS             │
└─────────────────────────────────────────┘

${formatWithColor('💻 PROGRAMMING LANGUAGES:', colors.secondary)}
${portfolioData.skills.languages.map(lang => `   • ${lang}`).join('\n')}

${formatWithColor('🤖 AI/ML TECHNOLOGIES:', colors.secondary)}
${portfolioData.skills.aiml.map(tech => `   • ${tech}`).join('\n')}

${formatWithColor('🛠️  TOOLS & TECHNOLOGIES:', colors.secondary)}
${portfolioData.skills.tools.map(tool => `   • ${tool}`).join('\n')}

${formatWithColor('🏆 ACHIEVEMENTS:', colors.secondary)}
${portfolioData.achievements.map(achievement => `   • ${achievement}`).join('\n')}

${formatWithColor('💡 Interested in collaboration?', colors.accent)} Let's connect and build something amazing!
`
    return output
  },

  contact: () => {
    return `${formatWithColor('📧 Contact Information', colors.secondary)}

${formatWithColor('Email:', colors.primary)} ${portfolioData.personal.email}
${formatWithColor('Phone:', colors.primary)} ${portfolioData.personal.phone}
${formatWithColor('Location:', colors.primary)} ${portfolioData.personal.location}

${formatWithColor('🌐 Connect with me:', colors.accent)}
LinkedIn: https://linkedin.com/in/anurag-jayaswal
GitHub: https://github.com/anuragj7879
LeetCode: https://leetcode.com/anuragj7879
Codeforces: https://codeforces.com/profile/anuragj7879

${formatWithColor('🚀 Open to SDE & AI/ML opportunities!', colors.success)}
`
  },

  resume: () => {
    return `
┌─────────────────────────────────────────────────────────────────┐
│                        📄 RESUME & CV ACCESS                   │
└─────────────────────────────────────────────────────────────────┘

${formatWithColor('🔗 QUICK ACCESS LINKS:', colors.secondary)}

${formatWithColor('📋 PDF Resume:', colors.primary)}        <a href="#" onclick="window.open('https://docs.google.com/document/d/your-resume-id/export?format=pdf', '_blank')" class="terminal-link">Download PDF Resume</a>
${formatWithColor('💼 LinkedIn Profile:', colors.primary)}   <a href="https://linkedin.com/in/anurag-jayaswal" target="_blank" class="terminal-link">View LinkedIn</a>
${formatWithColor('🌐 Portfolio Website:', colors.primary)}  You're here! This terminal is my interactive resume
${formatWithColor('📧 Direct Contact:', colors.primary)}     <a href="mailto:aj7879219119@gmail.com" class="terminal-link">aj7879219119@gmail.com</a>

${formatWithColor('📊 RESUME HIGHLIGHTS:', colors.secondary)}
┌─────────────────────────────────────────────────────────────────┐
│ 🎯 ${formatWithColor('OBJECTIVE:', colors.primary)} Seeking SDE & AI/ML roles to leverage my expertise    │
│    in competitive programming and machine learning systems      │
│                                                                 │
│ 🎓 ${formatWithColor('EDUCATION:', colors.primary)} B.Tech CSE, IIIT Bhagalpur (2023-2027)            │
│    Current CGPA: 7.71/10 • Strong academic performance          │
│                                                                 │
│ 💼 ${formatWithColor('EXPERIENCE:', colors.primary)} AI Agent Developer at Contentkosh (2025)          │
│    • Multi-Agent LLM Systems (50% accuracy boost)               │
│    • NLP optimization reducing manual review by 60%             │
│                                                                 │
│ 🏆 ${formatWithColor('ACHIEVEMENTS:', colors.primary)}                                                   │
│    • LeetCode: 250+ problems, 1500+ rating, Expert level        │
│    • Codeforces: Specialist rank, 1468 max rating               │
│    • CodeChef: Global Rank #11 in Contest 164 Div 2             │
│                                                                 │
│ 🛠️  ${formatWithColor('TECH STACK:', colors.primary)}                                                   │
│    • Languages: Python, Java, C++, JavaScript, SQL             │
│    • AI/ML: TensorFlow, PyTorch, LangChain, Scikit-learn        │
│    • Tools: Docker, Git, AWS, Jupyter, VS Code                  │
└─────────────────────────────────────────────────────────────────┘

${formatWithColor('📈 IMPACT & METRICS:', colors.accent)}
• Improved recruitment efficiency by 35% with ResuRank AI system
• Automated 90% of news curation with AI News Hound
• Optimized code review processes for 10+ developers
• Built production-ready systems processing 100+ requests/minute

${formatWithColor('🎯 CAREER STATUS:', colors.success)} 
Currently seeking full-time opportunities in:
• Software Engineering (SDE) roles
• AI/ML Engineering positions  
• Research & Development internships
• Competitive programming teams

${formatWithColor('💡 NEXT STEPS:', colors.accent)} Ready to discuss how I can contribute to your team!
→ ${formatWithColor('contact', colors.primary)} - Get my details and social profiles
→ ${formatWithColor('projects', colors.primary)} - Explore my technical work with live demos
→ ${formatWithColor('experience', colors.primary)} - Deep dive into my professional journey
`
  }
}