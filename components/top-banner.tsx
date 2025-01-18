'use client'

import { X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function TopBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div
      className="w-full px-4 py-2 flex items-center justify-center relative"
      style={{
        backgroundColor: '#ff5501', // Rose pink background
      }}
    >
      <div
        className="text-sm font-medium"
        style={{
          color: 'white',
        }}
      >
        Develop ultra-fast with QudeAI Framework
      </div>
      <Button
        variant="secondary"
        size="sm"
        className="ml-2"
        style={{
          backgroundColor: 'white',
          color: '#0d0c0c',
        }}
        onClick={() => window.location.href = 'https://docs.qude.ai/getting-started/installation'}
      >
        Start Now
      </Button>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-2 p-1 hover:opacity-80"
      >
        <X
          className="h-4 w-4"
          style={{
            color: 'white',
          }}
        />
        <span className="sr-only">Close banner</span>
      </button>
    </div>
  )
}

