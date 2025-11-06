"use client"

import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { getProducts, getBrands, type FieldType, type Product } from "@/lib/products"
import { ProductGrid } from "@/components/product-grid"
import { ShopFiltersBar } from "@/components/shop-filters-bar"
import { ShopHeader } from "@/components/shop-header"
import { Pagination } from "@/components/pagination"
import { useEffect, useMemo, useState } from "react"

interface ShopContentProps {
  initialBrand?: string
  initialFieldType?: FieldType
}

export function ShopContent({ initialBrand, initialFieldType }: ShopContentProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const [products, setProducts] = useState<Product[]>([])
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [brands, setBrands] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  const brandsParam = initialBrand || searchParams.get("brands") || undefined
  const selectedBrands = useMemo(() => (brandsParam ? brandsParam.split(",") : []), [brandsParam])
  const selectedBrandsKey = selectedBrands.join(",")

  const fieldType = (initialFieldType || searchParams.get("fieldType") || undefined) as FieldType | undefined
  const search = searchParams.get("search") || undefined
  const sortBy = (searchParams.get("sortBy") || "name-asc") as "price-asc" | "price-desc" | "name-asc" | "name-desc"
  const page = Number.parseInt(searchParams.get("page") || "1")

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [page, selectedBrandsKey, fieldType, search, sortBy])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const result = await getProducts({
        brands: selectedBrands.length > 0 ? selectedBrands : undefined,
        fieldType,
        search,
        sortBy,
        page,
        perPage: 12,
      })

      setProducts(result.products)
      setTotal(result.total)
      setTotalPages(result.totalPages)
      setLoading(false)
    }

    fetchData()
  }, [selectedBrandsKey, fieldType, search, sortBy, page])

  useEffect(() => {
    const fetchBrands = async () => {
      const brandsData = await getBrands()
      setBrands(brandsData)
    }

    fetchBrands()
  }, [])

  const title = initialBrand
  ? `${initialBrand}`
  : initialFieldType
    ? initialFieldType === "interior"
      ? "Futsal y Césped Sintético"
      : "Futbol de Campo"
    : "Todos los productos"

  // Update URL when filters change
  const updateFilters = (updates: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams.toString())

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })

    // Reset to page 1 when filters change (except when changing page)
    if (!updates.page) {
      params.set("page", "1")
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 lg:px-8">
    {title !== "Todos los productos" && <ShopHeader title={title} total={total} />}

      <div className="mt-2">
        <ShopFiltersBar
          brands={brands}
          selectedBrands={selectedBrands}
          selectedFieldType={fieldType}
          selectedSort={sortBy}
          searchQuery={search}
          onBrandsChange={(brands) => updateFilters({ brands: brands.length > 0 ? brands.join(",") : undefined })}
          onFieldTypeChange={(fieldType) => updateFilters({ fieldType })}
          onSortChange={(sortBy) => updateFilters({ sortBy })}
          onSearchChange={(search) => updateFilters({ search })}
          onClearFilters={() => {
            router.push(pathname)
          }}
          showBrandFilter={!initialBrand}
        >
          <div className="space-y-6">
            <ProductGrid products={products} />

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(page) => updateFilters({ page: page.toString() })}
            />
          </div>
        </ShopFiltersBar>
      </div>
    </div>
  )
}
