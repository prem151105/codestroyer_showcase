export const portfolioData = {
  personal: {
    name: 'Anurag Jayaswal',
    location: 'Gwalior, Madhya Pradesh',
    phone: '+91-7879219119',
    email: 'aj7879219119@gmail.com',
    bio: `Passionate AI/ML Developer and Software Engineer with expertise in building intelligent systems.
Currently pursuing B.Tech in Computer Science & Engineering at IIIT Bhagalpur.
Specialized in multi-agent LLM systems, NLP, and competitive programming.`,
    profiles: {
      linkedin: 'https://linkedin.com/in/anurag-jayaswal',
      github: 'https://github.com/anuragj7879',
      codeforces: 'https://codeforces.com/profile/anuragj7879',
      leetcode: 'https://leetcode.com/anuragj7879',
      geeksforgeeks: 'https://auth.geeksforgeeks.org/user/anuragj7879',
    }
  },

  education: [
    {
      institution: 'Indian Institute of Information Technology (IIIT), Bhagalpur',
      degree: 'B.Tech Computer Science & Engineering',
      period: '2023 - 2027',
      cgpa: '7.71/10',
      status: 'Currently Pursuing',
      highlights: [
        'Specialized in AI/ML and Software Engineering',
        'Active in competitive programming and research',
        'Member of coding clubs and technical societies'
      ]
    },
    {
      institution: 'Cambridge School',
      degree: 'Intermediate (12th Grade)',
      period: '2021 - 2023',
      percentage: '85%',
      status: 'Completed',
      highlights: [
        'Strong foundation in Mathematics and Science',
        'Participated in various coding competitions',
        'Leadership roles in technical events'
      ]
    }
  ],

  experience: [
    {
      company: 'Contentkosh',
      position: 'AI Agent Developer (R&D)',
      period: 'May 2025 - Jul 2025',
      type: 'Internship',
      location: 'Remote',
      achievements: [
        'Developed Multi Agent LLM Systems with 50% accuracy improvement',
        'Integrated Ollama, Hugging Face, and Make Web APIs',
        'Implemented Docker containerization for 10+ developers',
        'Advanced NLP implementations with 60% reduction in human review',
        'Built scalable AI agent architectures'
      ],
      technologies: [
        'Python', 'LangChain', 'Ollama', 'Hugging Face', 'Docker',
        'FastAPI', 'PostgreSQL', 'Redis', 'AWS', 'Git'
      ]
    }
  ],

  projects: [
    {
      name: 'ResuRank',
      period: 'Jan 2025 - Mar 2025',
      type: 'AI/ML Project',
      description: 'AI-powered Resume Ranking System using advanced NLP techniques',
      technologies: ['Python', 'NLP', 'Transformers', 'TF-IDF', 'Scikit-learn', 'FastAPI'],
      features: [
        'Automated resume parsing and analysis',
        'Intelligent skill matching algorithms',
        'TF-IDF based content scoring',
        'Transformer models for semantic understanding',
        'RESTful API with FastAPI',
        'Real-time ranking and recommendations'
      ],
      github: 'https://github.com/anuragj7879/ResuRank',
      demo: 'https://resrank-demo.vercel.app',
      status: 'Completed'
    },
    {
      name: 'AI News Hound',
      period: 'Jul 2024 - Aug 2024',
      type: 'AI/ML Project',
      description: 'Automated news compilation system with intelligent content curation',
      technologies: ['Python', 'LangChain', 'Tavily API', 'OpenAI', 'BeautifulSoup', 'FastAPI'],
      features: [
        'Automated news scraping from multiple sources',
        'LangChain-powered content processing',
        'Tavily API integration for real-time data',
        'Intelligent content summarization',
        'Topic-based categorization',
        'Scheduled news compilation'
      ],
      github: 'https://github.com/anuragj7879/AI-News-Hound',
      demo: 'https://ai-news-hound.vercel.app',
      status: 'Completed'
    },
    {
      name: 'Smart Code Review Bot',
      period: 'Sep 2024 - Nov 2024',
      type: 'AI/ML Project',
      description: 'AI-powered code review system for automated code quality assessment',
      technologies: ['Python', 'OpenAI GPT', 'AST', 'GitHub API', 'Docker', 'FastAPI'],
      features: [
        'Automated code quality analysis',
        'Bug detection and security vulnerability scanning',
        'Performance optimization suggestions',
        'Code style and best practices enforcement',
        'GitHub integration for PR reviews',
        'Custom rule engine'
      ],
      github: 'https://github.com/anuragj7879/Smart-Code-Review',
      status: 'In Development'
    }
  ],

  skills: {
    languages: [
      { name: 'Python', level: 90, experience: '3+ years' },
      { name: 'Java', level: 80, experience: '2+ years' },
      { name: 'C++', level: 85, experience: '3+ years' },
      { name: 'SQL', level: 75, experience: '2+ years' },
      { name: 'R', level: 70, experience: '1+ years' },
      { name: 'JavaScript', level: 75, experience: '2+ years' },
      { name: 'TypeScript', level: 70, experience: '1+ years' }
    ],
    frameworks: [
      { name: 'TensorFlow', level: 85, category: 'AI/ML' },
      { name: 'PyTorch', level: 80, category: 'AI/ML' },
      { name: 'LangChain', level: 90, category: 'AI/ML' },
      { name: 'Scikit-learn', level: 85, category: 'AI/ML' },
      { name: 'XGBoost', level: 75, category: 'AI/ML' },
      { name: 'OpenCV', level: 70, category: 'AI/ML' },
      { name: 'FastAPI', level: 85, category: 'Backend' },
      { name: 'React', level: 75, category: 'Frontend' },
      { name: 'Next.js', level: 70, category: 'Frontend' }
    ],
    tools: [
      { name: 'VS Code', level: 95, category: 'IDE' },
      { name: 'Jupyter Notebook', level: 90, category: 'IDE' },
      { name: 'GitHub', level: 90, category: 'Version Control' },
      { name: 'Docker', level: 80, category: 'DevOps' },
      { name: 'AWS', level: 70, category: 'Cloud' },
      { name: 'Google Colab', level: 85, category: 'AI/ML' },
      { name: 'Hugging Face', level: 85, category: 'AI/ML' },
      { name: 'Kaggle', level: 80, category: 'AI/ML' },
      { name: 'PostgreSQL', level: 75, category: 'Database' },
      { name: 'Redis', level: 70, category: 'Database' }
    ],
    specializations: [
      'Multi-Agent LLM Systems',
      'Natural Language Processing',
      'Machine Learning Model Development',
      'Deep Learning & Neural Networks',
      'Computer Vision',
      'Competitive Programming',
      'Algorithm Design & Analysis',
      'System Design',
      'API Development',
      'Cloud Computing'
    ]
  },

  achievements: {
    leetcode: {
      problems_solved: '250+',
      rating: '1500+',
      rank: 'Expert Level',
      badges: ['50 Days Badge', '100 Days Badge', 'Contest Participant'],
      profile: 'https://leetcode.com/anuragj7879'
    },
    codeforces: {
      max_rating: 1468,
      current_rating: 1450,
      rank: 'Specialist',
      contests_participated: '25+',
      problems_solved: '300+',
      profile: 'https://codeforces.com/profile/anuragj7879'
    },
    codechef: {
      stars: '2-Star',
      max_rating: 1650,
      global_rank_best: 11,
      contest: 'Contest 164 Div 2',
      problems_solved: '150+',
      profile: 'https://codechef.com/users/anuragj7879'
    },
    general: [
      'IOQM (Indian Olympiad Qualifier in Mathematics) - Qualified',
      'Multiple hackathon participations',
      'Open source contributor',
      'Technical blog writer',
      'Peer mentor for junior developers',
      'Active in coding communities'
    ],
    certifications: [
      'Machine Learning Specialization - Coursera',
      'Deep Learning Specialization - Coursera', 
      'AWS Cloud Practitioner (In Progress)',
      'Google AI/ML Certification (In Progress)'
    ]
  },

  interests: [
    'Artificial Intelligence & Machine Learning',
    'Competitive Programming',
    'Open Source Development',
    'Research in NLP and Computer Vision',
    'System Design & Architecture',
    'Mentoring & Teaching',
    'Technical Writing',
    'Innovation & Entrepreneurship'
  ],

  availability: {
    status: 'Available',
    looking_for: [
      'Full-time Software Engineer positions',
      'AI/ML Engineer roles',
      'Research internships',
      'Open source collaborations',
      'Freelance AI/ML projects'
    ],
    preferred_locations: [
      'Remote',
      'Bangalore',
      'Hyderabad',
      'Mumbai',
      'Delhi NCR'
    ]
  }
}