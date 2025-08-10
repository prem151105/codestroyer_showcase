// Cross-browser compatibility utilities
export class BrowserCompatibility {
  private static instance: BrowserCompatibility
  private browserInfo: {
    name: string
    version: string
    engine: string
    os: string
  } | null = null

  constructor() {
    if (typeof window !== 'undefined') {
      this.detectBrowser()
      this.addPolyfills()
      this.handleBrowserSpecificIssues()
    }
  }

  public static getInstance(): BrowserCompatibility {
    if (!BrowserCompatibility.instance) {
      BrowserCompatibility.instance = new BrowserCompatibility()
    }
    return BrowserCompatibility.instance
  }

  private detectBrowser() {
    const ua = navigator.userAgent
    let name = 'Unknown'
    let version = 'Unknown'
    let engine = 'Unknown'
    let os = 'Unknown'

    // Browser detection
    if (ua.includes('Firefox/')) {
      name = 'Firefox'
      version = ua.match(/Firefox\/([0-9.]+)/)?.[1] || 'Unknown'
      engine = 'Gecko'
    } else if (ua.includes('Chrome/') && !ua.includes('Edg/')) {
      name = 'Chrome'
      version = ua.match(/Chrome\/([0-9.]+)/)?.[1] || 'Unknown'
      engine = 'Blink'
    } else if (ua.includes('Safari/') && !ua.includes('Chrome/')) {
      name = 'Safari'
      version = ua.match(/Version\/([0-9.]+)/)?.[1] || 'Unknown'
      engine = 'WebKit'
    } else if (ua.includes('Edg/')) {
      name = 'Edge'
      version = ua.match(/Edg\/([0-9.]+)/)?.[1] || 'Unknown'
      engine = 'Blink'
    }

    // OS detection
    if (ua.includes('Windows NT')) {
      os = 'Windows'
    } else if (ua.includes('Mac OS X')) {
      os = 'macOS'
    } else if (ua.includes('Linux')) {
      os = 'Linux'
    } else if (ua.includes('Android')) {
      os = 'Android'
    } else if (ua.includes('iPhone') || ua.includes('iPad')) {
      os = 'iOS'
    }

    this.browserInfo = { name, version, engine, os }
    
    // Add browser class to document
    document.documentElement.classList.add(
      `browser-${name.toLowerCase()}`,
      `engine-${engine.toLowerCase()}`,
      `os-${os.toLowerCase()}`
    )
  }

  private addPolyfills() {
    // Modern browsers support these features natively
    // ResizeObserver - supported in all modern browsers
    if (!window.ResizeObserver) {
      console.warn('ResizeObserver not supported - using fallback')
    }

    // IntersectionObserver - supported in all modern browsers
    if (!window.IntersectionObserver) {
      console.warn('IntersectionObserver not supported - using fallback')
    }

    // Smooth scroll - widely supported, fallback to instant scroll
    if (!CSS.supports('scroll-behavior', 'smooth')) {
      console.warn('Smooth scroll not supported - using instant scroll')
    }

    // CSS variables - universally supported in modern browsers
    if (!CSS.supports('color', 'var(--test)')) {
      console.warn('CSS variables not supported - using fallback values')
    }
  }

  private handleBrowserSpecificIssues() {
    if (!this.browserInfo) return

    // Safari-specific fixes
    if (this.browserInfo.name === 'Safari') {
      this.fixSafariIssues()
    }

    // Firefox-specific fixes
    if (this.browserInfo.name === 'Firefox') {
      this.fixFirefoxIssues()
    }

    // Chrome-specific fixes
    if (this.browserInfo.name === 'Chrome') {
      this.fixChromeIssues()
    }

    // Mobile-specific fixes
    if (this.browserInfo.os === 'iOS' || this.browserInfo.os === 'Android') {
      this.fixMobileIssues()
    }
  }

