import { getPedals } from "@/services/pedals"
import { Pedal } from "@/types/pedals"

export default async function PedalsPage() {
  const pedalsApiResponse = await getPedals()
  const pedals = pedalsApiResponse?.data || []

  console.log("Pedals Request Response:", pedalsApiResponse)
  return (
    <div>
      <h1 className="text-2xl font-bold">Pedais</h1>
      <ul className="mt-4 space-y-2">
        {pedals?.map((pedal: Pedal) => (
          <li key={pedal.id} className="rounded border p-4">
            <h2 className="text-xl font-semibold">{pedal.name}</h2>
            <p className="text-sm text-gray-600">{pedal.brand}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
