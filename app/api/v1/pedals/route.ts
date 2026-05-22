import { ApiError } from "@/lib/api-client"
import { PedalsService } from "@/services/pedals"
import { revalidateTag } from "next/cache"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    return NextResponse.json(await PedalsService.getPedals())
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status }
      )
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const requestBody = await request.json()
    const createdPedal = await PedalsService.createPedal(requestBody)
    revalidateTag("pedals", "everything")
    return NextResponse.json(createdPedal, { status: 201 })
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status }
      )
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
