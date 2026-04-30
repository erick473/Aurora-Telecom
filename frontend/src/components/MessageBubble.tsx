interface MessageBubbleProps {
  role: 'user' | 'assistant'
  content: string
  humanEscalation?: boolean
}

export default function MessageBubble({ role, content, humanEscalation }: MessageBubbleProps) {
  const isUser = role === 'user'

  return (
    <div className={`flex flex-col gap-1 animate-fade-in ${isUser ? 'items-end' : 'items-start'}`}>
      <span className="text-[10px] text-muted uppercase tracking-[0.1em] px-1">
        {isUser ? 'Tú' : 'Aurora'}
      </span>
      <div
        className={`max-w-[82%] px-3.5 py-2.5 text-[13px] leading-[1.6] ${
          isUser
            ? 'bg-ink text-white'
            : 'bg-white border border-border text-ink'
        }`}
      >
        <p className="whitespace-pre-wrap">{content}</p>
        {humanEscalation && !isUser && (
          <p className="mt-2 pt-2 border-t border-border text-[11px] text-muted">
            Conectando con un agente humano — Tel. 33-1234-5678
          </p>
        )}
      </div>
    </div>
  )
}
