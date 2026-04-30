import { useState, useRef, useEffect } from 'react'
import MessageBubble from './MessageBubble'
import TypingIndicator from './TypingIndicator'

interface Message {
  role: 'user' | 'assistant';
  content: string;
  humanEscalation?: boolean;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function getUserId(): string {
  let uid = sessionStorage.getItem('aurora_uid')
  if (!uid) {
    uid = crypto.randomUUID()
    sessionStorage.setItem('aurora_uid', uid)
  }

  return uid;
}

const SUGGESTED = [
  '¿Cuánto cuesta el plan Aurora Pro 450?',
  '¿Tienen fibra en Providencia?',
  'Mi internet no funciona, ¿qué hago?',
  '¿Puedo cancelar sin penalización?',
]

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hola, soy el asistente de Aurora Telecom. ¿En qué te puedo ayudar?',
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 80)
  }, [isOpen])

  async function sendMessage(text?: string) {
    const msg = (text ?? input).trim()
    if (!msg || isLoading) return

    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: msg }])
    setIsLoading(true)

    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, user_id: getUserId() }),
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.response,
        humanEscalation: data.human_escalation,
      }])

    } finally {
      setIsLoading(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  return (
    <>
      {/* Popover encima del botón flotante, solo cuando está cerrado */}
      {!isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex flex-col items-center">
          <div className="relative flex flex-col items-center">
            {/* Avatar circular */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-200 flex items-center justify-center shadow-lg border-4 border-white -mb-5 z-10">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="16" fill="url(#paint0_linear_1_1)" />
                <ellipse cx="16" cy="18.5" rx="7" ry="5.5" fill="#fff" fillOpacity=".18" />
                <path d="M12.5 14c.5 1.5 2 2.5 3.5 2.5s3-1 3.5-2.5" stroke="#1e293b" strokeWidth="1.2" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="paint0_linear_1_1" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#60a5fa"/>
                    <stop offset="1" stopColor="#38bdf8"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            {/* Popover */}
            <div className="relative bg-white rounded-2xl px-5 py-3 shadow-xl border border-border text-ink text-[15px] text-center w-64 mt-0.5">
              ¿Tienes alguna pregunta? Me complace ayudarte.
              <span className="absolute -top-2 right-3 text-gray-400 text-xl cursor-pointer select-none" style={{pointerEvents:'none'}}>×</span>
            </div>
          </div>
        </div>
      )}

      {/* Botón flotante: solo icono, círculo sólido, sin texto ni recuadro */}
      <button
        data-chat-trigger
        onClick={() => setIsOpen(o => !o)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-opacity hover:opacity-90 ${isOpen ? 'bg-gray-800' : 'bg-blue-600'}`}
        aria-label="Abrir chat"
        style={{ border: 'none' }}
      >
        {isOpen ? (
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7l-5 5V6a2 2 0 0 1 2-2z" />
          </svg>
        )}
      </button>

      {/* Ventana — flat, sin sombras decorativas */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] h-[520px] flex flex-col bg-white border border-border animate-fade-in">
          {/* Header */}
          <div className="border-b border-border px-4 py-3 flex items-center justify-between">
            <div>
              <p className="text-[13px] font-semibold">Aurora — Asistente de soporte</p>
              <p className="text-[11px] text-muted">Aurora Telecom · Responde en segundos</p>
            </div>
            <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface">
            {messages.map((m, i) => (
              <MessageBubble key={i} role={m.role} content={m.content} humanEscalation={m.humanEscalation} />
            ))}
            {isLoading && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>

          {/* Sugerencias iniciales */}
          {messages.length === 1 && !isLoading && (
            <div className="px-4 py-2 bg-surface border-t border-border flex flex-wrap gap-1.5">
              {SUGGESTED.map(s => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="text-[11px] border border-border bg-white px-2.5 py-1 text-muted hover:text-ink hover:border-ink transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="border-t border-border p-3 flex gap-2 bg-white">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu pregunta..."
              disabled={isLoading}
              className="flex-1 text-[13px] border border-border px-3 py-2 focus:outline-none focus:border-ink transition-colors disabled:opacity-40 bg-white"
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || isLoading}
              className="px-3 py-2 text-white text-[12px] disabled:opacity-30 transition-opacity hover:opacity-90 flex-shrink-0"
              style={{ backgroundColor: 'transparent', boxShadow: 'none', border: 'none' }}
            >
              <svg className="w-4 h-4 rotate-90" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}

