'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Copy, Check, Terminal, Send, ChevronDown } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { motion, AnimatePresence } from "framer-motion"

interface CodeExample {
  method: string
  url: string
  code: string
  description: string
}

const codeExamples: CodeExample[] = [
  {
    method: 'GET',
    url: 'https://api.qude.ai/api/agent/',
    code: 'curl https://api.qude.ai/api/agent/Aura',
    description: 'Fetch details about an agent'
  },
  {
    method: 'POST',
    url: 'https://api.qude.ai/api/agent/',
    code: `curl -X POST "https://api.qude.ai/api/agent/Aura/interact" \\
-H "Content-Type: application/json" \\
-d '{"message": "Hello!"}'`,
    description: 'Interact with an agent'
  }
]

const ecosystemInfo = [
  {
    title: "QudeAI Framework",
    description: "The QudeAI Framework is an open-source platform for creating on-chain AI agents. Whether you're an individual or a company, you can create intelligent agents that anyone can interact with seamlessly. Powered by QLLM (QudeAI Language and Logic Modules), the framework ensures seamless on-chain interaction and intelligent responses. A key feature of the framework is QCM (QudeAI Community Module), which makes all deployed AI agents publicly accessible and reusable. This unique capability sets QudeAI apart from other frameworks."
  },
  {
    title: "QudeAPI",
    description: "The QudeAPI allows you to integrate publicly available AI agents from dao.qude.ai into your applications. With QudeAPI, you can use AI agents for trading, blockchain queries, and other powerful functionalities, depending on the creator's configurations. The best part? You don't need expertise in the Solana blockchain or AI agent creation. The QudeAPI simplifies everything, enabling easy integration into your projects."
  },
  {
    title: "QudeSDK",
    description: "The QudeSDK provides ready-to-use code snippets based on the QudeFramework. These snippets enable you to add advanced features like AI-driven trading, chatbots, and more to your application with just a few lines of code. The SDK is designed to save you time and effort, empowering developers to deliver big features quickly and efficiently."
  },
  {
    title: "QudeDAO",
    description: "QudeDAO is a decentralized autonomous organization (DAO) comprising AI agents built with the QudeFramework. The market cap of the QudeDAO ecosystem is directly tied to the combined market caps of its individual AI agents.\n\nExplore and interact with a variety of public AI agents at dao.qude.ai. You can integrate these agents into your CLI using either the QudeAPI or the QudeFramework codebase."
  }
]

