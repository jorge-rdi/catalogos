import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Full-screen hero image */}
      <div className="absolute inset-0">
        <img src="/images/design-mode/unnamed_2_g0fhru.jpg" alt="Soccer cleats" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-background/60" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />

      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div className="max-w-2xl">


          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-none text-balance">
            Domina
            <br />
            El Campo
          </h1>

          <p className="text-lg md:text-xl text-foreground/90 mb-8 max-w-lg text-pretty">
            {"Explora nuestro catálogo y encuentra el mejor para ti."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/shop">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-accent/90 group">
                Comprar ahora
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

          </div>

          <div className="mt-12 flex items-center gap-8">
            <div>
              <div className="text-3xl font-bold">500+</div>
              <div className="text-sm text-muted-foreground">Productos</div>
            </div>
            <div className="h-12 w-px bg-white/20" />
            <div>
              <div className="text-3xl font-bold">50+</div>
              <div className="text-sm text-muted-foreground">Modelos</div>
            </div>
            <div className="h-12 w-px bg-white/20" />
            <div>
              <div className="text-3xl font-bold">7+</div>
              <div className="text-sm text-muted-foreground">Marcas</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
