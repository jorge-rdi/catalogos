"use client"

import { BrandCard } from "@/components/brand-card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef, useState, useEffect } from "react"

const brands = [
  { name: "Adidas", logo: "https://download.logo.wine/logo/Adidas/Adidas-Logo.wine.png" },
  { name: "Puma", logo: "https://images.seeklogo.com/logo-png/27/1/puma-logo-png_seeklogo-273104.png" },
  { name: "Nike", logo: "https://www.citypng.com/public/uploads/preview/red-nike-logo-png-7017516947771782pkgpbuv6v.png" },
  { name: "New Balance", logo: "/placeholder.svg?height=200&width=300" },
  { name: "Under Armour", logo: "/placeholder.svg?height=200&width=300" },
  { name: "Mizuno", logo: "/placeholder.svg?height=200&width=300" },
  { name: "Umbro", logo: "/placeholder.svg?height=200&width=300" },
]

export function ShopByBrands() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = brands.length

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount)
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      })
    }
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft
      const cardWidth = 400
      const slide = Math.round(scrollLeft / cardWidth)
      setCurrentSlide(slide)
    }

    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section id="brands" className="relative py-20 lg:py-24 ">
      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div className="flex items-start justify-between mb-12">
          <div className="text-left flex-1">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Comprar por marca</h2>
            <p className="text-lg text-muted-foreground max-w-2xl text-pretty">
              Elige entre las principales marcas del mundo
            </p>
          </div>

          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="h-12 w-12 rounded-md hover:bg-accent/30  backdrop-blur-md border border-accent/30 flex items-center justify-center hover:bg-accent/30 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="h-12 w-12 rounded-md hover:bg-accent/30  backdrop-blur-md border border-accent/30 flex items-center justify-center hover:bg-accent/30 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {brands.map((brand) => (
              <BrandCard key={brand.name} name={brand.name} logo={brand.logo} />
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollTo({
                    left: index * 400,
                    behavior: "smooth",
                  })
                }
              }}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? "w-8 bg-accent" : "w-2 bg-accent/30"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
