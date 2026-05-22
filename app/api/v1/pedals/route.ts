import { ApiError } from "@/lib/api-client"
import { PedalsService } from "@/services/pedals"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    return NextResponse.json(await PedalsService.getPedals())
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status })
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
