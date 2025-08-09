export const commands = {
  // Basic Navigation
  help: 'Show all available commands',
  about: 'Display personal information and bio',
  education: 'Show educational background',
  experience: 'Display work experience',
  projects: 'List all projects with descriptions',
  skills: 'Show technical skills and proficiency',
  achievements: 'Display coding achievements and ratings',
  contact: 'Show contact information',
  resume: 'Download/view resume PDF',
  clear: 'Clear terminal screen',
  whoami: 'Display current user info',
  ls: 'List available sections',
  cd: 'Navigate to specific section',
  pwd: 'Show current location',
  history: 'Show command history',

  // Advanced Interactive Commands
  code: 'Open project code in a simulated editor',
  demo: 'Show live demo or screenshots',
  github: 'Open GitHub repository',
  linkedin: 'Open LinkedIn profile',
  leetcode: 'Show LeetCode statistics',
  codeforces: 'Show Codeforces profile',
  matrix: 'Easter egg - Matrix rain animation',
  snake: 'Play snake game',
  weather: 'Show current weather',
  quote: 'Display inspirational coding quote',
  joke: 'Tell a programming joke',
  theme: 'Change terminal theme',
  sudo: 'Fun sudo responses',
  cowsay: 'ASCII cow saying text',
  figlet: 'ASCII art text',
  tree: 'Show portfolio structure',
  ping: 'Simulate ping command',
  ssh: 'Simulate SSH connections',
  vim: 'Open vim editor simulation',
  nano: 'Open nano editor simulation',
  top: 'Show system processes (fake)',
  ps: 'Show running processes',
  uptime: 'Show system uptime',

  // AI/ML Specific Commands
  'ai-projects': 'Show AI/ML projects specifically',
  'ml-skills': 'Display machine learning skills',
  'neural-net': 'Show neural network visualization',
  'data-science': 'Display data science projects',
  'nlp-work': 'Show NLP-related work',
  transformers: 'Display transformer model work',
  'ollama-setup': 'Show Ollama integration work',
  huggingface: 'Display Hugging Face projects',

  // Coding Platform Commands
  'coding-stats': 'Show overall coding statistics',
  'leetcode-heatmap': 'Display LeetCode submission heatmap',
  'contest-history': 'Show contest participation',
  'problem-solving': 'Display problem-solving approach',
  algorithms: 'Show favorite algorithms',
  'data-structures': 'Display data structures knowledge',
  competitive: 'Show competitive programming stats',

  // Fun Commands
  typing: 'Start typing test game',
  date: 'Show current date and time',
  cal: 'Display calendar',
  fortune: 'Display a random fortune',
  lolcat: 'Colorize output (simulation)',
  neofetch: 'Display system information in style'
}

export const commandCategories = {
  basic: [
    'help', 'about', 'education', 'experience', 'projects', 
    'skills', 'achievements', 'contact', 'resume', 'clear'
  ],
  navigation: [
    'ls', 'cd', 'pwd', 'tree', 'whoami', 'history'
  ],
  ai_ml: [
    'ai-projects', 'ml-skills', 'neural-net', 'data-science',
    'nlp-work', 'transformers', 'ollama-setup', 'huggingface'
  ],
  coding: [
    'leetcode', 'codeforces', 'coding-stats', 'leetcode-heatmap',
    'contest-history', 'problem-solving', 'algorithms', 'data-structures'
  ],
  interactive: [
    'github', 'linkedin', 'demo', 'code', 'snake', 'typing'
  ],
  system: [
    'ping', 'ssh', 'top', 'ps', 'uptime', 'vim', 'nano'
  ],
  fun: [
    'matrix', 'weather', 'quote', 'joke', 'cowsay', 'figlet',
    'sudo', 'theme', 'fortune', 'neofetch'
  ]
}

export const aliases = {
  ll: 'ls',
  la: 'ls',
  cls: 'clear',
  exit: 'clear',
  quit: 'clear',
  '?': 'help',
  info: 'about',
  proj: 'projects',
  exp: 'experience',
  edu: 'education',
  contact: 'contact',
  lc: 'leetcode',
  cf: 'codeforces',
  gh: 'github',
  ai: 'ai-projects',
  ml: 'ml-skills'
}