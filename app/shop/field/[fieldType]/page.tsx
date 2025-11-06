import { ShopContent } from "@/components/shop-content"
import { Footer } from "@/components/footer"
import type { FieldType } from "@/lib/products"

export default async function FieldPage({ params }: { params: Promise<{ fieldType: string }> }) {
  const { fieldType } = await params

  return (
    <main className="relative min-h-screen bg-background">
      <div className="pt-20">
        <ShopContent initialFieldType={fieldType as FieldType} />
      </div>
      
    </main>
  )
}
