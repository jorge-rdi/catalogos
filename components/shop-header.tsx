interface ShopHeaderProps {
  title: string
  total: number
}

export function ShopHeader({ title, total }: ShopHeaderProps) {
  return (
    <div className="text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
      <p className="text-muted-foreground">
        {total} {total === 1 ? "producto" : "productos"} encontrado
      </p>
    </div>
  )
}
