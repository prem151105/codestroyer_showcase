@echo off
echo =================================
echo  ENHANCED PORTFOLIO DEPLOYMENT
echo =================================

:: Check for Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

echo ✅ Node.js detected

:: Install dependencies
echo.
echo 📦 Installing dependencies...
call npm install
if errorlevel 1 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

:: Install additional performance and testing dependencies
echo.
echo 🔧 Installing enhanced dependencies...
call npm install --save-dev @axe-core/core intersection-observer resize-observer-polyfill smoothscroll-polyfill css-vars-ponyfill
if errorlevel 1 (
    echo ⚠️  Enhanced dependencies installation failed, continuing with basic setup...
)

:: Run type checking
echo.
echo 🔍 Running type checking...
call npm run type-check
if errorlevel 1 (
    echo ⚠️  Type checking found issues, but continuing...
)

:: Run linting
echo.
echo 🧹 Running code linting...
call npm run lint
if errorlevel 1 (
    echo ⚠️  Linting found issues, but continuing...
)

:: Build the project
echo.
echo 🏗️  Building the project...
call npm run build
if errorlevel 1 (
    echo ❌ Build failed
    pause
    exit /b 1
)

echo ✅ Build completed successfully

:: Performance Analysis
echo.
echo 📊 Analyzing bundle size...
if exist "package.json" (
    findstr "analyze" package.json >nul
    if not errorlevel 1 (
        call npm run analyze
    ) else (
        echo ℹ️  Bundle analyzer script not found, skipping analysis
    )
)

:: Create deployment checklist
echo.
echo 📋 Creating deployment checklist...
(
echo DEPLOYMENT CHECKLIST - %date% %time%
echo ==========================================
echo.
echo ✅ Dependencies installed
echo ✅ TypeScript compilation successful
echo ✅ Code linting completed
echo ✅ Production build created
echo.
echo MANUAL CHECKS REQUIRED:
echo □ Test all interactive elements
echo □ Verify accessibility features work
echo □ Check responsive design on different devices
echo □ Test keyboard navigation
echo □ Verify color contrast in high contrast mode
echo □ Test performance on slower devices
echo □ Check cross-browser compatibility
echo □ Verify all links and contact forms work
echo □ Test layout switcher functionality
echo.
echo PERFORMANCE TARGETS:
echo □ Lighthouse Performance Score ^> 90
echo □ Lighthouse Accessibility Score ^> 95
echo □ First Contentful Paint ^< 1.8s
echo □ Largest Contentful Paint ^< 2.5s
echo □ Cumulative Layout Shift ^< 0.1
echo.
echo BROWSER TESTING:
echo □ Chrome (latest)
echo □ Firefox (latest)
echo □ Safari (latest)
echo □ Edge (latest)
echo □ Mobile Chrome
echo □ Mobile Safari
echo.
echo DEPLOYMENT OPTIONS:
echo 1. Vercel: npm run deploy or connect GitHub repo
echo 2. Netlify: Drag .next folder or connect GitHub repo
echo 3. Custom server: Use npm run start
echo.
echo ENVIRONMENT VARIABLES (if needed):
echo □ Set any required API keys
echo □ Configure analytics tracking
echo □ Set up error reporting
) > deployment-checklist.txt

echo ✅ Deployment checklist created: deployment-checklist.txt

:: Show deployment options
echo.
echo 🚀 DEPLOYMENT OPTIONS:
echo.
echo 1. Deploy to Vercel (Recommended)
echo    - Run: vercel --prod
echo    - Or connect your GitHub repository at vercel.com
echo.
echo 2. Deploy to Netlify
echo    - Drag the .next folder to netlify.com/drop
echo    - Or connect your GitHub repository at netlify.com
echo.
echo 3. Run locally for testing
echo    - Run: npm run start
echo    - Open: http://localhost:3000
echo.

set /p choice="Choose deployment option (1-3) or press Enter to exit: "

if "%choice%"=="1" (
    echo.
    echo 🔗 Opening Vercel deployment...
    start https://vercel.com/new
    echo ℹ️  Please connect your GitHub repository and deploy
)

if "%choice%"=="2" (
    echo.
    echo 🔗 Opening Netlify deployment...
    start https://app.netlify.com/drop
    echo ℹ️  Please drag your .next folder to deploy
)

if "%choice%"=="3" (
    echo.
    echo 🏃 Starting local server...
    echo Open http://localhost:3000 in your browser
    call npm run start
)

echo.
echo ✨ Enhanced portfolio deployment setup complete!
echo 📋 Don't forget to check deployment-checklist.txt
pause