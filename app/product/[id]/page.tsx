import { getProductById } from "@/lib/products"
import { notFound } from "next/navigation"
import { ProductDetails } from "@/components/product-details"

export const dynamic = "force-dynamic"

export default async function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params

  const product = await getProductById(id)

  if (!product) {
    notFound()
  }

  return <ProductDetails product={product} />
}
