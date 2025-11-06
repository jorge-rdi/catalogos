"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ShoppingBag, Check } from "lucide-react"
import type { Product } from "@/lib/products"
import { useCart } from "@/lib/cart-context"
import { Navbar } from "@/components/navbar"

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [added, setAdded] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const { addItem } = useCart()

  const images = product.imageUrls || [product.coverImg]

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  const handleAddToCart = () => {
    if (!selectedSize) return

    addItem(product, selectedSize)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 lg:px-8 pt-32 pb-16">
        <Link
          href="/shop"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Shop
        </Link>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image - Smaller */}
            <div className="aspect-square max-w-md relative rounded-lg overflow-hidden bg-muted">
              <Image src={images[selectedImage] || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="flex gap-3 justify-start flex-row">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden bg-muted border-2 transition-all ${
                      selectedImage === index
                        ? "border-accent ring-2 ring-accent/20"
                        : "border-transparent hover:border-muted-foreground"
                    }`}
                  >
                    <Image src={image} alt={`${product.name} view ${index + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-accent text-sm mb-2">{product.brand}</p>
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              <p className="text-3xl font-bold">${product.price}</p>
            </div>

            <p className="text-muted-foreground leading-relaxed">{product.model}</p>

            <div className="space-y-1">
              <p className="text-sm font-semibold">Tipo de campo</p>
              <p className="text-sm text-muted-foreground">{product.fieldType === "interior" ? "Indoor" : "Outdoor"}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-semibold">SKU</p>
              <p className="text-sm text-muted-foreground">{product.sku}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-semibold">Stock disponible</p>
              <p className="text-sm text-muted-foreground">{product.stock} unidades</p>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <p className="text-sm font-semibold">Size (US)</p>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 rounded-lg border transition-colors ${
                      selectedSize === size
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-border hover:border-muted-foreground"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              disabled={!selectedSize || added}
              className="w-full h-12 text-base"
              size="lg"
            >
              {added ? (
                <>
                  <Check className="h-5 w-5 mr-2" />
                  Agregado al carrito
                </>
              ) : (
                <>
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Agregar al carrito
                </>
              )}
            </Button>

            {!selectedSize && <p className="text-sm text-muted-foreground text-center">Por favor, selecciona un tamaño</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
