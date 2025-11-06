"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { X, SlidersHorizontal } from "lucide-react"
import type { FieldType } from "@/lib/products"

interface ShopFiltersProps {
  brands: string[]
  selectedBrand?: string
  selectedFieldType?: FieldType
  selectedSort: string
  onBrandChange: (brand: string | undefined) => void
  onFieldTypeChange: (fieldType: FieldType | undefined) => void
  onSortChange: (sort: "price-asc" | "price-desc" | "name-asc" | "name-desc") => void
  onClearFilters: () => void
  isOpen: boolean
  onToggle: (isOpen: boolean) => void
}

export function ShopFilters({
  brands,
  selectedBrand,
  selectedFieldType,
  selectedSort,
  onBrandChange,
  onFieldTypeChange,
  onSortChange,
  onClearFilters,
  isOpen,
  onToggle,
}: ShopFiltersProps) {
  const hasActiveFilters = selectedBrand || selectedFieldType

  return (
    <div>
      <Button
        onClick={() => onToggle(!isOpen)}
        variant="outline"
        className="w-full mb-4 bg-card border-border justify-between"
      >
        <span className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filtros
        </span>

      </Button>

      {isOpen && (
        <aside className="space-y-6">
          {/* Field Type */}
          <div>
            <Label className="text-sm font-semibold mb-3 block">Tipo de campo</Label>
            <div className="space-y-2">
              <button
                onClick={() => onFieldTypeChange(undefined)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  !selectedFieldType ? "bg-accent text-accent-foreground" : "hover:bg-muted"
                }`}
              >
                Todos los campos
              </button>
              <button
                onClick={() => onFieldTypeChange("interior")}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  selectedFieldType === "interior" ? "bg-accent text-accent-foreground" : "hover:bg-muted"
                }`}
              >
                Interior
              </button>
              <button
                onClick={() => onFieldTypeChange("exterior")}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  selectedFieldType === "exterior" ? "bg-accent text-accent-foreground" : "hover:bg-muted"
                }`}
              >
                Exterior
              </button>
            </div>
          </div>

          {/* Brands */}
          <div>
            <Label className="text-sm font-semibold mb-3 block">Marca</Label>
            <div className="space-y-2">
              <button
                onClick={() => onBrandChange(undefined)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  !selectedBrand ? "bg-accent text-accent-foreground" : "hover:bg-muted"
                }`}
              >
                Todas las marcas
              </button>
              {brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => onBrandChange(brand)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    selectedBrand === brand ? "bg-accent text-accent-foreground" : "hover:bg-muted"
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div>
            <Label className="text-sm font-semibold mb-3 block">Ordenar por</Label>
            <div className="space-y-2">
              <button
                onClick={() => onSortChange("name-asc")}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  selectedSort === "name-asc" ? "bg-accent text-accent-foreground" : "hover:bg-muted"
                }`}
              >
                Nombre (A-Z)
              </button>
              <button
                onClick={() => onSortChange("name-desc")}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  selectedSort === "name-desc" ? "bg-accent text-accent-foreground" : "hover:bg-muted"
                }`}
              >
                Nombre (Z-A)
              </button>
              <button
                onClick={() => onSortChange("price-asc")}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  selectedSort === "price-asc" ? "bg-accent text-accent-foreground" : "hover:bg-muted"
                }`}
              >
                Precio (Bajo a Alto)
              </button>
              <button
                onClick={() => onSortChange("price-desc")}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  selectedSort === "price-desc" ? "bg-accent text-accent-foreground" : "hover:bg-muted"
                }`}
              >
                  Precio (Alto a Bajo)
              </button>
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button onClick={onClearFilters} variant="outline" className="w-full bg-transparent">
              <X className="h-4 w-4 mr-2" />
              Limpiar filtros
            </Button>
          )}
        </aside>
      )}
    </div>
  )
}
