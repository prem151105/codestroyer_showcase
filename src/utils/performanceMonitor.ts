// Performance monitoring utilities
export class PerformanceMonitor {
  private metrics: Map<string, number> = new Map()
  private observers: PerformanceObserver[] = []

  constructor() {
    this.initializeObservers()
  }

  private initializeObservers() {
    if (typeof window === 'undefined') return

    // Largest Contentful Paint observer
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          this.metrics.set('LCP', lastEntry.startTime)
        })
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
        this.observers.push(lcpObserver)

        // First Input Delay observer
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach(entry => {
            this.metrics.set('FID', entry.processingStart - entry.startTime)
          })
        })
        fidObserver.observe({ entryTypes: ['first-input'] })
        this.observers.push(fidObserver)

        // Cumulative Layout Shift observer
        let clsValue = 0
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value
              this.metrics.set('CLS', clsValue)
            }
          }
        })
        clsObserver.observe({ entryTypes: ['layout-shift'] })
        this.observers.push(clsObserver)

      } catch (error) {
        console.warn('Performance Observer not fully supported:', error)
      }
    }
  }

  // Measure custom metrics
  public measureFunction<T>(name: string, fn: () => T): T {
    const start = performance.now()
    try {
      const result = fn()
      const end = performance.now()
      this.metrics.set(name, end - start)
      return result
    } catch (error) {
      const end = performance.now()
      this.metrics.set(`${name}_error`, end - start)
      throw error
    }
  }

  public async measureAsyncFunction<T>(name: string, fn: () => Promise<T>): Promise<T> {
    const start = performance.now()
    try {
      const result = await fn()
      const end = performance.now()
      this.metrics.set(name, end - start)
      return result
    } catch (error) {
      const end = performance.now()
      this.metrics.set(`${name}_error`, end - start)
      throw error
    }
  }

  // Get Core Web Vitals
  public getCoreWebVitals() {
    return {
      LCP: this.metrics.get('LCP'),
      FID: this.metrics.get('FID'),
      CLS: this.metrics.get('CLS')
    }
  }

  // Get all metrics
  public getAllMetrics() {
    return Object.fromEntries(this.metrics.entries())
  }

  // Get navigation metrics
  public getNavigationMetrics() {
    if (typeof window === 'undefined') return null

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    if (!navigation) return null

    return {
      DNS: navigation.domainLookupEnd - navigation.domainLookupStart,
      Connection: navigation.connectEnd - navigation.connectStart,
      TLS: navigation.connectEnd - navigation.secureConnectionStart,
      TTFB: navigation.responseStart - navigation.requestStart,
      Download: navigation.responseEnd - navigation.responseStart,
      DOMLoad: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      WindowLoad: navigation.loadEventEnd - navigation.loadEventStart
    }
  }

  // Memory usage (if available)
  public getMemoryUsage() {
    if (typeof window === 'undefined') return null

    const memory = (performance as any).memory
    if (!memory) return null

    return {
      used: memory.usedJSHeapSize,
      total: memory.totalJSHeapSize,
      limit: memory.jsHeapSizeLimit
    }
  }

  // Resource timing
  public getResourceMetrics() {
    if (typeof window === 'undefined') return []

    const resources = performance.getEntriesByType('resource')
    return resources.map(resource => ({
      name: resource.name,
      duration: resource.duration,
      size: (resource as any).transferSize || 0,
      type: this.getResourceType(resource.name)
    }))
  }

  private getResourceType(url: string): string {
    if (url.includes('.js')) return 'JavaScript'
    if (url.includes('.css')) return 'CSS'
    if (url.match(/\.(png|jpg|jpeg|gif|webp|svg)$/)) return 'Image'
    if (url.match(/\.(woff|woff2|ttf|otf)$/)) return 'Font'
    return 'Other'
  }

  // Clean up observers
  public cleanup() {
    this.observers.forEach(observer => observer.disconnect())
    this.observers = []
  }

  // Report metrics (for analytics)
  public reportToAnalytics() {
    const metrics = this.getAllMetrics()
    const coreWebVitals = this.getCoreWebVitals()
    const navigation = this.getNavigationMetrics()
    const memory = this.getMemoryUsage()

    // Send to analytics service (replace with your preferred service)
    console.log('Performance Report:', {
      metrics,
      coreWebVitals,
      navigation,
      memory,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    })

    // Example: Send to Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('event', 'page_performance', {
        custom_parameter_lcp: coreWebVitals.LCP,
        custom_parameter_fid: coreWebVitals.FID,
        custom_parameter_cls: coreWebVitals.CLS,
      })
    }
  }
}

// Singleton instance
export const performanceMonitor = new PerformanceMonitor()

// Auto-report after page load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    setTimeout(() => {
      performanceMonitor.reportToAnalytics()
    }, 5000) // Wait 5 seconds for everything to settle
  })
}