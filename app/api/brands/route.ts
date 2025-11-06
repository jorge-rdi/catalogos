import { NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import { Product } from "@/lib/types"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const db = await getDatabase()
    const collection = db.collection<Product>("products")

    const brands = await collection.distinct("brand")
    const sortedBrands = brands.sort()

    return NextResponse.json(sortedBrands)
  } catch (error) {
    console.error("Error fetching brands:", error)
    return NextResponse.json({ error: "Failed to fetch brands" }, { status: 500 })
  }
}


