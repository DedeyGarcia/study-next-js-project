type PedalsPageShellProps = {
  children: React.ReactNode
}

export function PedalsPageShell({ children }: PedalsPageShellProps) {
  return (
    <div className="mx-auto mt-4 flex w-full max-w-7xl flex-1 flex-col items-center gap-4">
      <h1 className="text-2xl font-bold">Pedais</h1>
      {children}
    </div>
  )
}
