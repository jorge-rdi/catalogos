import type { Product } from "@/lib/products"
import Image from "next/image"
import Link from "next/link"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="group bg-card rounded-lg overflow-hidden border border-border hover:border-accent transition-colors"
    >
      <div className="aspect-square relative overflow-hidden bg-muted">
        <Image
          src={product.coverImg || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <p className="text-sm text-accent mb-1">{product.brand}</p>
        <h3 className="font-semibold mb-2 group-hover:text-accent transition-colors">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.model}</p>
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold">GS {product.price.toLocaleString()}</p>

        </div>
      </div>
    </Link>
  )
}