  private fixSafariIssues() {
    // Fix for Safari's backdrop-filter performance
    const style = document.createElement('style')
    style.textContent = `
      @supports (-webkit-backdrop-filter: blur(10px)) {
        .safari-backdrop-fix {
          -webkit-backdrop-filter: blur(10px);
          backdrop-filter: blur(10px);
        }
      }
    `
    document.head.appendChild(style)

    // Fix for Safari's 100vh issue on mobile
    const setVH = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }
    setVH()
    window.addEventListener('resize', setVH)
  }

  private fixFirefoxIssues() {
    // Firefox scrollbar styling
    const style = document.createElement('style')
    style.textContent = `
      @-moz-document url-prefix() {
        * {
          scrollbar-width: thin;
          scrollbar-color: rgba(88, 166, 255, 0.6) rgba(0, 0, 0, 0.3);
        }
      }
    `
    document.head.appendChild(style)
  }

  private fixChromeIssues() {
    // Chrome-specific optimizations
    document.documentElement.style.setProperty('--chrome-optimization', 'true')
  }

  private fixMobileIssues() {
    // Prevent zoom on input focus (iOS Safari)
    const viewport = document.querySelector('meta[name="viewport"]')
    if (viewport && this.browserInfo?.os === 'iOS') {
      viewport.setAttribute('content', 
        'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
      )
    }

    // Fix for iOS Safari bottom bar
    const setMobileVH = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--mobile-vh', `${vh}px`)
    }
    setMobileVH()
    window.addEventListener('resize', setMobileVH)
    window.addEventListener('orientationchange', () => {
      setTimeout(setMobileVH, 100)
    })

    // Touch action optimization
    document.addEventListener('touchstart', function() {}, { passive: true })
    document.addEventListener('touchmove', function() {}, { passive: true })
  }

  public getBrowserInfo() {
    return this.browserInfo
  }

  public isSupported(feature: string): boolean {
    switch (feature) {
      case 'css-grid':
        return CSS.supports('display', 'grid')
      case 'flexbox':
        return CSS.supports('display', 'flex')
      case 'backdrop-filter':
        return CSS.supports('backdrop-filter', 'blur(1px)')
      case 'css-variables':
        return CSS.supports('color', 'var(--test)')
      case 'intersection-observer':
        return 'IntersectionObserver' in window
      case 'resize-observer':
        return 'ResizeObserver' in window
      case 'web-animations':
        return 'animate' in HTMLElement.prototype
      case 'passive-events':
        let passiveSupported = false
        try {
          const options = {
            get passive() {
              passiveSupported = true
              return false
            }
          }
          window.addEventListener('test', () => {}, options)
          window.removeEventListener('test', () => {}, options)
        } catch (err) {
          passiveSupported = false
        }
        return passiveSupported
      default:
        return false
    }
  }

  public addFallbackStyles() {
    const fallbackCSS = `
      /* Fallback styles for unsupported features */
      .no-css-grid .grid {
        display: block;
      }
      
      .no-css-grid .grid > * {
        margin-bottom: 1rem;
      }
      
      .no-backdrop-filter .backdrop-blur {
        background: rgba(0, 0, 0, 0.8) !important;
      }
      
      .no-css-variables {
        --fallback-primary: #58a6ff;
        --fallback-secondary: #a5a5f5;
      }
    `

    const style = document.createElement('style')
    style.textContent = fallbackCSS
    document.head.appendChild(style)
  }

  public reportCompatibilityIssues() {
    const unsupportedFeatures = [
      'css-grid',
      'flexbox', 
      'backdrop-filter',
      'css-variables',
      'intersection-observer',
      'web-animations'
    ].filter(feature => !this.isSupported(feature))

    if (unsupportedFeatures.length > 0) {
      console.warn('Unsupported features detected:', unsupportedFeatures)
      
      // Add classes for unsupported features
      unsupportedFeatures.forEach(feature => {
        document.documentElement.classList.add(`no-${feature}`)
      })
      
      this.addFallbackStyles()
    }

    return {
      browser: this.browserInfo,
      unsupportedFeatures,
      compatibilityScore: ((6 - unsupportedFeatures.length) / 6) * 100
    }
  }
}

// Initialize browser compatibility checker
export const browserCompatibility = BrowserCompatibility.getInstance()

// Auto-report on load
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    const report = browserCompatibility.reportCompatibilityIssues()
    console.log('Browser Compatibility Report:', report)
  })
}