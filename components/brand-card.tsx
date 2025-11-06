"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface BrandCardProps {
  name: string
  logo: string
}

export function BrandCard({ name, logo }: BrandCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
<Link
  href={`/shop/brand/${encodeURIComponent(name.toLowerCase())}`}
  className={cn(
    "group relative overflow-hidden rounded-lg border border-border transition-all duration-500 flex-shrink-0",
    "w-64 h-48 sm:w-72 sm:h-56 md:w-80 md:h-64", // Tamaños responsive
    isHovered && " border-accent/50",
    "hover: hover:border-accent/50" // Hover para touch devices
  )}
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
  onTouchStart={() => setIsHovered(true)} // Para dispositivos táctiles
  onTouchEnd={() => setIsHovered(false)}
>
  {/* Full-size brand image */}
  <img
    src={logo || "/placeholder.svg"}
    alt={name}
    className={cn(
      "absolute inset-0 w-full h-full object-cover transition-all duration-500",
      !isHovered && "grayscale brightness-50",
      isHovered && "grayscale-0 brightness-100",
      "group-hover:grayscale-0 group-hover:brightness-100" // Para CSS nativo
    )}
  />

  <div
    className={cn(
      "absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent transition-opacity duration-500",
      isHovered && "opacity-50",
      "group-hover:opacity-50"
    )}
  />

  {/* Brand name */}
  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
    <h3 className="text-xl md:text-2xl font-bold text-foreground">{name}</h3>
  </div>

  {/* Accent glow on hover */}
  <div
    className={cn(
      "absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-0 transition-opacity duration-500",
      isHovered && "opacity-100",
      "group-hover:opacity-100"
    )}
  />
</Link>
  )
}
