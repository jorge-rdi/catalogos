"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface FieldCardProps {
  title: string
  description: string
  image: string
  features: string[]
  fieldType: "interior" | "exterior"
}

export function FieldCard({ title, image, fieldType }: FieldCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href={`/shop/field/${fieldType}`}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-500 block",
        isHovered && "border-accent shadow-lg shadow-accent/20",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-80 overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className={cn("h-full w-full object-cover transition-transform duration-700", isHovered && "scale-110")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-3xl font-bold text-foreground">{title}</h3>
        </div>
      </div>
    </Link>
  )
}
