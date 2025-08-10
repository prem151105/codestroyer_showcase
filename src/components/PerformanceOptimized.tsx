'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'

// Lazy Image Component with optimization
export const OptimizedImage: React.FC<{
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  priority?: boolean
  placeholder?: 'blur' | 'empty'
}> = ({ 
  src, 
  alt, 
  className = '', 
  width, 
  height, 
  priority = false,
  placeholder = 'blur'
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const [imgSrc, setImgSrc] = useState(priority ? src : '')

  // Intersection Observer for lazy loading
  const imageRef = useCallback((node: HTMLImageElement | null) => {
    if (!node || priority) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          setImgSrc(src)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [src, priority])

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {placeholder === 'blur' && !isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 animate-pulse" />
      )}
      
      {(isInView || priority) && (
        <motion.img
          ref={imageRef}
          src={imgSrc}
          alt={alt}
          width={width}
          height={height}
          className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
          onLoad={() => setIsLoaded(true)}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ 
            opacity: isLoaded ? 1 : 0, 
            scale: isLoaded ? 1 : 1.1 
          }}
          transition={{ duration: 0.5 }}
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  )
}

// Debounced Input Component
export const DebouncedInput: React.FC<{
  value: string
  onChange: (value: string) => void
  delay?: number
  placeholder?: string
  className?: string
}> = ({ value, onChange, delay = 300, placeholder, className = '' }) => {
  const [localValue, setLocalValue] = useState(value)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue)
    }, delay)

    return () => clearTimeout(timer)
  }, [localValue, delay, onChange])

  return (
    <input
      type="text"
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      placeholder={placeholder}
      className={`bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-cyan-400 focus:outline-none transition-colors ${className}`}
    />
  )
}

// Virtual List for large data sets
export const VirtualList: React.FC<{
  items: any[]
  itemHeight: number
  containerHeight: number
  renderItem: (item: any, index: number) => React.ReactNode
  className?: string
}> = ({ items, itemHeight, containerHeight, renderItem, className = '' }) => {
  const [scrollTop, setScrollTop] = useState(0)

  const startIndex = Math.floor(scrollTop / itemHeight)
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  )

  const visibleItems = useMemo(() => 
    items.slice(startIndex, endIndex),
    [items, startIndex, endIndex]
  )

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop)
  }, [])

  return (
    <div
      className={`overflow-auto ${className}`}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        <div style={{ 
          transform: `translateY(${startIndex * itemHeight}px)`,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
        }}>
          {visibleItems.map((item, index) => (
            <div key={startIndex + index} style={{ height: itemHeight }}>
              {renderItem(item, startIndex + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Memoized Component Wrapper
export const MemoizedComponent = React.memo<{
  children: React.ReactNode
  deps?: any[]
}>(({ children, deps = [] }) => {
  return <>{children}</>
}, (prevProps, nextProps) => {
  // Custom comparison logic
  return JSON.stringify(prevProps.deps) === JSON.stringify(nextProps.deps)
})

// Performance Monitor Hook
export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<{
    loadTime: number
    renderTime: number
    memoryUsage?: number
  }>({
    loadTime: 0,
    renderTime: 0
  })

  useEffect(() => {
    // Measure initial load time
    const navigationStart = performance.timing.navigationStart
    const loadComplete = performance.timing.loadEventEnd
    const loadTime = loadComplete - navigationStart

    // Measure render time
    const renderStart = performance.now()
    
    requestAnimationFrame(() => {
      const renderEnd = performance.now()
      const renderTime = renderEnd - renderStart

      setMetrics(prev => ({
        ...prev,
        loadTime,
        renderTime,
        memoryUsage: (performance as any).memory?.usedJSHeapSize
      }))
    })

    // Performance observer for monitoring
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          if (entry.entryType === 'measure') {
            console.log(`Performance: ${entry.name} took ${entry.duration}ms`)
          }
        })
      })

      observer.observe({ entryTypes: ['measure', 'navigation'] })

      return () => observer.disconnect()
    }
  }, [])

  const measureFunction = useCallback((name: string, fn: () => void) => {
    performance.mark(`${name}-start`)
    fn()
    performance.mark(`${name}-end`)
    performance.measure(name, `${name}-start`, `${name}-end`)
  }, [])

  return { metrics, measureFunction }
}

// Preload Component for critical resources
export const ResourcePreloader: React.FC<{
  images?: string[]
  fonts?: string[]
  scripts?: string[]
}> = ({ images = [], fonts = [], scripts = [] }) => {
  useEffect(() => {
    // Preload images
    images.forEach(src => {
      const img = new Image()
      img.src = src
    })

    // Preload fonts
    fonts.forEach(fontUrl => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = fontUrl
      link.as = 'font'
      link.type = 'font/woff2'
      link.crossOrigin = 'anonymous'
      document.head.appendChild(link)
    })

    // Preload scripts
    scripts.forEach(scriptUrl => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = scriptUrl
      link.as = 'script'
      document.head.appendChild(link)
    })
  }, [images, fonts, scripts])

  return null
}

// Bundle Size Analyzer Component (Development only)
export const BundleAnalyzer: React.FC = () => {
  const [bundleInfo, setBundleInfo] = useState<any>(null)

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Simulate bundle analysis
      const analyzeBundle = async () => {
        try {
          // In a real implementation, this would connect to a bundle analyzer
          const mockData = {
            totalSize: '2.4MB',
            gzippedSize: '647KB',
            chunks: [
              { name: 'main', size: '1.2MB' },
              { name: 'vendor', size: '800KB' },
              { name: 'runtime', size: '400KB' }
            ]
          }
          setBundleInfo(mockData)
        } catch (error) {
          console.error('Bundle analysis failed:', error)
        }
      }

      analyzeBundle()
    }
  }, [])

  if (process.env.NODE_ENV !== 'development' || !bundleInfo) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 bg-gray-900 border border-gray-700 rounded-lg p-4 text-xs z-50">
      <h4 className="text-cyan-400 font-bold mb-2">Bundle Info</h4>
      <div className="text-gray-300">
        <div>Total: {bundleInfo.totalSize}</div>
        <div>Gzipped: {bundleInfo.gzippedSize}</div>
        {bundleInfo.chunks.map((chunk: any, i: number) => (
          <div key={i}>{chunk.name}: {chunk.size}</div>
        ))}
      </div>
    </div>
  )
}

// Error Boundary with retry functionality
interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: any
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ComponentType<any> },
  ErrorBoundaryState
> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo)
    this.setState({ error, errorInfo })
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      return (
        <FallbackComponent
          error={this.state.error}
          retry={() => this.setState({ hasError: false, error: undefined })}
        />
      )
    }

    return this.props.children
  }
}

const DefaultErrorFallback: React.FC<{
  error?: Error
  retry: () => void
}> = ({ error, retry }) => (
  <div className="p-8 text-center">
    <h2 className="text-xl font-bold text-red-400 mb-4">Something went wrong</h2>
    <p className="text-gray-400 mb-4">{error?.message || 'An unexpected error occurred'}</p>
    <button
      onClick={retry}
      className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors"
    >
      Try Again
    </button>
  </div>
)