export function CodeRunner() {
  const [activeTab, setActiveTab] = useState('get')
  const [output, setOutput] = useState('')
  const [isCopied, setIsCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [getAgentName, setGetAgentName] = useState('Aura')
  const [postAgentName, setPostAgentName] = useState('Aura')
  const [message, setMessage] = useState('Hello!')
  const [openItem, setOpenItem] = useState(0) // Track single open item

  const toggleItem = (index: number) => {
    setOpenItem(index)
  }

  const handleRun = async (method: string, baseUrl: string) => {
    setIsLoading(true)
    setOutput('Fetching response...')
    try {
      let response
      const agentName = method === 'GET' ? getAgentName : postAgentName
      const url = `${baseUrl}${agentName}${method === 'POST' ? '/interact' : ''}`

      if (method === 'GET') {
        response = await fetch(url)
      } else if (method === 'POST') {
        response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message }),
        })
      }

      if (response.status === 404) {
        setOutput("Agent doesn't exist in qudeaiframework database")
        return
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setOutput(JSON.stringify(data, null, 2))
    } catch (error) {
      console.error('Error:', error)
      setOutput(`Error: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    })
  }

  const getUpdatedCode = (method: string) => {
    if (method === 'GET') {
      return `curl https://api.qude.ai/api/agent/${getAgentName}`
    } else {
      return `curl -X POST "https://api.qude.ai/api/agent/${postAgentName}/interact" \\
-H "Content-Type: application/json" \\
-d '{"message": "${message}"}'`
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto mt-12">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-2/5 p-4">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-[#ff5501] via-orange-500 to-yellow-500 bg-clip-text text-transparent relative"
          >
            The Qude-Ecosystem
          </motion.h2>
          <div className="space-y-4 relative">
            {ecosystemInfo.map((info, index) => (
              <Collapsible
                key={index}
                open={openItem === index}
                onOpenChange={() => toggleItem(index)}
                className="rounded-lg overflow-hidden transition-all duration-200 ease-in-out relative"
              >
                <CollapsibleTrigger 
                  className="flex items-center justify-between w-full p-4 text-left bg-white/40 hover:bg-orange-50/50 transition-colors rounded-lg relative group"
                >
                  <motion.h3 
                    className={`text-lg font-semibold ${openItem === index ? 'text-[#ff5501]' : 'text-gray-700'}`}
                    layout
                  >
                    {info.title}
                  </motion.h3>
                  <div className="flex items-center gap-2">
                    <div 
                      className={`absolute inset-0 bg-gradient-to-r from-transparent via-orange-50/0 to-orange-50/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg pointer-events-none ${
                        openItem === index ? 'opacity-100' : ''
                      }`}
                    />
                    <motion.div
                      animate={{ rotate: openItem === index ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className={`h-4 w-4 ${openItem === index ? 'text-[#ff5501]' : 'text-gray-500'}`} />
                    </motion.div>
                  </div>
                </CollapsibleTrigger>
                <AnimatePresence>
                  {openItem === index && (
                    <CollapsibleContent 
                      className="overflow-hidden text-left relative"
                      forceMount
                    >
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="p-4 text-sm leading-relaxed text-gray-600 bg-orange-50/30 rounded-b-lg border-t border-orange-100"
                      >
                        <div className="prose prose-sm max-w-none text-left">
                          {info.description.split('\n\n').map((paragraph, idx) => (
                            <p key={idx} className="mb-4 last:mb-0">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </motion.div>
                    </CollapsibleContent>
                  )}
                </AnimatePresence>
              </Collapsible>
            ))}
          </div>
        </div>
        <div className="w-full md:w-3/5 bg-white rounded-lg shadow-lg border border-gray-200">
          <Tabs defaultValue="get" className="w-full" onValueChange={(value) => setActiveTab(value)}>
            <TabsList className="grid w-full grid-cols-2 bg-gray-100">
              <TabsTrigger 
                value="get"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs py-1.5"
              >
                GET Example
              </TabsTrigger>
              <TabsTrigger 
                value="post"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs py-1.5"
              >
                POST Example
              </TabsTrigger>
            </TabsList>
            {codeExamples.map((example) => (
              <TabsContent key={example.method.toLowerCase()} value={example.method.toLowerCase()} className="p-2">
                <div className="flex flex-col gap-1.5">
                  <div className="w-full">
                    <h3 className="text-xs font-medium mb-1.5 flex items-center text-gray-700">
                      <Terminal className="mr-1.5 h-3 w-3 text-gray-500" />
                      {example.description}
                    </h3>
                    <div className="space-y-2">
                      <div>
                        <label className="block text-[11px] font-medium text-gray-700 mb-1" htmlFor={`${example.method.toLowerCase()}-agent-name`}>
                          Agent Name
                        </label>
                        <Input
                          id={`${example.method.toLowerCase()}-agent-name`}
                          type="text"
                          value={example.method === 'GET' ? getAgentName : postAgentName}
                          onChange={(e) => example.method === 'GET' ? setGetAgentName(e.target.value) : setPostAgentName(e.target.value)}
                          placeholder="Enter agent name"
                          className="w-full h-7 text-xs"
                        />
                      </div>
                      {example.method === 'POST' && (
                        <div>
                          <label className="block text-[11px] font-medium text-gray-700 mb-1" htmlFor="post-message">
                            Message
                          </label>
                          <Input
                            id="post-message"
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Enter message"
                            className="w-full h-7 text-xs"
                          />
                        </div>
                      )}
                      <div className="bg-gray-50 p-1.5 rounded-md relative">
                        <SyntaxHighlighter 
                          language="bash" 
                          style={tomorrow}
                          customStyle={{
                            backgroundColor: 'transparent',
                            padding: '0',
                            margin: '0',
                            fontSize: '10px',
                          }}
                        >
                          {getUpdatedCode(example.method)}
                        </SyntaxHighlighter>
                        <button
                          onClick={() => copyToClipboard(getUpdatedCode(example.method))}
                          className="absolute top-1 right-1 p-0.5 rounded-md bg-white shadow-sm text-gray-500 hover:text-gray-700 transition-colors"
                          aria-label="Copy to clipboard"
                        >
                          {isCopied ? (
                            <Check className="h-2.5 w-2.5 text-green-500" />
                          ) : (
                            <Copy className="h-2.5 w-2.5" />
                          )}
                        </button>
                      </div>
                      <Button 
                        onClick={() => handleRun(example.method, example.url)}
                        className="w-full h-7 text-xs"
                        style={{
                          backgroundColor: 'rgba(255,85,1,255)',
                          color: 'white',
                        }}
                        disabled={isLoading}
                      >
                        {isLoading ? 'Running...' : `Run ${example.method}`}
                        {!isLoading && (example.method === 'GET' ? <ArrowRight className="ml-1.5 h-3 w-3" /> : <Send className="ml-1.5 h-3 w-3" />)}
                      </Button>
                    </div>
                  </div>
                  <div className="w-full">
                    <h3 className="text-xs font-medium mb-1.5 flex items-center text-gray-700">
                      <Terminal className="mr-1.5 h-3 w-3 text-gray-500" />
                      Output
                    </h3>
                    <div className="bg-gray-50 p-1.5 rounded-md overflow-y-auto border border-gray-200" style={{ height: '80px' }}>
                      <SyntaxHighlighter 
                        language="json" 
                        style={tomorrow}
                        customStyle={{
                          backgroundColor: 'transparent',
                          padding: '0',
                          margin: '0',
                          fontSize: '10px',
                        }}
                      >
                        {output || 'Output will appear here after running the request.'}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  )
}

