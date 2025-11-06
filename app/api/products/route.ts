import { NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import { DBProduct, productToDTO, FieldType } from "@/lib/types"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const brand = searchParams.get("brand")
    const brands = searchParams.get("brands")?.split(",").filter(Boolean)
    const fieldType = searchParams.get("fieldType") as FieldType | null
    const search = searchParams.get("search")
    const sortBy = searchParams.get("sortBy")
    const page = parseInt(searchParams.get("page") || "1")
    const perPage = parseInt(searchParams.get("perPage") || "12")

    const db = await getDatabase()
    const collection = db.collection<DBProduct>("products")

    const filter: any = {}

    if (brand) {
      filter.brand = { $regex: new RegExp(`^${brand}$`, "i") }
    } else if (brands && brands.length > 0) {
      filter.brand = { $in: brands.map((b) => new RegExp(`^${b}$`, "i")) }
    }

    if (fieldType) {
      // Map frontend fieldType to DB values (e.g., "Campo" for exterior)
      if (fieldType === "exterior") {
        filter.fieldType = { $regex: /^Campo$/i }
      } else if (fieldType === "interior") {
        filter.fieldType = { $in: [/^Futsal$/i, /^Sintetico$/i, /^Sintético$/i, /^Interior$/i, /^Indoor$/i] }
      }
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { model: { $regex: search, $options: "i" } },
      ]
    }

    let sort: any = {}
    if (sortBy) {
      switch (sortBy) {
        case "price-asc":
          sort = { "price.amount": 1 }
          break
        case "price-desc":
          sort = { "price.amount": -1 }
          break
        case "name-asc":
          sort = { name: 1 }
          break
        case "name-desc":
          sort = { name: -1 }
          break
      }
    }

    const total = await collection.countDocuments(filter)
    const skip = (page - 1) * perPage

    const products = await collection.find(filter).sort(sort).skip(skip).limit(perPage).toArray()

    const productDTOs = products.map(productToDTO)

    return NextResponse.json({
      products: productDTOs,
      total,
      page,
      perPage,
      totalPages: Math.ceil(total / perPage),
    })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}


