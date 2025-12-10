'use client'

import { useState, useRef, useEffect, FormEvent, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReCAPTCHA from 'react-google-recaptcha'

interface ApplicationModalProps {
  isOpen: boolean
  onClose: () => void
  positionTitle: string
}

function CloseIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function TextInput({
  label,
  required,
  error,
  ...props
}: React.ComponentPropsWithoutRef<'input'> & { 
  label: string
  required?: boolean
  error?: string
}) {
  const id = useId()

  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <input
        type="text"
        id={id}
        {...props}
        placeholder=" "
        className={`peer block w-full border bg-transparent px-6 pt-12 pb-4 text-base/6 text-neutral-950 ring-4 ring-transparent transition group-first:rounded-t-2xl group-last:rounded-b-2xl focus:border-neutral-950 focus:ring-neutral-950/5 focus:outline-hidden ${
          error ? 'border-red-500' : 'border-neutral-300'
        }`}
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute top-1/2 left-6 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-not-placeholder-shown:-translate-y-4 peer-not-placeholder-shown:scale-75 peer-not-placeholder-shown:font-semibold peer-not-placeholder-shown:text-neutral-950 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950"
      >
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {error && (
        <p className="absolute -bottom-5 left-6 text-xs text-red-500">{error}</p>
      )}
    </div>
  )
}

function FileInput({
  label,
  required,
  error,
  file,
  onFileChange,
}: {
  label: string
  required?: boolean
  error?: string
  file: File | null
  onFileChange: (file: File | null) => void
}) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      // Check file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        return
      }
      // Check file type
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ]
      if (!allowedTypes.includes(selectedFile.type)) {
        return
      }
      onFileChange(selectedFile)
    }
  }

  return (
    <div className={`border px-6 py-6 ${error ? 'border-red-500' : 'border-neutral-300'}`}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx"
        className="hidden"
      />
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-neutral-950">
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
          </p>
          {file ? (
            <p className="mt-1 text-sm text-neutral-600">{file.name}</p>
          ) : (
            <p className="mt-1 text-sm text-neutral-500">PDF, DOC, or DOCX (max 5MB)</p>
          )}
        </div>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="rounded-full bg-neutral-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800"
        >
          {file ? 'Change' : 'Upload'}
        </button>
      </div>
      {error && (
        <p className="mt-2 text-xs text-red-500">{error}</p>
      )}
    </div>
  )
}

export function ApplicationModal({
  isOpen,
  onClose,
  positionTitle,
}: ApplicationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    link: '',
  })
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error'
    message: string
  } | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({ name: '', email: '', phone: '', link: '' })
      setResumeFile(null)
      setRecaptchaToken(null)
      setSubmitStatus(null)
      setErrors({})
      if (recaptchaRef.current) {
        recaptchaRef.current.reset()
      }
    }
  }, [isOpen])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token)
    if (errors.recaptcha) {
      setErrors((prev) => ({ ...prev, recaptcha: '' }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Required'
    }

    if (!resumeFile) {
      newErrors.resume = 'Required'
    }

    if (!formData.link.trim()) {
      newErrors.link = 'Required'
    }

    if (!recaptchaToken) {
      newErrors.recaptcha = 'Please verify you are not a robot'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('phone', formData.phone)
      formDataToSend.append('link', formData.link)
      formDataToSend.append('position', positionTitle)
      formDataToSend.append('recaptchaToken', recaptchaToken!)
      if (resumeFile) {
        formDataToSend.append('resume', resumeFile)
      }

      const response = await fetch('/api/career/apply', {
        method: 'POST',
        body: formDataToSend,
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Application submitted successfully! We will get back to you soon.',
        })
        setFormData({ name: '', email: '', phone: '', link: '' })
        setResumeFile(null)
        setRecaptchaToken(null)
        if (recaptchaRef.current) {
          recaptchaRef.current.reset()
        }
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Something went wrong. Please try again.',
        })
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-neutral-950/50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-4xl bg-white p-8 shadow-2xl sm:p-12">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute right-6 top-6 text-neutral-400 transition hover:text-neutral-950"
                aria-label="Close"
              >
                <CloseIcon className="h-6 w-6" />
              </button>

              {/* Header */}
              <h2 className="font-display text-2xl font-semibold text-neutral-950">
                Apply for this position
              </h2>
              <p className="mt-2 text-base text-neutral-600">
                {positionTitle}
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="mt-10">
                <div className="isolate -space-y-px rounded-2xl bg-white/50">
                  <TextInput
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    autoComplete="name"
                    required
                    error={errors.name}
                  />
                  <TextInput
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    autoComplete="email"
                    required
                    error={errors.email}
                  />
                  <TextInput
                    label="Phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    autoComplete="tel"
                    required
                    error={errors.phone}
                  />
                  <TextInput
                    label="Portfolio / LinkedIn URL"
                    type="url"
                    name="link"
                    value={formData.link}
                    onChange={handleInputChange}
                    required
                    error={errors.link}
                  />
                  <FileInput
                    label="Resume"
                    required
                    file={resumeFile}
                    onFileChange={(file) => {
                      setResumeFile(file)
                      if (errors.resume) {
                        setErrors((prev) => ({ ...prev, resume: '' }))
                      }
                    }}
                    error={errors.resume}
                  />
                </div>

                {/* reCAPTCHA */}
                <div className="mt-8 flex flex-col items-center">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'}
                    onChange={handleRecaptchaChange}
                  />
                  {errors.recaptcha && (
                    <p className="mt-2 text-sm text-red-500">{errors.recaptcha}</p>
                  )}
                </div>

                {/* Submit Status */}
                {submitStatus && (
                  <div
                    className={`mt-6 rounded-2xl p-4 text-sm ${
                      submitStatus.type === 'success'
                        ? 'bg-green-50 text-green-800'
                        : 'bg-red-50 text-red-800'
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-8 inline-flex w-full justify-center rounded-full bg-neutral-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit application'}
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
