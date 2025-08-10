'use client'

import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { InteractiveButton } from './EnhancedVisualEffects'
import { AccessibleField } from './AccessibilityEnhanced'

interface ContactFormProps {
  onClose?: () => void
}

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export const ContactForm: React.FC<ContactFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // Validation function
  const validateForm = useCallback((): FormErrors => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long'
    }

    return newErrors
  }, [formData])

  // Handle input changes
  const handleInputChange = useCallback((field: keyof FormData) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }))
    }
  }, [errors])

  // Handle form submission
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    
    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)
    setErrors({})

    try {
      // Simulate API call - replace with actual contact form submission
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // For demonstration, we'll create a mailto link
      const mailtoLink = `mailto:anurag1.230101034@iiitbh.ac.in?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`
      
      window.open(mailtoLink)
      
      setSubmitStatus('success')
      setTimeout(() => {
        if (onClose) onClose()
      }, 2000)
      
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }, [formData, validateForm, onClose])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="w-full max-w-2xl mx-auto"
    >
      <AnimatePresence mode="wait">
        {submitStatus === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center p-8"
          >
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-2xl font-bold text-green-400 mb-2">Message Sent!</h3>
            <p className="text-gray-300">
              Thank you for reaching out. I'll get back to you soon!
            </p>
          </motion.div>
        ) : submitStatus === 'error' ? (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center p-8"
          >
            <div className="text-6xl mb-4">❌</div>
            <h3 className="text-2xl font-bold text-red-400 mb-2">Error Occurred</h3>
            <p className="text-gray-300 mb-4">
              Sorry, there was an issue sending your message. Please try again or contact me directly.
            </p>
            <InteractiveButton
              variant="primary"
              onClick={() => setSubmitStatus('idle')}
            >
              Try Again
            </InteractiveButton>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-cyan-400 mb-2">Let's Connect!</h3>
              <p className="text-gray-300">
                Available for SDE roles and exciting opportunities
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AccessibleField
                id="contact-name"
                label="Your Name"
                value={formData.name}
                onChange={handleInputChange('name')}
                error={errors.name}
                required
                placeholder="Enter your name"
              />

              <AccessibleField
                id="contact-email"
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleInputChange('email')}
                error={errors.email}
                required
                placeholder="your.email@example.com"
              />
            </div>

            <AccessibleField
              id="contact-subject"
              label="Subject"
              value={formData.subject}
              onChange={handleInputChange('subject')}
              error={errors.subject}
              required
              placeholder="What's this about?"
            />

            <div className="space-y-2">
              <label 
                htmlFor="contact-message"
                className="block text-sm font-medium text-gray-300"
              >
                Message <span className="text-red-400 ml-1" aria-label="required">*</span>
              </label>
              <textarea
                id="contact-message"
                value={formData.message}
                onChange={(e) => handleInputChange('message')(e.target.value)}
                placeholder="Tell me about your project or opportunity..."
                required
                rows={6}
                aria-invalid={errors.message ? 'true' : 'false'}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
                className={`w-full px-3 py-2 bg-gray-900 border rounded-lg text-white resize-none focus:outline-none focus:ring-2 transition-colors ${
                  errors.message 
                    ? 'border-red-500 focus:ring-red-400' 
                    : 'border-gray-700 focus:ring-cyan-400 focus:border-cyan-400'
                }`}
              />
              {errors.message && (
                <p id="contact-message-error" className="text-sm text-red-400" role="alert">
                  {errors.message}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <InteractiveButton
                variant="primary"
                className="flex-1"
                onClick={handleSubmit}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.div
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Sending...
                  </span>
                ) : (
                  '📧 Send Message'
                )}
              </InteractiveButton>

              <InteractiveButton
                variant="secondary"
                onClick={() => window.open('https://linkedin.com/in/anurag-jayaswal', '_blank')}
              >
                💼 Connect on LinkedIn
              </InteractiveButton>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-400 mb-4">
                Prefer direct contact?
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <a
                  href="mailto:anurag1.230101034@iiitbh.ac.in"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  📧 anurag1.230101034@iiitbh.ac.in
                </a>
                <a
                  href="tel:+917879219119"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  📞 +91-7879219119
                </a>
                <span className="text-gray-500">
                  📍 Gwalior, MP, India
                </span>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default ContactForm