export default function TypingIndicator() {
  return (
    <div className="flex flex-col gap-1 items-start animate-fade-in">
      <span className="text-[10px] text-muted uppercase tracking-[0.1em] px-1">Aurora</span>
      <div className="bg-white border border-border px-3.5 py-3">
        <div className="flex gap-[5px] items-center">
          {[0, 150, 300].map(delay => (
            <span
              key={delay}
              className="w-[5px] h-[5px] rounded-full bg-muted animate-bounce"
              style={{ animationDelay: `${delay}ms`, animationDuration: '1s' }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
