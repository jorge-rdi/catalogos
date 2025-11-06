"use client"

import { useCart } from "@/lib/cart-context"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2, ChevronLeft } from "lucide-react"
import { useEffect } from "react"

export function CartContent() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  const handleWhatsAppShare = () => {
    if (items.length === 0) return

    const phoneNumber = "595985784687"
    let message = "Hello! I'm interested in the following products:\n\n"

    items.forEach((item, index) => {
      const productUrl = `${window.location.origin}/product/${item.id}`
      message += `${index + 1}. ${item.name}\n`
      message += `   Brand: ${item.brand}\n`
      message += `   Model: ${item.model}\n`
      message += `   SKU: ${item.sku}\n`
      message += `   Size: ${item.selectedSize}\n`
      message += `   Quantity: ${item.quantity}\n`
      message += `   Price: $${(item.price * item.quantity).toFixed(2)}\n`
      message += `   Link: ${productUrl}\n\n`
    })

    message += `Total: $${totalPrice.toFixed(2)}`

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 lg:px-8 pt-32 pb-16">
        <div className="text-center py-16">
          <h1 className="text-3xl font-bold mb-4">Tu carrito está vacío</h1>
          <p className="text-muted-foreground mb-8">Agrega algunos cleats para empezar!</p>
          <Link href="/shop">
            <Button>Comprar ahora</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 pt-32 pb-16">
      <Link
        href="/shop"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Continuar comprando
      </Link>

      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold">Carrito de compras</h1>
            <Button variant="ghost" size="sm" onClick={clearCart} className="text-muted-foreground self-start sm:self-auto">
              <Trash2 className="h-4 w-4 mr-2" />
              Limpiar todo
            </Button>
          </div>

          {items.map((item) => (
            <div
              key={`${item.id}-${item.selectedSize}`}
              className="bg-card rounded-lg p-4 sm:p-6 border border-border"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <Image src={item.coverImg || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Link href={`/product/${item.id}`} className="hover:text-accent transition-colors flex-1">
                      <h3 className="font-semibold text-base sm:text-lg leading-tight">{item.name}</h3>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id, item.selectedSize)}
                      className="text-muted-foreground hover:text-destructive flex-shrink-0 h-8 w-8 sm:h-9 sm:w-9"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">{item.brand}</p>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mb-4">
                    <span className="whitespace-nowrap">Modelo: {item.model}</span>
                    <span className="whitespace-nowrap">Tamaño: {item.selectedSize}</span>
                    <span className="whitespace-nowrap">SKU: {item.sku}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-border">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                        className="h-8 w-8"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-10 text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                        className="h-8 w-8"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm text-muted-foreground ml-2">${item.price.toFixed(2)} c/u</span>
                    </div>
                    <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-lg p-4 sm:p-6 border border-border lg:sticky lg:top-32">
            <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Resumen de la orden</h2>

            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Items</span>
                <span className="font-medium">{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
              </div>
            </div>

            <div className="border-t border-border pt-3 sm:pt-4 mb-4 sm:mb-6">
              <div className="flex justify-between text-base sm:text-lg font-bold">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <Button onClick={handleWhatsAppShare} className="w-full h-11 sm:h-12 text-sm sm:text-base" size="lg">
              <svg className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <span className="truncate">Compartir en WhatsApp</span>
            </Button>

            <p className="text-xs text-muted-foreground text-center mt-3 sm:mt-4 leading-relaxed">
              Envía los detalles de tu orden via WhatsApp para completar tu compra
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
