'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TypeWriter } from './type-writer'
import { CodeRunner } from './code-runner'
import Link from 'next/link'
import { useState } from 'react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.48, 0.15, 0.25, 0.96] }
}

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export function Hero() {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText("npm i @qudeaiframework/v.1beta").then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <motion.div
      variants={staggerChildren}
      initial="initial"
      animate="animate"
      className="flex flex-col items-center text-center px-4 pt-20 pb-32"
    >
      <motion.div variants={fadeInUp}>
        <Link 
          href="https://github.com/qudeai/qudeframework-api"
          className="inline-flex items-center gap-2 rounded-full px-4 py-1 mb-12 backdrop-blur-sm"
          style={{
            backgroundColor: 'rgb(255, 229, 210)',
          }}
        >
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: 'rgba(255,85,1,255)',
              color: 'rgba(255, 255, 255, 1)',
            }}
          >
            New
          </span>
          <span
            className="text-sm"
            style={{
              color: 'rgb(0, 0, 0)',
            }}
          >
            qudeapi_v.0.3beta API is out now!
          </span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
      <motion.h1
        variants={fadeInUp}
        className="text-4xl md:text-6xl font-bold max-w-4xl mb-6"
        style={{
          color: 'rgb(0, 0, 0)',
        }}
      >
        Your AI-powered CLI Copilot on{' '}
        <span style={{ color: 'rgba(255,85,1,255)' }}> Solana.</span>
      </motion.h1>
      <motion.p
        variants={fadeInUp}
        className="text-lg mb-12 max-w-2xl"
        style={{
          color: 'rgb(74, 74, 74)',
        }}
      >
        The Qude Framework open-source code allows users to create AI agents
        directly in their CLI, with Qude acting as a co-pilot to help build
        them. The Qude API enables interaction with the AI agents created using
        the Qude Framework's open-source code.
      </motion.p>
      <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center gap-4 mb-12">
        <Link href='https://github.com/qudeai/qudeai-framework-v.1'>
          <Button
            size="lg"
            className="hover:bg-opacity-10"
            style={{
              backgroundColor: 'rgba(255,85,1,255)',
            }}
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        <div className="relative">
          <code
            className="px-4 py-2 pr-10 rounded-lg text-sm font-mono inline-block"
            style={{
              backgroundColor: 'rgb(244, 244, 244)',
              color: 'rgb(0, 0, 0)',
            }}
          >
            $ <TypeWriter text="npm i @qudeaiframework/v.1beta" />
          </code>
          <button
            onClick={copyToClipboard}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Copy to clipboard"
          >
            {isCopied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
      </motion.div>
      <motion.div variants={fadeInUp}>
        <CodeRunner />
      </motion.div>
    </motion.div>
  );
}

