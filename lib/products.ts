export type FieldType = "interior" | "exterior"

export interface Product {
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

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/products/${id}`, {
      cache: "no-store",
    })

    if (!response.ok) {
      return null
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}

export async function getProducts(filters?: {
  brand?: string
  brands?: string[]
  fieldType?: FieldType
  search?: string
  sortBy?: "price-asc" | "price-desc" | "name-asc" | "name-desc"
  page?: number
  perPage?: number
}) {
  try {
    const params = new URLSearchParams()

    if (filters?.brand) params.append("brand", filters.brand)
    if (filters?.brands && filters.brands.length > 0) params.append("brands", filters.brands.join(","))
    if (filters?.fieldType) params.append("fieldType", filters.fieldType)
    if (filters?.search) params.append("search", filters.search)
    if (filters?.sortBy) params.append("sortBy", filters.sortBy)
    if (filters?.page) params.append("page", filters.page.toString())
    if (filters?.perPage) params.append("perPage", filters.perPage.toString())

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || ""}/api/products?${params.toString()}`,
      {
        cache: "no-store",
      },
    )

    if (!response.ok) {
      throw new Error("Failed to fetch products")
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching products:", error)
    return {
      products: [],
      total: 0,
      page: 1,
      perPage: 12,
      totalPages: 0,
    }
  }
}

export async function getBrands(): Promise<string[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/brands`, {
      cache: "no-store",
    })

    if (!response.ok) {
      return []
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching brands:", error)
    return []
  }
}
