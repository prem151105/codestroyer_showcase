import { portfolioData } from '@/data/portfolioData'
import { commands, commandCategories } from '@/data/commands'

const colors = {
  primary: '<span class="text-terminal-green">',
  secondary: '<span class="text-terminal-cyan">',
  accent: '<span class="text-terminal-amber">',
  error: '<span class="text-red-400">',
  success: '<span class="text-green-400">',
  end: '</span>'
}

const formatWithColor = (text: string, color: string) => `${color}${text}${colors.end}`

export const formatOutput = {
  help: () => {
    let output = `
${formatWithColor('='.repeat(60), colors.primary)}
${formatWithColor('            ANURAG TERMINAL HELP SYSTEM', colors.accent)}
${formatWithColor('='.repeat(60), colors.primary)}

${formatWithColor('BASIC COMMANDS:', colors.secondary)}
`
    commandCategories.basic.forEach(cmd => {
      output += `  ${formatWithColor(cmd.padEnd(15), colors.primary)} ${commands[cmd as keyof typeof commands]}\n`
    })

    output += `\n${formatWithColor('NAVIGATION:', colors.secondary)}\n`
    commandCategories.navigation.forEach(cmd => {
      output += `  ${formatWithColor(cmd.padEnd(15), colors.primary)} ${commands[cmd as keyof typeof commands]}\n`
    })

    output += `\n${formatWithColor('AI/ML SPECIFIC:', colors.secondary)}\n`
    commandCategories.ai_ml.forEach(cmd => {
      output += `  ${formatWithColor(cmd.padEnd(15), colors.primary)} ${commands[cmd as keyof typeof commands]}\n`
    })

    output += `\n${formatWithColor('CODING PLATFORMS:', colors.secondary)}\n`
    commandCategories.coding.forEach(cmd => {
      output += `  ${formatWithColor(cmd.padEnd(15), colors.primary)} ${commands[cmd as keyof typeof commands]}\n`
    })

    output += `\n${formatWithColor('INTERACTIVE & FUN:', colors.secondary)}\n`
    commandCategories.interactive.concat(commandCategories.fun).forEach(cmd => {
      output += `  ${formatWithColor(cmd.padEnd(15), colors.primary)} ${commands[cmd as keyof typeof commands]}\n`
    })

    output += `\n${formatWithColor('SYSTEM SIMULATION:', colors.secondary)}\n`
    commandCategories.system.forEach(cmd => {
      output += `  ${formatWithColor(cmd.padEnd(15), colors.primary)} ${commands[cmd as keyof typeof commands]}\n`
    })

    output += `\n${formatWithColor('TIPS:', colors.accent)}
• Use ${formatWithColor('Tab', colors.primary)} for auto-completion
• Use ${formatWithColor('↑/↓', colors.primary)} arrows for command history
• Use ${formatWithColor('Ctrl+L', colors.primary)} to clear screen
• Use ${formatWithColor('Ctrl+C', colors.primary)} to cancel current input
• Type ${formatWithColor('theme <name>', colors.primary)} to change themes

${formatWithColor('Available themes:', colors.secondary)} classic, matrix, cyberpunk, amber, modern, iiit
`
    return output
  },

  about: (personal: typeof portfolioData.personal) => {
    return `
${formatWithColor('='.repeat(50), colors.primary)}
${formatWithColor('           ABOUT ANURAG JAYASWAL', colors.accent)}
${formatWithColor('='.repeat(50), colors.primary)}

${formatWithColor('Name:', colors.secondary)}        ${personal.name}
${formatWithColor('Location:', colors.secondary)}    ${personal.location}
${formatWithColor('Email:', colors.secondary)}       ${personal.email}
${formatWithColor('Phone:', colors.secondary)}       ${personal.phone}

${formatWithColor('BIOGRAPHY:', colors.secondary)}
${personal.bio}

${formatWithColor('CURRENT FOCUS:', colors.secondary)}
• Building intelligent AI/ML systems
• Developing multi-agent LLM applications
• Competitive programming and algorithmic problem solving
• Open source contributions and community building

${formatWithColor('SOCIAL PROFILES:', colors.secondary)}
${formatWithColor('LinkedIn:', colors.primary)}     ${personal.profiles.linkedin}
${formatWithColor('GitHub:', colors.primary)}       ${personal.profiles.github}
${formatWithColor('LeetCode:', colors.primary)}     ${personal.profiles.leetcode}
${formatWithColor('Codeforces:', colors.primary)}   ${personal.profiles.codeforces}
${formatWithColor('GeeksforGeeks:', colors.primary)} ${personal.profiles.geeksforgeeks}

${formatWithColor('STATUS:', colors.success)} Currently available for new opportunities!
`
  },

  education: (education: typeof portfolioData.education) => {
    let output = `
${formatWithColor('='.repeat(50), colors.primary)}
${formatWithColor('           EDUCATIONAL BACKGROUND', colors.accent)}
${formatWithColor('='.repeat(50), colors.primary)}

`
    education.forEach((edu, index) => {
      output += `
${formatWithColor(`${index + 1}. ${edu.institution}`, colors.secondary)}
${formatWithColor('   Degree:', colors.primary)}    ${edu.degree}
${formatWithColor('   Period:', colors.primary)}    ${edu.period}
`
      if (edu.cgpa) {
        output += `${formatWithColor('   CGPA:', colors.primary)}      ${edu.cgpa}\n`
      }
      if (edu.percentage) {
        output += `${formatWithColor('   Percentage:', colors.primary)} ${edu.percentage}\n`
      }
      output += `${formatWithColor('   Status:', colors.primary)}    ${edu.status}\n`
      
      output += `${formatWithColor('   Highlights:', colors.primary)}\n`
      edu.highlights.forEach(highlight => {
        output += `     • ${highlight}\n`
      })
    })

    return output
  },

  experience: (experience: typeof portfolioData.experience) => {
    let output = `
${formatWithColor('='.repeat(50), colors.primary)}
${formatWithColor('           WORK EXPERIENCE', colors.accent)}
${formatWithColor('='.repeat(50), colors.primary)}

`
    experience.forEach((exp, index) => {
      output += `
${formatWithColor(`${index + 1}. ${exp.company}`, colors.secondary)}
${formatWithColor('   Position:', colors.primary)}   ${exp.position}
${formatWithColor('   Period:', colors.primary)}     ${exp.period}
${formatWithColor('   Type:', colors.primary)}       ${exp.type}
${formatWithColor('   Location:', colors.primary)}   ${exp.location}

${formatWithColor('   Key Achievements:', colors.primary)}
`
      exp.achievements.forEach(achievement => {
        output += `     • ${achievement}\n`
      })

      output += `\n${formatWithColor('   Technologies Used:', colors.primary)}\n     `
      output += exp.technologies.join(', ')
      output += '\n'
    })

    return output
  },

  projects: (projects: typeof portfolioData.projects) => {
    let output = `
${formatWithColor('='.repeat(60), colors.primary)}
${formatWithColor('                 MY PROJECTS', colors.accent)}
${formatWithColor('='.repeat(60), colors.primary)}

`
    projects.forEach((project, index) => {
      output += `
${formatWithColor(`${index + 1}. ${project.name}`, colors.secondary)} ${formatWithColor(`[${project.status}]`, colors.accent)}
${formatWithColor('   Period:', colors.primary)}      ${project.period}
${formatWithColor('   Type:', colors.primary)}        ${project.type}
${formatWithColor('   Description:', colors.primary)} ${project.description}

${formatWithColor('   Key Features:', colors.primary)}
`
      project.features.forEach(feature => {
        output += `     • ${feature}\n`
      })

      output += `\n${formatWithColor('   Technologies:', colors.primary)} ${project.technologies.join(', ')}\n`
      
      if (project.github) {
        output += `${formatWithColor('   GitHub:', colors.primary)}      ${project.github}\n`
      }
      if (project.demo) {
        output += `${formatWithColor('   Demo:', colors.primary)}        ${project.demo}\n`
      }
    })

    output += `\n${formatWithColor('TIP:', colors.accent)} Use 'github <project-name>' to open specific project repository!`

    return output
  },

  skills: (skills: typeof portfolioData.skills) => {
    let output = `
${formatWithColor('='.repeat(60), colors.primary)}
${formatWithColor('               TECHNICAL SKILLS', colors.accent)}
${formatWithColor('='.repeat(60), colors.primary)}

${formatWithColor('PROGRAMMING LANGUAGES:', colors.secondary)}
`
    skills.languages.forEach(lang => {
      const bar = '█'.repeat(Math.floor(lang.level / 10)) + '░'.repeat(10 - Math.floor(lang.level / 10))
      output += `  ${formatWithColor(lang.name.padEnd(12), colors.primary)} ${bar} ${lang.level}% (${lang.experience})\n`
    })

    output += `\n${formatWithColor('FRAMEWORKS & LIBRARIES:', colors.secondary)}\n`
    const categories = ['AI/ML', 'Backend', 'Frontend']
    categories.forEach(category => {
      const categoryFrameworks = skills.frameworks.filter(f => f.category === category)
      if (categoryFrameworks.length > 0) {
        output += `\n  ${formatWithColor(category + ':', colors.accent)}\n`
        categoryFrameworks.forEach(framework => {
          const bar = '█'.repeat(Math.floor(framework.level / 10)) + '░'.repeat(10 - Math.floor(framework.level / 10))
          output += `    ${formatWithColor(framework.name.padEnd(15), colors.primary)} ${bar} ${framework.level}%\n`
        })
      }
    })

    output += `\n${formatWithColor('TOOLS & TECHNOLOGIES:', colors.secondary)}\n`
    const toolCategories = ['IDE', 'AI/ML', 'Cloud', 'DevOps', 'Database', 'Version Control']
    toolCategories.forEach(category => {
      const categoryTools = skills.tools.filter(t => t.category === category)
      if (categoryTools.length > 0) {
        output += `\n  ${formatWithColor(category + ':', colors.accent)}\n`
        categoryTools.forEach(tool => {
          const bar = '█'.repeat(Math.floor(tool.level / 10)) + '░'.repeat(10 - Math.floor(tool.level / 10))
          output += `    ${formatWithColor(tool.name.padEnd(15), colors.primary)} ${bar} ${tool.level}%\n`
        })
      }
    })

    output += `\n${formatWithColor('SPECIALIZATIONS:', colors.secondary)}\n`
    skills.specializations.forEach(spec => {
      output += `  • ${spec}\n`
    })

    return output
  },

  achievements: (achievements: typeof portfolioData.achievements) => {
    let output = `
${formatWithColor('='.repeat(60), colors.primary)}
${formatWithColor('              ACHIEVEMENTS & RATINGS', colors.accent)}
${formatWithColor('='.repeat(60), colors.primary)}

${formatWithColor('COMPETITIVE PROGRAMMING:', colors.secondary)}

${formatWithColor('LeetCode:', colors.primary)}
  Problems Solved: ${formatWithColor(achievements.leetcode.problems_solved, colors.success)}
  Rating: ${formatWithColor(achievements.leetcode.rating, colors.success)}
  Rank: ${formatWithColor(achievements.leetcode.rank, colors.success)}
  Profile: ${achievements.leetcode.profile}

${formatWithColor('Codeforces:', colors.primary)}
  Max Rating: ${formatWithColor(achievements.codeforces.max_rating.toString(), colors.success)}
  Current Rating: ${formatWithColor(achievements.codeforces.current_rating.toString(), colors.success)}
  Rank: ${formatWithColor(achievements.codeforces.rank, colors.success)}
  Contests: ${formatWithColor(achievements.codeforces.contests_participated, colors.success)}
  Problems Solved: ${formatWithColor(achievements.codeforces.problems_solved, colors.success)}

${formatWithColor('CodeChef:', colors.primary)}
  Stars: ${formatWithColor(achievements.codechef.stars, colors.success)}
  Max Rating: ${formatWithColor(achievements.codechef.max_rating.toString(), colors.success)}
  Best Global Rank: ${formatWithColor(`#${achievements.codechef.global_rank_best}`, colors.success)} in ${achievements.codechef.contest}
  Problems Solved: ${formatWithColor(achievements.codechef.problems_solved, colors.success)}

${formatWithColor('OTHER ACHIEVEMENTS:', colors.secondary)}
`
    achievements.general.forEach(achievement => {
      output += `  • ${achievement}\n`
    })

    output += `\n${formatWithColor('CERTIFICATIONS:', colors.secondary)}\n`
    achievements.certifications.forEach(cert => {
      output += `  • ${cert}\n`
    })

    return output
  },

  contact: (personal: typeof portfolioData.personal) => {
    return `
${formatWithColor('='.repeat(50), colors.primary)}
${formatWithColor('            CONTACT INFORMATION', colors.accent)}
${formatWithColor('='.repeat(50), colors.primary)}

${formatWithColor('📧 Email:', colors.secondary)}      ${personal.email}
${formatWithColor('📱 Phone:', colors.secondary)}      ${personal.phone}
${formatWithColor('📍 Location:', colors.secondary)}   ${personal.location}

${formatWithColor('🌐 PROFESSIONAL PROFILES:', colors.secondary)}
${formatWithColor('LinkedIn:', colors.primary)}      ${personal.profiles.linkedin}
${formatWithColor('GitHub:', colors.primary)}        ${personal.profiles.github}

${formatWithColor('💻 CODING PROFILES:', colors.secondary)}
${formatWithColor('LeetCode:', colors.primary)}      ${personal.profiles.leetcode}
${formatWithColor('Codeforces:', colors.primary)}    ${personal.profiles.codeforces}
${formatWithColor('GeeksforGeeks:', colors.primary)} ${personal.profiles.geeksforgeeks}

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
${formatWithColor('='.repeat(50), colors.primary)}
${formatWithColor('              RESUME ACCESS', colors.accent)}
${formatWithColor('='.repeat(50), colors.primary)}

${formatWithColor('📄 RESUME DOWNLOAD:', colors.secondary)}

To view or download my complete resume:

${formatWithColor('1. Online Version:', colors.primary)}
   Visit: https://anurag-portfolio.vercel.app/resume

${formatWithColor('2. PDF Download:', colors.primary)}
   Direct link: https://anurag-portfolio.vercel.app/anurag_jayaswal_resume.pdf

${formatWithColor('3. Interactive Resume:', colors.primary)}
   This terminal itself serves as an interactive resume!
   
${formatWithColor('📋 QUICK SUMMARY:', colors.secondary)}
• AI/ML Developer & Software Engineer
• B.Tech CSE Student at IIIT Bhagalpur
• 250+ LeetCode problems solved
• Codeforces Specialist (Max Rating: 1468)
• Experience with Multi-Agent LLM Systems
• Expertise in Python, AI/ML, and Competitive Programming

${formatWithColor('💡 TIP:', colors.accent)} Use other commands like 'experience', 'projects', 
'skills' to explore different sections of my profile!
`
  },

  ls: (path: string) => {
    const directories = {
      '/home/anurag': [
        'about/', 'education/', 'experience/', 'projects/', 
        'skills/', 'achievements/', 'contact/', 'resume.pdf'
      ],
      '/home/anurag/about': [
        'personal.txt', 'interests.txt', 'philosophy.txt'
      ],
      '/home/anurag/education': [
        'iiit_bhagalpur.txt', 'cambridge_school.txt', 'coursework.txt'
      ],
      '/home/anurag/experience': [
        'contentkosh/'
      ],
      '/home/anurag/experience/contentkosh': [
        'role.txt', 'achievements.txt', 'technologies.txt'
      ],
      '/home/anurag/projects': [
        'resumrank/', 'ai_news_hound/', 'smart_code_review/'
      ],
      '/home/anurag/skills': [
        'programming_languages.txt', 'frameworks.txt', 'tools.txt'
      ],
      '/home/anurag/achievements': [
        'competitive_programming.txt', 'contests.txt', 'certifications.txt'
      ]
    }

    const items = directories[path as keyof typeof directories] || directories['/home/anurag']
    
    let output = `Contents of ${formatWithColor(path, colors.secondary)}:\n\n`
    
    items.forEach(item => {
      const isDirectory = item.endsWith('/')
      const icon = isDirectory ? '📁' : '📄'
      const color = isDirectory ? colors.primary : colors.accent
      output += `${icon} ${formatWithColor(item, color)}\n`
    })

    return output
  },

  cd: (currentPath: string, newPath: string) => {
    // Simple path navigation logic
    if (newPath === '..') {
      const pathParts = currentPath.split('/').filter(p => p)
      pathParts.pop()
      return pathParts.length > 0 ? '/' + pathParts.join('/') : '/home/anurag'
    } else if (newPath.startsWith('/')) {
      return newPath
    } else {
      return currentPath === '/' ? `/${newPath}` : `${currentPath}/${newPath}`
    }
  },

  history: (commandHistory: string[]) => {
    let output = `${formatWithColor('COMMAND HISTORY:', colors.secondary)}\n\n`
    
    commandHistory.slice(-20).forEach((cmd, index) => {
      const lineNumber = (commandHistory.length - 20 + index + 1).toString().padStart(3)
      output += `${formatWithColor(lineNumber, colors.primary)}  ${cmd}\n`
    })

    return output
  },

  tree: () => {
    return `
${formatWithColor('/home/anurag', colors.secondary)}
├── ${formatWithColor('about/', colors.primary)}
│   ├── personal.txt
│   ├── interests.txt
│   └── philosophy.txt
├── ${formatWithColor('education/', colors.primary)}
│   ├── iiit_bhagalpur.txt
│   ├── cambridge_school.txt
│   └── coursework.txt
├── ${formatWithColor('experience/', colors.primary)}
│   └── ${formatWithColor('contentkosh/', colors.primary)}
│       ├── role.txt
│       ├── achievements.txt
│       └── technologies.txt
├── ${formatWithColor('projects/', colors.primary)}
│   ├── ${formatWithColor('resumrank/', colors.primary)}
│   ├── ${formatWithColor('ai_news_hound/', colors.primary)}
│   └── ${formatWithColor('smart_code_review/', colors.primary)}
├── ${formatWithColor('skills/', colors.primary)}
│   ├── programming_languages.txt
│   ├── frameworks.txt
│   └── tools.txt
├── ${formatWithColor('achievements/', colors.primary)}
│   ├── competitive_programming.txt
│   ├── contests.txt
│   └── certifications.txt
├── ${formatWithColor('contact/', colors.primary)}
│   ├── social_media.txt
│   └── professional.txt
└── resume.pdf

${formatWithColor('Total:', colors.accent)} 7 directories, 15+ files
`
  },

  // AI/ML Specific Commands
  aiProjects: (projects: typeof portfolioData.projects) => {
    const aiProjects = projects.filter(p => p.type === 'AI/ML Project')
    
    let output = `
${formatWithColor('='.repeat(60), colors.primary)}
${formatWithColor('              AI/ML PROJECTS SHOWCASE', colors.accent)}
${formatWithColor('='.repeat(60), colors.primary)}

`
    aiProjects.forEach((project, index) => {
      output += `
${formatWithColor(`${index + 1}. ${project.name}`, colors.secondary)} 🤖
${formatWithColor('   Focus Area:', colors.primary)}   ${project.description}
${formatWithColor('   Timeline:', colors.primary)}     ${project.period}
${formatWithColor('   Status:', colors.primary)}       ${formatWithColor(project.status, project.status === 'Completed' ? colors.success : colors.accent)}

${formatWithColor('   AI/ML Techniques Used:', colors.primary)}
`
      const aiTechnologies = project.technologies.filter(tech => 
        ['NLP', 'Transformers', 'TF-IDF', 'LangChain', 'OpenAI', 'Scikit-learn'].includes(tech)
      )
      aiTechnologies.forEach(tech => {
        output += `     • ${tech}\n`
      })

      output += `\n${formatWithColor('   Key AI Features:', colors.primary)}\n`
      project.features.slice(0, 3).forEach(feature => {
        output += `     🔹 ${feature}\n`
      })

      if (project.github) {
        output += `\n${formatWithColor('   Repository:', colors.primary)} ${project.github}\n`
      }
    })

    return output
  },

  mlSkills: (skills: typeof portfolioData.skills) => {
    const mlFrameworks = skills.frameworks.filter(f => f.category === 'AI/ML')
    const mlTools = skills.tools.filter(t => t.category === 'AI/ML')
    
    let output = `
${formatWithColor('='.repeat(60), colors.primary)}
${formatWithColor('           MACHINE LEARNING EXPERTISE', colors.accent)}
${formatWithColor('='.repeat(60), colors.primary)}

${formatWithColor('🧠 ML FRAMEWORKS & LIBRARIES:', colors.secondary)}
`
    mlFrameworks.forEach(framework => {
      const bar = '█'.repeat(Math.floor(framework.level / 10)) + '░'.repeat(10 - Math.floor(framework.level / 10))
      output += `  ${formatWithColor(framework.name.padEnd(15), colors.primary)} ${bar} ${framework.level}%\n`
    })

    output += `\n${formatWithColor('🛠️ ML TOOLS & PLATFORMS:', colors.secondary)}\n`
    mlTools.forEach(tool => {
      const bar = '█'.repeat(Math.floor(tool.level / 10)) + '░'.repeat(10 - Math.floor(tool.level / 10))
      output += `  ${formatWithColor(tool.name.padEnd(15), colors.primary)} ${bar} ${tool.level}%\n`
    })

    output += `\n${formatWithColor('🎯 SPECIALIZATION AREAS:', colors.secondary)}\n`
    const mlSpecializations = skills.specializations.filter(spec => 
      spec.includes('ML') || spec.includes('Learning') || spec.includes('NLP') || spec.includes('Neural')
    )
    mlSpecializations.forEach(spec => {
      output += `  • ${spec}\n`
    })

    output += `\n${formatWithColor('📊 RECENT ML EXPERIENCE:', colors.accent)}
• Multi-Agent LLM Systems with 50% accuracy improvement
• Advanced NLP with 60% reduction in human review  
• Transformer models for semantic understanding
• AI-powered resume ranking and analysis
• Automated news compilation with intelligent curation`

    return output
  },

  neuralNet: () => {
    return `
${formatWithColor('='.repeat(60), colors.primary)}
${formatWithColor('           NEURAL NETWORK VISUALIZATION', colors.accent)}
${formatWithColor('='.repeat(60), colors.primary)}

${formatWithColor('Input Layer', colors.secondary)}     ${formatWithColor('Hidden Layers', colors.primary)}        ${formatWithColor('Output Layer', colors.accent)}
    
    ○ ────────┬─── ● ────┬─── ● ─────── ○
            │         │       │
    ○ ──────┼──── ● ──┼─── ● ──────── ○  
            │         │       │
    ○ ──────┼──── ● ──┼─── ● ──────── ○
            │         │       │
    ○ ──────┴──── ● ──┴─── ● ─────── ○

${formatWithColor('Neural Network Experience:', colors.secondary)}

${formatWithColor('🔬 Architecture Design:', colors.primary)}
• Multi-layer perceptrons for classification
• Convolutional Neural Networks for image processing  
• Recurrent Neural Networks for sequential data
• Transformer architectures for NLP tasks

${formatWithColor('🛠️ Implementation Frameworks:', colors.primary)}
• TensorFlow/Keras for deep learning models
• PyTorch for research and experimentation
• Scikit-learn for traditional ML algorithms
• Hugging Face Transformers for pre-trained models

${formatWithColor('📈 Recent Projects:', colors.primary)}
• Resume semantic analysis using BERT
• News classification with transformer models
• Code quality assessment using neural networks
• Multi-agent system coordination with LLMs

${formatWithColor('⚡ Optimization Techniques:', colors.primary)}
• Gradient descent optimization
• Regularization (L1/L2, Dropout)
• Batch normalization and data preprocessing
• Transfer learning and fine-tuning
`
  },

  transformers: () => {
    return `
${formatWithColor('='.repeat(60), colors.primary)}
${formatWithColor('            TRANSFORMER MODELS EXPERTISE', colors.accent)}
${formatWithColor('='.repeat(60), colors.primary)}

${formatWithColor('🤖 TRANSFORMER ARCHITECTURE:', colors.secondary)}

┌─────────────────────────────────────────────────────┐
│                    OUTPUT                            │
├─────────────────────────────────────────────────────┤
│              Linear & Softmax                       │
├─────────────────────────────────────────────────────┤
│           Add & Norm                                │
├─────────────────────────────────────────────────────┤
│         Feed Forward                                │
├─────────────────────────────────────────────────────┤
│           Add & Norm                                │
├─────────────────────────────────────────────────────┤
│      Multi-Head Attention                          │
├─────────────────────────────────────────────────────┤
│        Positional Encoding                         │
├─────────────────────────────────────────────────────┤
│              INPUT                                  │
└─────────────────────────────────────────────────────┘

${formatWithColor('🔧 MODELS WORKED WITH:', colors.secondary)}
• ${formatWithColor('BERT:', colors.primary)} Bidirectional Encoder Representations from Transformers
• ${formatWithColor('GPT:', colors.primary)} Generative Pre-trained Transformer models  
• ${formatWithColor('T5:', colors.primary)} Text-to-Text Transfer Transformer
• ${formatWithColor('RoBERTa:', colors.primary)} Robustly Optimized BERT Pretraining
• ${formatWithColor('DistilBERT:', colors.primary)} Distilled version of BERT

${formatWithColor('💼 PRACTICAL APPLICATIONS:', colors.secondary)}
• ${formatWithColor('ResuRank Project:', colors.primary)} BERT for resume semantic analysis
• ${formatWithColor('AI News Hound:', colors.primary)} GPT for content summarization  
• ${formatWithColor('Text Classification:', colors.primary)} Fine-tuned transformers for categorization
• ${formatWithColor('Sentiment Analysis:', colors.primary)} Pre-trained models for emotion detection
• ${formatWithColor('Question Answering:', colors.primary)} BERT-based QA systems

${formatWithColor('⚙️ IMPLEMENTATION EXPERIENCE:', colors.secondary)}
• Hugging Face Transformers library
• Fine-tuning pre-trained models
• Custom tokenization and preprocessing
• Attention mechanism visualization
• Model optimization and compression
• Multi-GPU training and inference
`
  },

  // Coding Platform Commands
  leetcode: (leetcodeData: typeof portfolioData.achievements.leetcode) => {
    return `
${formatWithColor('='.repeat(50), colors.primary)}
${formatWithColor('            LEETCODE STATISTICS', colors.accent)}
${formatWithColor('='.repeat(50), colors.primary)}

${formatWithColor('📊 OVERALL STATS:', colors.secondary)}
Problems Solved:    ${formatWithColor(leetcodeData.problems_solved, colors.success)}
Current Rating:     ${formatWithColor(leetcodeData.rating, colors.success)}
Rank Level:         ${formatWithColor(leetcodeData.rank, colors.success)}

${formatWithColor('🏆 ACHIEVEMENTS:', colors.secondary)}
`
    leetcodeData.badges.forEach(badge => {
      output += `• ${badge}\n`
    })

    let output = `Profile: ${leetcodeData.profile}

${formatWithColor('📈 PROBLEM DISTRIBUTION:', colors.secondary)}
Easy:     ████████░░ 80% (120+ problems)
Medium:   ██████░░░░ 60% (100+ problems)  
Hard:     ███░░░░░░░ 30% (30+ problems)

${formatWithColor('🎯 FAVORITE TOPICS:', colors.secondary)}
• Dynamic Programming
• Binary Search & Trees
• Graph Algorithms
• String Manipulation
• Array & Hash Table Problems
• Sliding Window Technique

${formatWithColor('💡 RECENT ACTIVITY:', colors.secondary)}
• Daily problem solving streak: 15+ days
• Contest participation: Regular
• Discussion contributions: Active
• Solution optimization focus

${formatWithColor('🔗 PROFILE:', colors.primary)} ${leetcodeData.profile}
`

    return output
  },

  codeforces: (codeforcesData: typeof portfolioData.achievements.codeforces) => {
    return `
${formatWithColor('='.repeat(50), colors.primary)}
${formatWithColor('           CODEFORCES PROFILE', colors.accent)}
${formatWithColor('='.repeat(50), colors.primary)}

${formatWithColor('📊 RATING INFORMATION:', colors.secondary)}
Max Rating:         ${formatWithColor(codeforcesData.max_rating.toString(), colors.success)}
Current Rating:     ${formatWithColor(codeforcesData.current_rating.toString(), colors.success)}
Rank:               ${formatWithColor(codeforcesData.rank, colors.success)}

${formatWithColor('🎯 CONTEST STATS:', colors.secondary)}
Contests:           ${formatWithColor(codeforcesData.contests_participated, colors.success)}
Problems Solved:    ${formatWithColor(codeforcesData.problems_solved, colors.success)}

${formatWithColor('📈 RATING GRAPH:', colors.secondary)}
1500 ├─────────────────────────── ${formatWithColor('█', colors.success)}
1400 ├─────────────────────█████████
1300 ├───────────█████████████████████
1200 ├─────█████████████████████████████
1100 ├█████████████████████████████████
     └─────────────────────────────────
      Jan  Mar  May  Jul  Sep  Nov

${formatWithColor('🏆 ACHIEVEMENTS:', colors.secondary)}
• Achieved Specialist rank (1400+ rating)
• Consistent contest participation
• Strong problem-solving in Div 2 contests
• Expertise in greedy algorithms and DP

${formatWithColor('💪 STRONGEST AREAS:', colors.secondary)}
• Implementation & Brute Force
• Greedy Algorithms  
• Dynamic Programming
• Graph Theory
• Number Theory

${formatWithColor('🔗 PROFILE:', colors.primary)} ${codeforcesData.profile}
`
  },

  codingStats: (achievements: typeof portfolioData.achievements) => {
    return `
${formatWithColor('='.repeat(60), colors.primary)}
${formatWithColor('          COMPREHENSIVE CODING STATISTICS', colors.accent)}
${formatWithColor('='.repeat(60), colors.primary)}

${formatWithColor('🏆 COMPETITIVE PROGRAMMING SUMMARY:', colors.secondary)}

┌─────────────┬──────────┬─────────┬──────────────┐
│ Platform    │ Rating   │ Rank    │ Problems     │
├─────────────┼──────────┼─────────┼──────────────┤
│ LeetCode    │ ${achievements.leetcode.rating.padEnd(8)} │ Expert  │ ${achievements.leetcode.problems_solved.padEnd(12)} │
│ Codeforces  │ ${achievements.codeforces.max_rating.toString().padEnd(8)} │ Specialist │ ${achievements.codeforces.problems_solved.padEnd(12)} │
│ CodeChef    │ ${achievements.codechef.max_rating.toString().padEnd(8)} │ 2-Star  │ ${achievements.codechef.problems_solved.padEnd(12)} │
└─────────────┴──────────┴─────────┴──────────────┘

${formatWithColor('📊 TOTAL ACHIEVEMENT SUMMARY:', colors.secondary)}
Total Problems Solved: ${formatWithColor('700+', colors.success)}
Total Contest Ratings: ${formatWithColor('4000+', colors.success)}
Active Platforms:      ${formatWithColor('5+', colors.success)}
Coding Experience:     ${formatWithColor('3+ years', colors.success)}

${formatWithColor('🎯 SKILL DISTRIBUTION:', colors.secondary)}
Algorithms:        ████████░░ 85%
Data Structures:   ███████░░░ 80%
Mathematics:       ██████░░░░ 70%
Implementation:    █████████░ 90%
Problem Solving:   ████████░░ 85%

${formatWithColor('🏅 NOTABLE ACHIEVEMENTS:', colors.secondary)}
• CodeChef Global Rank #11 in Contest 164 Div 2
• IOQM (Indian Olympiad Qualifier) Qualified
• Consistent top performer in college contests
• Multiple hackathon participations

${formatWithColor('💡 CODING PHILOSOPHY:', colors.accent)}
"Code is poetry written in logic. Every problem is an opportunity 
to create an elegant solution that stands the test of time."
`
  },

  contestHistory: (achievements: typeof portfolioData.achievements) => {
    return `
${formatWithColor('='.repeat(60), colors.primary)}
${formatWithColor('            CONTEST PARTICIPATION HISTORY', colors.accent)}
${formatWithColor('='.repeat(60), colors.primary)}

${formatWithColor('🏆 MAJOR CONTEST HIGHLIGHTS:', colors.secondary)}

${formatWithColor('CodeChef Contest 164 Div 2:', colors.primary)}
• Global Rank: ${formatWithColor('#11', colors.success)}
• Performance: Outstanding
• Problems Solved: 4/5
• Contest Type: Rated Division 2

${formatWithColor('LeetCode Weekly Contests:', colors.primary)}
• Regular participation: 15+ contests
• Best Rank: Top 500 globally
• Average Performance: 2-3 problems solved
• Consistent rating improvement

${formatWithColor('Codeforces Rounds:', colors.primary)}
• Contests Participated: ${achievements.codeforces.contests_participated}
• Best Performance: +150 rating gain
• Division: Primarily Div 2, some Div 1
• Specialty: Implementation and DP problems

${formatWithColor('📅 RECENT CONTEST ACTIVITY:', colors.secondary)}
┌────────────────┬─────────────┬──────┬─────────────┐
│ Contest        │ Platform    │ Rank │ Performance │
├────────────────┼─────────────┼──────┼─────────────┤
│ Weekly 372     │ LeetCode    │ 456  │ 3/4 solved  │
│ Round 912      │ Codeforces  │ 1234 │ +45 rating  │
│ Cook-Off 164   │ CodeChef    │ 11   │ 4/5 solved  │
│ Biweekly 118   │ LeetCode    │ 567  │ 2/4 solved  │
└────────────────┴─────────────┴──────┴─────────────┘

${formatWithColor('📈 CONTEST STRATEGY:', colors.secondary)}
• ${formatWithColor('Preparation:', colors.primary)} Daily practice 2-3 hours
• ${formatWithColor('Focus Areas:', colors.primary)} DP, Graphs, Greedy, Implementation
• ${formatWithColor('Time Management:', colors.primary)} Optimized problem selection
• ${formatWithColor('Learning:', colors.primary)} Analyze editorials post-contest

${formatWithColor('🎯 UPCOMING GOALS:', colors.accent)}
• Achieve LeetCode rating 1600+
• Reach Codeforces Expert (1600+)
• Participate in ICPC regionals
• Contribute to competitive programming community
`
  },

  // Fun Commands
  weather: () => {
    return `
${formatWithColor('='.repeat(50), colors.primary)}
${formatWithColor('      WEATHER IN GWALIOR, MADHYA PRADESH', colors.accent)}
${formatWithColor('='.repeat(50), colors.primary)}

     ☀️
   \\  |  /     ${formatWithColor('Temperature:', colors.primary)} 28°C (82°F)
    \\ | /      ${formatWithColor('Feels like:', colors.primary)} 31°C (88°F)
─────███─────  ${formatWithColor('Humidity:', colors.primary)} 65%
    / | \\      ${formatWithColor('Wind:', colors.primary)} 12 km/h SW
   /  |  \\     ${formatWithColor('Visibility:', colors.primary)} 10 km
              ${formatWithColor('UV Index:', colors.primary)} 7 (High)

${formatWithColor('CONDITIONS:', colors.secondary)} Partly Cloudy
${formatWithColor('PRESSURE:', colors.secondary)} 1013 hPa

${formatWithColor('🌅 SUNRISE:', colors.primary)} 06:42 AM
${formatWithColor('🌇 SUNSET:', colors.primary)} 06:18 PM

${formatWithColor('💻 CODING WEATHER:', colors.accent)} Perfect! ☕
Ideal conditions for indoor programming sessions.
`
  },

  quote: () => {
    const quotes = [
      {
        text: "The best error message is the one that never shows up.",
        author: "Thomas Fuchs"
      },
      {
        text: "Code is like humor. When you have to explain it, it's bad.",
        author: "Cory House"
      },
      {
        text: "Programs must be written for people to read, and only incidentally for machines to execute.",
        author: "Harold Abelson"
      },
      {
        text: "The most important single aspect of software development is to be clear about what you are trying to build.",
        author: "Bjarne Stroustrup"
      },
      {
        text: "Artificial Intelligence is the new electricity.",
        author: "Andrew Ng"
      },
      {
        text: "Machine learning is the last invention that humanity will ever need to make.",
        author: "Nick Bostrom"
      }
    ]
    
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    
    return `
${formatWithColor('💡 CODING WISDOM:', colors.accent)}

"${randomQuote.text}"

${formatWithColor('— ' + randomQuote.author, colors.secondary)}

${formatWithColor('✨ ANURAG\'S ADDITION:', colors.primary)}
"Every bug is a feature waiting to be discovered, 
and every algorithm is a poem written in logic."
`
  },

  joke: () => {
    const jokes = [
      "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
      "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡",
      "Why don't programmers like nature? It has too many bugs! 🌿",
      "A SQL query walks into a bar, walks up to two tables and asks... 'Can I join you?' 🍺",
      "Why do Java developers wear glasses? Because they can't C#! 👓",
      "There are 10 types of people in the world: those who understand binary and those who don't! 10",
      "Debugging: Being the detective in a crime movie where you are also the murderer! 🕵️",
      "Why did the AI break up with the algorithm? It wasn't learning anymore! 🤖💔"
    ]
    
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)]
    
    return `
${formatWithColor('😄 PROGRAMMING HUMOR:', colors.accent)}

${randomJoke}

${formatWithColor('🎭 BONUS DAD JOKE:', colors.secondary)}
What's the object-oriented way to become wealthy?
${formatWithColor('Inheritance! 💰', colors.success)}
`
  },

  cowsay: (message: string) => {
    return `
${formatWithColor('🐄 COW SAYS:', colors.accent)}
 _${message.replace(/./g, '_')}_
< ${message} >
 -${message.replace(/./g, '-')}-
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||

${formatWithColor('Moo! 🐮', colors.primary)}
`
  },

  figlet: (text: string) => {
    // Simple ASCII art generator for demo
    const letters: { [key: string]: string[] } = {
      'A': [
        ' █████╗ ',
        '██╔══██╗',
        '███████║',
        '██╔══██║',
        '██║  ██║',
        '╚═╝  ╚═╝'
      ],
      'N': [
        '███╗   ██╗',
        '████╗  ██║',
        '██╔██╗ ██║',
        '██║╚██╗██║',
        '██║ ╚████║',
        '╚═╝  ╚═══╝'
      ],
      'U': [
        '██╗   ██╗',
        '██║   ██║',
        '██║   ██║',
        '██║   ██║',
        '╚██████╔╝',
        ' ╚═════╝ '
      ],
      'R': [
        '██████╗ ',
        '██╔══██╗',
        '██████╔╝',
        '██╔══██╗',
        '██║  ██║',
        '╚═╝  ╚═╝'
      ],
      'G': [
        ' ██████╗ ',
        '██╔════╝ ',
        '██║  ███╗',
        '██║   ██║',
        '╚██████╔╝',
        ' ╚═════╝ '
      ]
    }
    
    if (text.toUpperCase() === 'ANURAG') {
      return `
${formatWithColor('ASCII ART:', colors.accent)}

${formatWithColor(letters['A'][0] + letters['N'][0] + letters['U'][0] + letters['R'][0] + letters['A'][0] + letters['G'][0], colors.primary)}
${formatWithColor(letters['A'][1] + letters['N'][1] + letters['U'][1] + letters['R'][1] + letters['A'][1] + letters['G'][1], colors.primary)}
${formatWithColor(letters['A'][2] + letters['N'][2] + letters['U'][2] + letters['R'][2] + letters['A'][2] + letters['G'][2], colors.primary)}
${formatWithColor(letters['A'][3] + letters['N'][3] + letters['U'][3] + letters['R'][3] + letters['A'][3] + letters['G'][3], colors.primary)}
${formatWithColor(letters['A'][4] + letters['N'][4] + letters['U'][4] + letters['R'][4] + letters['A'][4] + letters['G'][4], colors.primary)}
${formatWithColor(letters['A'][5] + letters['N'][5] + letters['U'][5] + letters['R'][5] + letters['A'][5] + letters['G'][5], colors.primary)}
`
    } else {
      return `
${formatWithColor('ASCII ART:', colors.accent)}

████████╗███████╗██╗  ██╗████████╗
╚══██╔══╝██╔════╝╚██╗██╔╝╚══██╔══╝
   ██║   █████╗   ╚███╔╝    ██║   
   ██║   ██╔══╝   ██╔██╗    ██║   
   ██║   ███████╗██╔╝ ██╗   ██║   
   ╚═╝   ╚══════╝╚═╝  ╚═╝   ╚═╝   

${formatWithColor('"' + text + '"', colors.secondary)}
`
    }
  },

  ping: (url: string) => {
    return `
${formatWithColor('🏓 PING SIMULATION:', colors.accent)}

PING ${url} (${url}): 56 data bytes

64 bytes from ${url}: icmp_seq=1 ttl=64 time=12.3 ms
64 bytes from ${url}: icmp_seq=2 ttl=64 time=11.8 ms  
64 bytes from ${url}: icmp_seq=3 ttl=64 time=13.1 ms
64 bytes from ${url}: icmp_seq=4 ttl=64 time=12.0 ms

--- ${url} ping statistics ---
4 packets transmitted, 4 received, 0% packet loss
round-trip min/avg/max/stddev = 11.8/12.3/13.1/0.5 ms

${formatWithColor('🌐 CONNECTION:', colors.success)} Excellent!
${formatWithColor('📡 LATENCY:', colors.primary)} Low (12.3ms average)
`
  },

  ps: () => {
    return `
${formatWithColor('📊 PROCESS LIST (Portfolio Services):', colors.accent)}

  PID  TTY      STAT   TIME COMMAND
 1234  pts/0    S      0:01 anurag-portfolio
 1235  pts/0    R      0:12 ai-brain-service  
 1236  pts/0    S      0:03 leetcode-tracker
 1237  pts/0    S      0:05 codeforces-sync
 1238  pts/0    R      0:08 project-monitor
 1239  pts/0    S      0:02 skills-updater
 1240  pts/0    R      0:15 terminal-interface
 1241  pts/0    S      0:01 theme-manager
 1242  pts/0    S      0:00 matrix-rain-fx

${formatWithColor('📈 RESOURCE USAGE:', colors.secondary)}
CPU: ${formatWithColor('85%', colors.success)} (AI models working hard!)
RAM: ${formatWithColor('2.5GB', colors.primary)} (Caching project data)
Uptime: ${formatWithColor('42 days', colors.accent)} (Portfolio never sleeps!)
`
  },

  top: () => {
    return `
${formatWithColor('⚡ SYSTEM MONITOR - ANURAG PORTFOLIO OS', colors.accent)}
${formatWithColor('='.repeat(55), colors.primary)}

Load average: 1.85, 1.67, 1.45    Up: 42 days, 13:37
Tasks: 9 total, 3 running, 6 sleeping
CPU: 85.5% us, 8.2% sy, 0.0% ni, 6.3% id

  PID USER      PR  NI    VIRT    RES    SHR S %CPU %MEM   TIME+ COMMAND
 1235 anurag    20   0   245MB   89MB   12MB R 23.5  4.2   0:12 ai-brain-service
 1240 anurag    20   0   156MB   67MB    8MB R 18.7  3.1   0:15 terminal-interface
 1238 anurag    20   0   123MB   45MB    6MB R 15.2  2.1   0:08 project-monitor
 1236 anurag    20   0    89MB   34MB    4MB S  8.1  1.6   0:03 leetcode-tracker
 1237 anurag    20   0    76MB   28MB    3MB S  6.3  1.3   0:05 codeforces-sync
 1234 anurag    20   0    67MB   23MB    2MB S  3.7  1.1   0:01 portfolio-core
 1239 anurag    20   0    45MB   18MB    2MB S  2.1  0.8   0:02 skills-updater
 1241 anurag    20   0    34MB   12MB    1MB S  1.2  0.6   0:01 theme-manager
 1242 anurag    20   0    23MB    8MB    1MB S  0.8  0.4   0:00 matrix-rain-fx

${formatWithColor('💡 PERFORMANCE INSIGHTS:', colors.secondary)}
• AI services consuming most resources (as expected!)
• Terminal interface highly responsive
• All critical systems operational
• Ready for heavy coding workloads! 🚀
`
  },

  vim: () => {
    return `
${formatWithColor('📝 VIM EDITOR (SIMULATION)', colors.accent)}
${formatWithColor('='.repeat(50), colors.primary)}

Welcome to Vim - the editor that never lets you leave! 😄

${formatWithColor('~ ANURAG\'S .VIMRC HIGHLIGHTS ~', colors.secondary)}

" My favorite Vim configurations
set number                 " Show line numbers  
set relativenumber        " Relative line numbers
set tabstop=4            " Tab width
set shiftwidth=4         " Indent width
set expandtab           " Spaces instead of tabs
set hlsearch           " Highlight search results
set incsearch          " Incremental search
syntax on              " Syntax highlighting
colorscheme molokai    " Dark color scheme

" Custom mappings for productivity
map <leader>w :w<CR>              " Quick save
map <leader>q :q<CR>              " Quick quit
map <leader>t :NERDTree<CR>       " File tree
map <leader>f :FZF<CR>            " Fuzzy finder

${formatWithColor('⚡ VIM PRODUCTIVITY STATS:', colors.primary)}
• Daily usage: 4-6 hours for coding
• Favorite plugins: NERDTree, FZF, Coc.nvim
• Coding efficiency: +200% vs regular editors
• Exit success rate: 98% (getting better!) 

${formatWithColor('🎯 PRO TIP:', colors.accent)} To exit Vim: :q! (just kidding, use :wq to save!)
`
  },

  github: (projectName?: string) => {
    if (projectName) {
      const project = portfolioData.projects.find(p => 
        p.name.toLowerCase().includes(projectName.toLowerCase())
      )
      
      if (project && project.github) {
        return `
${formatWithColor('🚀 OPENING GITHUB REPOSITORY:', colors.accent)}

${formatWithColor('Project:', colors.primary)} ${project.name}
${formatWithColor('Repository:', colors.secondary)} ${project.github}
${formatWithColor('Status:', colors.primary)} ${project.status}

${formatWithColor('📁 Repository Contents:', colors.secondary)}
• Source code and documentation
• Installation and setup instructions  
• Demo screenshots and examples
• Issues and contribution guidelines
• Latest commits and updates

${formatWithColor('⭐ STAR THE REPO:', colors.accent)} Help support open source!
`
      } else {
        return `
${formatWithColor('❌ PROJECT NOT FOUND:', colors.error)}

Project "${projectName}" not found in portfolio.
Available projects: ${portfolioData.projects.map(p => p.name).join(', ')}

Try: github resumrank, github ai-news-hound
`
      }
    } else {
      return `
${formatWithColor('🐙 GITHUB PROFILE:', colors.accent)}

${formatWithColor('Profile:', colors.primary)} https://github.com/anuragj7879
${formatWithColor('Repositories:', colors.secondary)} 15+ public repos
${formatWithColor('Languages:', colors.secondary)} Python, Java, C++, JavaScript
${formatWithColor('Contributions:', colors.secondary)} 500+ commits this year

${formatWithColor('📈 GITHUB STATS:', colors.secondary)}
• Total Stars Earned: 50+
• Forks: 25+  
• Open Source Contributions: Active
• Green Squares: Consistent daily commits

${formatWithColor('🏆 FEATURED REPOSITORIES:', colors.primary)}
• ResuRank - AI Resume Ranking System
• AI News Hound - Automated News Compilation
• Smart Code Review - AI-powered Code Analysis
• Terminal Portfolio - This interactive portfolio!

${formatWithColor('💡 TIP:', colors.accent)} Use 'github <project-name>' to view specific repos!
`
    }
  }
}