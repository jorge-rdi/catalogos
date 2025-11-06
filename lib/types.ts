import { ObjectId } from "mongodb"

export type FieldType = "interior" | "exterior"

// Database schema as provided
export interface DBProduct {
  _id: ObjectId
  sku: string
  name: string
  brand: string
  fieldType?: string // e.g. "Campo", may vary
  model: string
  price: {
    amount: number
    currency: string
  }
  sizes: {
    range?: string
    available: string[]
  }
  images: {
    cover: string
    gallery: string[]
  }
  slug?: string
  status?: string
}

// DTO used by the frontend (matches lib/products.ts Product)
export interface ProductDTO {
  id: string
  name: string
  sku: string
  brand: string
  model: string
  fieldType: FieldType
  sizes: string[]
  coverImg: string
  imageUrls: string[]
  price: number
  stock: number
}

function normalizeFieldType(dbFieldType?: string): FieldType {
  if (!dbFieldType) return "exterior"
  const value = dbFieldType.toLowerCase()
  // Treat "Campo" as exterior; common interiors listed
  if (value === "campo" || value === "exterior" || value === "outdoor") return "exterior"
  if (["futsal", "sintetico", "sintético", "interior", "indoor"].includes(value)) return "interior"
  return "exterior"
}

export function productToDTO(product: DBProduct): ProductDTO {
  return {
    id: product._id.toString(),
    name: product.name,
    sku: product.sku,
    brand: product.brand,
    model: product.model,
    fieldType: normalizeFieldType(product.fieldType),
    sizes: product.sizes?.available || [],
    coverImg: product.images?.cover || "",
    imageUrls: product.images?.gallery || [],
    // Keep numeric price for UI. Amount assumed already in GS.
    price: product.price?.amount ?? 0,
    // Fallback stock since schema does not include it
    stock: (product.sizes?.available?.length ?? 0) > 0 ? 10 : 0,
  }
}


