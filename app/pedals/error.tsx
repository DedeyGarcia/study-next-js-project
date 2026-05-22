"use client"

export default function PedalsError() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Erro</h1>
      <p>
        Houve um erro ao carregar os pedais. Por favor, tente novamente mais
        tarde.
      </p>
    </div>
  )
}
