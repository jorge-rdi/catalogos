"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { X, SlidersHorizontal, Search } from "lucide-react"
import type { FieldType } from "@/lib/products"
import { useState, useEffect } from "react"

interface ShopFiltersBarProps {
  brands: string[]
  selectedBrands: string[]
  selectedFieldType?: FieldType
  selectedSort: string
  searchQuery?: string
  onBrandsChange: (brands: string[]) => void
  onFieldTypeChange: (fieldType: FieldType | undefined) => void
  onSortChange: (sort: "price-asc" | "price-desc" | "name-asc" | "name-desc") => void
  onSearchChange: (search: string | undefined) => void
  onClearFilters: () => void
  showBrandFilter?: boolean
  children?: React.ReactNode
}

export function ShopFiltersBar({
  brands,
  selectedBrands,
  selectedFieldType,
  selectedSort,
  searchQuery,
  onBrandsChange,
  onFieldTypeChange,
  onSortChange,
  onSearchChange,
  onClearFilters,
  showBrandFilter = true,
  children,
}: ShopFiltersBarProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [searchInput, setSearchInput] = useState(searchQuery || "")

  const [pendingBrands, setPendingBrands] = useState<string[]>(selectedBrands)
  const [pendingFieldType, setPendingFieldType] = useState<FieldType | undefined>(selectedFieldType)
  const [pendingSort, setPendingSort] = useState(selectedSort)

  useEffect(() => {
    setPendingBrands(selectedBrands)
    setPendingFieldType(selectedFieldType)
    setPendingSort(selectedSort)
  }, [selectedBrands, selectedFieldType, selectedSort])

  const hasActiveFilters = selectedBrands.length > 0 || selectedFieldType

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearchChange(searchInput || undefined)
  }

  const handleBrandToggle = (brand: string) => {
    if (pendingBrands.includes(brand)) {
      setPendingBrands(pendingBrands.filter((b) => b !== brand))
    } else {
      setPendingBrands([...pendingBrands, brand])
    }
  }

  const handleApplyFilters = () => {
    onBrandsChange(pendingBrands)
    onFieldTypeChange(pendingFieldType)
    onSortChange(pendingSort as "price-asc" | "price-desc" | "name-asc" | "name-desc")
    setIsFiltersOpen(false)
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFiltersOpen) {
        setIsFiltersOpen(false)
        // Reset pending state
        setPendingBrands(selectedBrands)
        setPendingFieldType(selectedFieldType)
        setPendingSort(selectedSort)
      }
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [isFiltersOpen, selectedBrands, selectedFieldType, selectedSort])

  const FiltersSidebar = () => (
    <div className="space-y-6">
      {/* Field Type */}
      <div>
        <Label className="text-sm font-semibold mb-3 block">Tipo de campo</Label>
        <div className="space-y-2">
          <button
            onClick={() => setPendingFieldType(undefined)}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              !pendingFieldType ? "bg-accent text-accent-foreground" : "hover:bg-muted"
            }`}
          >
            Todos los campos
          </button>
          <button
            onClick={() => setPendingFieldType("interior")}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              pendingFieldType === "interior" ? "bg-accent text-accent-foreground" : "hover:bg-muted"
            }`}
          >
            Interior
          </button>
          <button
            onClick={() => setPendingFieldType("exterior")}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              pendingFieldType === "exterior" ? "bg-accent text-accent-foreground" : "hover:bg-muted"
            }`}
          >
            Exterior
          </button>
        </div>
      </div>

      {showBrandFilter && (
        <div>
          <Label className="text-sm font-semibold mb-3 block">Marcas</Label>
          <div className="space-y-2">
            {brands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${brand}`}
                  checked={pendingBrands.includes(brand)}
                  onCheckedChange={() => handleBrandToggle(brand)}
                />
                <label
                  htmlFor={`brand-${brand}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {brand}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sort */}
      <div>
          <Label className="text-sm font-semibold mb-3 block">Ordenar por</Label>
        <div className="space-y-2">
          <button
            onClick={() => setPendingSort("name-asc")}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              pendingSort === "name-asc" ? "bg-accent text-accent-foreground" : "hover:bg-muted"
            }`}
          >
            Nombre (A-Z)
          </button>
          <button
            onClick={() => setPendingSort("name-desc")}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              pendingSort === "name-desc" ? "bg-accent text-accent-foreground" : "hover:bg-muted"
            }`}
          >
            Nombre (Z-A)
          </button>
          <button
            onClick={() => setPendingSort("price-asc")}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              pendingSort === "price-asc" ? "bg-accent text-accent-foreground" : "hover:bg-muted"
            }`}
          >
            Precio (Bajo a Alto)
          </button>
          <button
            onClick={() => setPendingSort("price-desc")}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              pendingSort === "price-desc" ? "bg-accent text-accent-foreground" : "hover:bg-muted"
            }`}
          >
                Precio (Alto a Bajo)
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Button onClick={handleApplyFilters} className="w-full">
          Aplicar filtros
        </Button>
        {hasActiveFilters && (
          <Button onClick={onClearFilters} variant="outline" className="w-full bg-transparent">
            <X className="h-4 w-4 mr-2" />
            Limpiar filtros
          </Button>
        )}
      </div>
    </div>
  )

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar cleats..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-9 bg-card border-border"
          />
        </form>

        {/* Filter Toggle Button */}
        <Button
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          variant="outline"
          className="bg-card border-border justify-between sm:w-auto"
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Filtros
          </span>
          {hasActiveFilters && (
            <span className="bg-accent text-accent-foreground text-xs px-2 py-0.5 rounded-full ml-2">Activo</span>
          )}
        </Button>
      </div>

      <div className="hidden md:flex gap-6">
        {/* Filters Sidebar */}
        {isFiltersOpen && (
          <div className="w-64 flex-shrink-0">
            <div className="bg-card border border-border rounded-lg p-6">
              <FiltersSidebar />
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="flex-1 min-w-0">{children}</div>
      </div>

      <div className="md:hidden">{children}</div>

      {/* Mobile Filters Modal */}
      {isFiltersOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => {
              setIsFiltersOpen(false)
              setPendingBrands(selectedBrands)
              setPendingFieldType(selectedFieldType)
              setPendingSort(selectedSort)
            }}
          />

          {/* Modal Content */}
          <div className="relative w-full max-w-lg bg-card border border-border rounded-t-2xl sm:rounded-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Filtros</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setIsFiltersOpen(false)
                  setPendingBrands(selectedBrands)
                  setPendingFieldType(selectedFieldType)
                  setPendingSort(selectedSort)
                }}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <FiltersSidebar />
          </div>
        </div>
      )}
    </>
  )
}
