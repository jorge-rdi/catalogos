import { ShopContent } from "@/components/shop-content"
import { Footer } from "@/components/footer"

export default function BrandPage({ params }: { params: { brand: string } }) {
  return (
    <main className="relative min-h-screen bg-background">
      <div className="pt-20">
        <ShopContent initialBrand={decodeURIComponent(params.brand)} />
      </div>
      
    </main>
  )
}
