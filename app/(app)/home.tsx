"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3">
      <h1 className="text-2xl font-bold">
        Bem vindo ao gerenciador de coleção de Pedais
      </h1>
      <Button
        variant="default"
        size="lg"
        onClick={() => router.push("/pedals")}
      >
        Acessar Coleção
      </Button>
    </div>
  )
}
