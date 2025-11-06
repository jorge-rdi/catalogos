import { FieldCard } from "@/components/field-card"

const fieldTypes = [
  {
    title: "Futbol de Campo",
    description: "Perfecto para superficies de césped natural. Máxima tracción y estabilidad para el juego al aire libre.",
    image: "https://res.cloudinary.com/dmrksxjcx/image/upload/v1761654240/unnamed_4_jzqzyb.jpg",
    features: ["Césped natural", "Al aire libre", "Todo tiempo"],
    fieldType: "exterior" as const,
  },
  {
    title: "Futsal y Césped Sintético",
    description: "Diseñado para superficies sintéticas. Mayor durabilidad y tracción óptima en césped sintético.",
    image: "https://res.cloudinary.com/dmrksxjcx/image/upload/v1761654240/unnamed_3_piyqei.jpg",
    features: ["Césped sintético", "Interior/Exterior", "Alta Durabilidad"],
    fieldType: "interior" as const,
  },
]

export function ShopByField() {
  return (
    <section id="field" className="relative py-20 lg:py-24">
      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div className="text-left mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Comprar por tipo de campo</h2>
          <p className="text-lg text-muted-foreground max-w-2xl text-pretty">
            Encuentra la mejor opción para tu campo de juego
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {fieldTypes.map((field) => (
            <FieldCard key={field.title} {...field} />
          ))}
        </div>
      </div>
    </section>
  )
}
