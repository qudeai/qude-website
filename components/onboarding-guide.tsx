'use client'

import { useState } from 'react'
import { X, ArrowLeft, ArrowRight, Book, Github } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface Step {
  title: string
  videoId: string
}

const steps: Step[] = [
  {
    title: 'Setting up framework locally',
    videoId: 'FRqlKELHuRU',
  },
  {
    title: 'Deploying the ai agent onchain',
    videoId: 'WkGdQeaMKXc',
  },
  {
    title: 'Interacting with deployed ai agent',
    videoId: 'JSQBQFHQbu4',
  },
]

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 20 : -20,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 20 : -20,
    opacity: 0
  })
}

const fadeInOut = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.5, ease: "easeInOut" }
}

const contentVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 }
}

export function OnboardingGuide() {
  const [open, setOpen] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [showCongrats, setShowCongrats] = useState(false)
  const [[page, direction], setPage] = useState([0, 0])
  const shouldReduceMotion = useReducedMotion()

  const handleClose = () => {
    setOpen(false)
  }

  const paginate = (newDirection: number) => {
    if (currentStep + newDirection >= 0 && currentStep + newDirection < steps.length) {
      setPage([page + newDirection, newDirection])
      setCurrentStep(currentStep + newDirection)
    }
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCompletedSteps([...completedSteps, currentStep])
      paginate(1)
    } else {
      setShowCongrats(true)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      paginate(-1)
    }
  }

  const handleSkip = () => {
    handleNext()
  }

  const isStepCompleted = (index: number) => completedSteps.includes(index)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[800px] p-0 gap-0 border border-gray-200 rounded-xl overflow-hidden fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-h-[85vh] max-w-[90vw] bg-white">
        <DialogDescription className="sr-only">
          Guide for deploying AI agent using QudeAI Framework
        </DialogDescription>
        <motion.button
          onClick={handleClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md p-2 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#ff5501] focus:ring-offset-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="h-4 w-4 text-[#ff5501]" />
          <span className="sr-only">Close</span>
        </motion.button>
        {!showCongrats && (
          <motion.div 
            className="relative border-b"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-6">
              <h2 className="text-center text-base sm:text-lg font-medium pr-10">
                Steps to deploy your AI agent locally using the QudeAI Framework
              </h2>
            </div>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={showCongrats ? "congrats" : "content"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {showCongrats ? (
              <motion.div
                key="congrats"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 25, duration: 0.5 }}
                className="p-6 flex flex-col items-center justify-center text-center relative"
              >
                <motion.h2
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
                  className="text-3xl font-bold mb-4 text-[#ff5501]"
                >
                  Congratulations!
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="text-lg mb-6"
                >
                  Congrats on making your first AI agent with QudeAI framework!
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="flex gap-4"
                >
                  <Button
                    onClick={() => window.open('https://docs.qude.ai', '_blank')}
                    style={{
                      backgroundColor: '#ff5501',
                    }}
                  >
                    <Book className="mr-2 h-4 w-4" />
                    Explore Docs
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.open('https://github.com/qudeai', '_blank')}
                  >
                    <Github className="mr-2 h-4 w-4" />
                    Visit GitHub
                  </Button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                {...fadeInOut}
                className="flex flex-col"
              >
                {/* Desktop Layout */}
                <div className="hidden md:flex gap-8 p-6">
                  <div className="flex flex-col items-start">
                    <div className="relative flex flex-col items-start">
                      {steps.map((step, index) => (
                        <motion.div 
                          key={index} 
                          className="flex flex-col items-start"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <div className="flex items-center gap-3">
                            <motion.div
                              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 shrink-0 ${
                                index === currentStep
                                  ? 'bg-black text-white'
                                  : isStepCompleted(index)
                                  ? 'bg-[#ff5501] text-white'
                                  : 'bg-gray-200 text-gray-600'
                              }`}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              animate={{
                                scale: index === currentStep ? 1.1 : 1,
                                transition: { type: "spring", stiffness: 400, damping: 17 }
                              }}
                            >
                              {index + 1}
                            </motion.div>
                            <motion.span 
                              className={`text-sm font-medium ${
                                index === currentStep ? 'text-black' :
                                isStepCompleted(index) ? 'text-[#ff5501]' :
                                'text-gray-600'
                              }`}
                              animate={{ opacity: 1, y: 0 }}
                              initial={{ opacity: 0, y: -5 }}
                              transition={{ duration: 0.3, delay: 0.1 * index }}
                            >
                              {step.title}
                            </motion.span>
                          </div>
                          {index < steps.length - 1 && (
                            <motion.div
                              className="ml-4 my-2"
                              initial={{ height: 0 }}
                              animate={{ height: 40 }}
                              transition={{ duration: 0.5 }}
                            >
                              <svg width="2" height="40" className="overflow-visible">
                                <motion.path
                                  d="M 1 0 L 1 40"
                                  fill="none"
                                  strokeWidth="2"
                                  stroke={isStepCompleted(index) ? "#ff5501" : "#e5e7eb"}
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{ duration: 0.5, delay: 0.2 }}
                                />
                              </svg>
                            </motion.div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={currentStep}
                      className="flex-1 space-y-4"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={contentVariants}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
                    >
                      <motion.div 
                        className="aspect-video w-full max-w-[500px] mx-auto bg-gray-100 rounded-lg overflow-hidden"
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      >
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/${steps[currentStep].videoId}`}
                          title={steps[currentStep].title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        />
                      </motion.div>
                      <motion.div 
                        className="flex justify-between items-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <div className="space-x-4 flex items-center">
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              variant="outline"
                              onClick={handlePrevious}
                              disabled={currentStep === 0}
                              className="h-10 px-4"
                            >
                              <ArrowLeft className="mr-2 h-4 w-4" />
                              Previous
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              variant="outline"
                              onClick={handleSkip}
                              className="h-10 px-4"
                            >
                              Skip
                            </Button>
                          </motion.div>
                        </div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            onClick={handleNext}
                            className="h-10 px-4"
                            style={{
                              backgroundColor: '#ff5501',
                            }}
                          >
                            {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden flex flex-col p-6">
                  <div className="w-full flex justify-center mb-8">
                    <div className="flex items-center justify-center gap-4">
                      {steps.map((_, index) => (
                        <div key={index} className="flex items-center">
                          <motion.div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              index === currentStep
                                ? 'bg-black text-white'
                                : isStepCompleted(index)
                                ? 'bg-[#ff5501] text-white'
                                : 'bg-gray-200 text-gray-600'
                            }`}
                            animate={{
                              scale: index === currentStep ? 1.1 : 1,
                              transition: { type: "spring", stiffness: 400, damping: 17 }
                            }}
                          >
                            {index + 1}
                          </motion.div>
                          {index < steps.length - 1 && (
                            <motion.div
                              className="h-[2px] w-8"
                              style={{
                                backgroundColor: isStepCompleted(index) ? '#ff5501' : '#e5e7eb',
                              }}
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ duration: 0.5, delay: 0.2 }}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                      key={page}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                      }}
                      className="flex flex-col items-center"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-center mb-6 font-medium"
                      >
                        {steps[currentStep].title}
                      </motion.div>

                      <motion.div 
                        className="aspect-video w-full bg-gray-100 rounded-lg overflow-hidden mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      >
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/${steps[currentStep].videoId}`}
                          title={steps[currentStep].title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        />
                      </motion.div>

                      <div className="flex justify-between gap-3 w-full">
                        <Button
                          variant="outline"
                          onClick={handlePrevious}
                          disabled={currentStep === 0}
                          className="flex-1 h-10"
                        >
                          <ArrowLeft className="h-4 w-4 mr-2" />
                          Previous
                        </Button>
                        <Button
                          variant="outline"
                          onClick={handleSkip}
                          className="flex-1 h-10"
                        >
                          Skip
                        </Button>
                        <Button
                          onClick={handleNext}
                          className="flex-1 h-10"
                          style={{
                            backgroundColor: '#ff5501',
                          }}
                        >
                          {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}

