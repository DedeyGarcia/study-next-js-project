import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import CreatePedalSheet from "./create-pedal-sheet"

interface PedalsCardProps {
  children: React.ReactNode
  total?: number
  actionDisabled?: boolean
}

export function PedalsCard({
  children,
  total,
  actionDisabled,
}: PedalsCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Minha coleção de pedais</CardTitle>
        <CardAction>
          <CreatePedalSheet disabled={actionDisabled} />
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
      <CardFooter>
        {total === undefined ? (
          <Skeleton className="h-5 w-32" />
        ) : (
          `Total: ${total.toFixed(2)}`
        )}
      </CardFooter>
    </Card>
  )
}
