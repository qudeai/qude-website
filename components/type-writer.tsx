'use client'

import { useEffect, useState } from 'react'

interface TypeWriterProps {
  text: string
  delay?: number
}

export function TypeWriter({ text, delay = 150 }: TypeWriterProps) {
  const [currentText, setCurrentText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentText(prevText => {
        if (currentIndex === text.length) {
          setCurrentIndex(0)
          return ''
        }
        return prevText + text[currentIndex]
      })
      setCurrentIndex(prevIndex => (prevIndex + 1) % (text.length + 1))
    }, delay)

    return () => clearTimeout(timeout)
  }, [currentIndex, delay, text])

  return (
    <span>
      {currentText}
      <span className="animate-pulse">_</span>
    </span>
  )
}

