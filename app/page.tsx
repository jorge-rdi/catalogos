import { HeroSection } from "@/components/hero-section"
import { ShopByBrands } from "@/components/shop-by-brands"
import { ShopByField } from "@/components/shop-by-field"
import { ShopAllSection } from "@/components/shop-all-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
<main className="relative min-h-screen bg-background overflow-hidden">
  {/* Blob 0 - Top middle (new) */}
  <div className="absolute -top-20 left-1/2 w-[500px] h-[500px] bg-accent/20 dark:bg-accent/6 rounded-full blur-[100px] -translate-x-1/2 pointer-events-none" />

  {/* Blob 1 - Top left */}
  <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-accent/30 dark:bg-accent/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

  {/* Blob 2 - Top right */}
  <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-accent/25 dark:bg-accent/8 rounded-full blur-[100px] translate-x-1/3 pointer-events-none" />

  {/* Blob 3 - Top center */}
  <div className="absolute top-10 left-1/2 w-[400px] h-[400px] bg-accent/18 dark:bg-accent/5 rounded-full blur-[80px] -translate-x-1/2 pointer-events-none" />

  {/* Blob 4 - Middle left */}
  <div className="absolute top-1/2 left-0 w-[550px] h-[550px] bg-accent/20 dark:bg-accent/6 rounded-full blur-[110px] -translate-x-1/3 -translate-y-1/2 pointer-events-none" />

  {/* Blob 5 - Middle right */}
  <div className="absolute top-1/2 right-0 w-[450px] h-[450px] bg-accent/28 dark:bg-accent/9 rounded-full blur-[90px] translate-x-1/4 pointer-events-none" />

  {/* Blob 6 - Middle center */}
  <div className="absolute top-1/2 left-1/3 w-[350px] h-[350px] bg-accent/15 dark:bg-accent/4 rounded-full blur-[70px] -translate-y-1/4 pointer-events-none" />

  {/* Blob 7 - Lower left */}
  <div className="absolute bottom-1/4 left-10 w-[480px] h-[480px] bg-accent/24 dark:bg-accent/7 rounded-full blur-[95px] pointer-events-none" />

  {/* Blob 8 - Lower right */}
  <div className="absolute bottom-1/3 right-20 w-[420px] h-[420px] bg-accent/26 dark:bg-accent/8 rounded-full blur-[85px] pointer-events-none" />

  {/* Blob 9 - Bottom center */}
  <div className="absolute bottom-0 left-1/2 w-[700px] h-[700px] bg-accent/22 dark:bg-accent/7 rounded-full blur-[130px] -translate-x-1/2 translate-y-1/2 pointer-events-none" />

  {/* Blob 10 - Bottom left */}
  <div className="absolute bottom-0 left-0 w-[380px] h-[380px] bg-accent/19 dark:bg-accent/6 rounded-full blur-[75px] -translate-x-1/4 translate-y-1/4 pointer-events-none" />

  {/* Blob 11 - Bottom right corner */}
  <div className="absolute bottom-10 right-0 w-[520px] h-[520px] bg-accent/23 dark:bg-accent/7 rounded-full blur-[105px] translate-x-1/3 pointer-events-none" />

  {/* 💥 Blob 12 - Top of Brands section */}
  <div className="absolute top-[900px] left-1/2 w-[650px] h-[650px] bg-accent/22 dark:bg-accent/8 rounded-full blur-[120px] -translate-x-1/2 pointer-events-none" />

  {/* Grain texture overlay */}
  <div
    className="fixed inset-0 opacity-[0.03] dark:opacity-[0.015] pointer-events-none z-50"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    }}
  />

  <div className="relative z-10">
    <HeroSection />
    <ShopByBrands />
    <ShopByField />


  </div>
</main>

  )
}
