"use client"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Zap, Bot, User } from "lucide-react"
import { chatMessages, suggestedQuestions, aiResponses } from "@/lib/mock-data"

interface Message { id: number; role: string; content: string; time: string }

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>(chatMessages)
  const [input, setInput] = useState("")
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const nextId = useRef(Math.max(0, ...chatMessages.map(m => m.id)) + 1)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }) }, [messages, typing])

  const sendMessage = async (text: string) => {
    if (!text.trim()) return
    const userMsg: Message = { id: nextId.current++, role: "user", content: text, time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) }
    setMessages(prev => [...prev, userMsg])
    setInput("")
    setTyping(true)
    await new Promise(r => setTimeout(r, 1200))
    const response = aiResponses[text] || `I understand you're asking about "${text}". As your InvestOne AI assistant, I can help you understand this investment concept better. Based on the Indian securities market context and your current portfolio, let me provide you with relevant information. Would you like me to elaborate on any specific aspect?`
    const aiMsg: Message = { id: nextId.current++, role: "assistant", content: response, time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) }
    setTyping(false)
    setMessages(prev => [...prev, aiMsg])
  }

  const formatContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) return <p key={i} className="font-bold mt-2 mb-1">{line.replace(/\*\*/g, '')}</p>
      if (line.startsWith('•')) return <p key={i} className="flex gap-2 my-0.5"><span className="text-[#0B6EFD]">•</span><span>{line.slice(1).trim()}</span></p>
      if (line.startsWith('✅') || line.startsWith('⚠️') || line.startsWith('🔴') || line.startsWith('🟡') || line.startsWith('🟢') || line.startsWith('🔵') || line.startsWith('💰') || line.startsWith('📊') || line.startsWith('🚀')) return <p key={i} className="my-0.5">{line}</p>
      if (line.startsWith('#')) return <p key={i} className="font-bold text-base mt-2">{line.replace(/#+/, '').trim()}</p>
      return line ? <p key={i} className="my-0.5">{line.replace(/\*\*/g, '')}</p> : <div key={i} className="h-1" />
    })
  }

  return (
    <div className="h-[calc(100vh-7rem)] flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-extrabold text-[var(--fg)]">AI Assistant</h1>
        <p className="text-sm text-[var(--muted-fg)]">Powered by Gemini AI · Ask anything about investments</p>
      </div>

      {/* Suggested questions */}
      <div className="flex gap-2 flex-wrap">
        {suggestedQuestions.slice(0, 6).map((q, i) => (
          <button key={i} onClick={() => sendMessage(q)}
            className="text-xs font-medium px-3 py-1.5 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--fg)] hover:border-[#0B6EFD] hover:text-[#0B6EFD] transition-all whitespace-nowrap">
            {q}
          </button>
        ))}
      </div>

      {/* Chat area */}
      <div className="flex-1 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl flex flex-col overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-3.5 border-b border-[var(--card-border)]">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0B6EFD] to-[#00B894] flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-[var(--fg)]">InvestOne AI</p>
            <p className="text-xs text-[var(--muted-fg)]">Gemini-powered · Always available</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#00B894] pulse-blue" />
            <span className="text-xs text-[#00B894] font-medium">Online</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <AnimatePresence>
            {messages.map(msg => (
              <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-[#0B6EFD]' : 'bg-gradient-to-br from-[#0B6EFD] to-[#00B894]'}`}>
                  {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                </div>
                <div className={`max-w-[75%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                  <div className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}>
                    <div className="text-sm leading-relaxed">{formatContent(msg.content)}</div>
                  </div>
                  <span className="text-[10px] text-[var(--muted-fg)]">{msg.time}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {typing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0B6EFD] to-[#00B894] flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="chat-bubble-ai">
                <div className="flex gap-1 py-1">
                  {[0, 1, 2].map(i => (
                    <motion.div key={i} className="w-2 h-2 rounded-full bg-[#0B6EFD]"
                      animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.15 }} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-[var(--card-border)]">
          <form onSubmit={e => { e.preventDefault(); sendMessage(input) }} className="flex gap-3">
            <input value={input} onChange={e => setInput(e.target.value)}
              placeholder="Ask about REITs, InvITs, portfolio review, tax saving..."
              className="flex-1 px-4 py-2.5 bg-[var(--input-bg)] border border-[var(--card-border)] rounded-xl text-sm text-[var(--fg)] placeholder:text-[var(--muted-fg)] outline-none focus:border-[#0B6EFD] focus:shadow-[0_0_0_3px_rgba(11,110,253,0.1)] transition-all" />
            <button type="submit" disabled={!input.trim() || typing}
              className="w-10 h-10 rounded-xl bg-[#0B6EFD] flex items-center justify-center text-white hover:bg-[#0055D4] transition-colors disabled:opacity-50 shrink-0 shadow-[0_4px_14px_0_rgba(11,110,253,0.35)]">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
