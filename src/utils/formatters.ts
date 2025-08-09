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
    const output = `
┌─────────────────────────────────────────────────────────────────┐
│            🚀 ANURAG'S PROFESSIONAL PORTFOLIO GUIDE            │
└─────────────────────────────────────────────────────────────────┘

${formatWithColor('👋 WELCOME! I\'m actively seeking SDE & AI/ML opportunities', colors.success)}

${formatWithColor('🌟 ESSENTIAL COMMANDS (Start Here):', colors.secondary)}
  ${formatWithColor('about'.padEnd(12), colors.primary)} 👨‍💻 Who I am, my mission & current availability
  ${formatWithColor('resume'.padEnd(12), colors.primary)} 📄 Download PDF resume & view career highlights
  ${formatWithColor('contact'.padEnd(12), colors.primary)} 📧 Direct contact info, LinkedIn, GitHub profiles

${formatWithColor('💼 PROFESSIONAL DEEP-DIVE:', colors.secondary)}
  ${formatWithColor('experience'.padEnd(12), colors.primary)} 🏢 AI/ML Developer role at Contentkosh + impact metrics
  ${formatWithColor('projects'.padEnd(12), colors.primary)} 🛠️  Technical projects with live demos & GitHub links
  ${formatWithColor('skills'.padEnd(12), colors.primary)} ⚡ Programming expertise, AI/ML stack, tools
  ${formatWithColor('education'.padEnd(12), colors.primary)} 🎓 IIIT Bhagalpur, academic achievements, CGPA

${formatWithColor('⚡ UTILITY COMMANDS:', colors.secondary)}
  ${formatWithColor('help'.padEnd(12), colors.primary)} ❓ Show this comprehensive guide
  ${formatWithColor('clear'.padEnd(12), colors.primary)} 🧹 Clear terminal screen for fresh start

${formatWithColor('🎯 NAVIGATION TIPS:', colors.accent)}
• ${formatWithColor('↑/↓ arrows', colors.primary)} - Browse your command history
• ${formatWithColor('Tab key', colors.primary)} - Auto-complete commands (try typing "ab" + Tab)
• ${formatWithColor('Ctrl+L', colors.primary)} - Quick screen clear shortcut
• ${formatWithColor('Mobile users', colors.primary)} - Use the command buttons above for easy navigation



${formatWithColor('💡 RECOMMENDED JOURNEY FOR RECRUITERS:', colors.success)}
1️⃣ ${formatWithColor('about', colors.primary)} → Get to know me and my current goals
2️⃣ ${formatWithColor('experience', colors.primary)} → See my professional AI/ML work & impact
3️⃣ ${formatWithColor('projects', colors.primary)} → Explore technical projects with real metrics
4️⃣ ${formatWithColor('skills', colors.primary)} → Review my technical expertise & achievements
5️⃣ ${formatWithColor('resume', colors.primary)} → Download PDF or connect directly
6️⃣ ${formatWithColor('contact', colors.primary)} → Let's discuss opportunities!

${formatWithColor('🚀 STATUS:', colors.accent)} Ready to contribute immediately • Open to relocate • Visa not required
`
    return output
  },

  about: () => {
    return `
┌─────────────────────────────────────────────────────────────────┐
│                         👨‍💻 ABOUT ANURAG                          │
└─────────────────────────────────────────────────────────────────┘

${formatWithColor('PERSONAL INFO:', colors.secondary)}
📝 ${formatWithColor('Name:', colors.primary).padEnd(20)}        ${portfolioData.personal.name}
🎯 ${formatWithColor('Role:', colors.primary).padEnd(20)}        ${portfolioData.personal.title}
📍 ${formatWithColor('Location:', colors.primary).padEnd(20)}    ${portfolioData.personal.location}
📧 ${formatWithColor('Email:', colors.primary).padEnd(20)}       ${portfolioData.personal.email}
📱 ${formatWithColor('Phone:', colors.primary).padEnd(20)}       ${portfolioData.personal.phone}

${formatWithColor('WHO AM I?', colors.secondary)}
${portfolioData.about}

${formatWithColor('🎯 CURRENT MISSION:', colors.secondary)}
• 🤖 Building cutting-edge AI/ML systems & multi-agent applications
• 💻 Mastering competitive programming (LeetCode 1500+, CF Specialist)
• 🔬 R&D in Natural Language Processing and LLM optimization
• 🌟 Contributing to open source & helping fellow developers

${formatWithColor('📊 QUICK STATS:', colors.accent)}
🏆 ${formatWithColor('LeetCode:', colors.primary)} 250+ problems solved, 1500+ rating
⭐ ${formatWithColor('Codeforces:', colors.primary)} Specialist rank, 1468 max rating  
🎯 ${formatWithColor('Academic:', colors.primary)} 7.71 CGPA at IIIT Bhagalpur
🚀 ${formatWithColor('Experience:', colors.primary)} AI Agent Developer at Contentkosh

${formatWithColor('🎯 WHAT\'S NEXT?', colors.accent)}
→ ${formatWithColor('experience', colors.primary)} - Deep dive into my professional journey
→ ${formatWithColor('projects', colors.primary)} - Explore my technical creations with live demos
→ ${formatWithColor('skills', colors.primary)} - Check out my technical expertise & proficiency
→ ${formatWithColor('contact', colors.primary)} - Let's connect and collaborate!

${formatWithColor('🟢 AVAILABILITY:', colors.success)} Actively seeking SDE & AI/ML opportunities! Ready to make an impact! 🚀
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
    return `
┌─────────────────────────────────────────┐
│            CONTACT INFORMATION          │
└─────────────────────────────────────────┘

${formatWithColor('📧 Email:', colors.secondary)}      ${portfolioData.personal.email}
${formatWithColor('📱 Phone:', colors.secondary)}      ${portfolioData.personal.phone}
${formatWithColor('📍 Location:', colors.secondary)}   ${portfolioData.personal.location}

${formatWithColor('🌐 CONNECT WITH ME:', colors.secondary)}
${formatWithColor('LinkedIn:', colors.primary)}      https://linkedin.com/in/anurag-jayaswal
${formatWithColor('GitHub:', colors.primary)}        https://github.com/anuragj7879
${formatWithColor('LeetCode:', colors.primary)}      https://leetcode.com/anuragj7879
${formatWithColor('Codeforces:', colors.primary)}    https://codeforces.com/profile/anuragj7879

${formatWithColor('📝 MESSAGE:', colors.accent)}
I'm always open to discussing new opportunities, 
collaborating on interesting projects, or just 
having a chat about technology and AI/ML!

Feel free to reach out through any of the above channels.
I typically respond within 24 hours.

${formatWithColor('🚀 CURRENTLY LOOKING FOR:', colors.secondary)}
• Full-time Software Engineer positions
• AI/ML Engineer roles  
• Research internships
• Open source collaborations
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