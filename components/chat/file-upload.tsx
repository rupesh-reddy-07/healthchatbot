"use client"

import type React from "react"

import { useRef } from "react"

interface FileUploadProps {
  onFileUpload: (file: File) => void
  children: React.ReactNode
}

export function FileUpload({ onFileUpload, children }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert("File size must be less than 10MB")
        return
      }

      // Check file type
      const allowedTypes = ["image/jpeg", "image/png", "image/gif", "application/pdf", "text/plain"]
      if (!allowedTypes.includes(file.type)) {
        alert("Please upload an image, PDF, or text file")
        return
      }

      onFileUpload(file)
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <>
      <input ref={fileInputRef} type="file" accept="image/*,.pdf,.txt" onChange={handleFileSelect} className="hidden" />
      <div onClick={handleClick} className="cursor-pointer">
        {children}
      </div>
    </>
  )
}
