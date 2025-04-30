interface PaneProps {
  title: string
  children: React.ReactNode
}

export const Pane = ({title, children}: PaneProps) => {
  return (
    <div className="flex-1 h-full p-4 overflow-auto bg-gray-400 border border-gray-300 rounded-lg">
      <h2 className="mb-3 text-lg text-gray-800" data-testid="pane-title">
        {title}
      </h2>
      <div className="w-full h-95/100">{children}</div>
    </div>
  )
}
