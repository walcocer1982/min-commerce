import { notFound } from "next/navigation";
import { products } from "@/lib/data/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductImage } from "@/components/ui/product-image";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      <Link href="/" className="flex items-center gap-2 mb-8 text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft size={20} />
        <span>Volver a productos</span>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-50 rounded-lg overflow-hidden h-[400px] relative">
          <ProductImage 
            src={product.imageUrl} 
            alt={product.title}
            onSale={product.onSale} 
          />
          {product.onSale && (
            <Badge className="absolute top-4 right-4 z-10" variant="destructive">
              Oferta
            </Badge>
          )}
        </div>

        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <Badge variant="outline" className="w-fit mb-4">
            {product.category}
          </Badge>
          
          <p className="text-4xl font-bold mb-6">
            ${product.price.toFixed(2)}
          </p>

          <p className="text-muted-foreground mb-8">
            {product.description}
          </p>

          <div className="mt-auto space-y-4">
            <Button className="w-full" size="lg">
              Añadir al carrito
            </Button>
            <Button variant="outline" className="w-full" size="lg">
              Comprar ahora
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Detalles del producto</h2>
        <div className="prose max-w-none">
          <p>
            Disfruta de la última tecnología con nuestro {product.title}. Diseñado para ofrecer el mejor rendimiento
            y durabilidad, este producto es perfecto para usuarios exigentes que buscan calidad superior.
          </p>
          <p>
            Características principales:
          </p>
          <ul>
            <li>Alta calidad y durabilidad</li>
            <li>Diseño moderno y elegante</li>
            <li>Tecnología de última generación</li>
            <li>Garantía de satisfacción</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 