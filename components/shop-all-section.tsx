import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function ShopAllSection() {
  return (
    <section className="relative py-20 lg:py-32">
      <div className="container relative z-10 mx-auto px-4 lg:px-8 text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-balance">Explora nuestra colección completa</h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 text-pretty">
          Explora nuestra completa gama de cleats de fútbol de las mejores marcas. Encuentra tu perfecto match con filtros y opciones de clasificación avanzadas.
        </p>

        <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-black font-semibold group">
          <Link href="/shop">
            Ver todos los cleats
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
