import ProductCard from '../components/ProductCard';
import { products } from '../models/product';

export default function HomePage() {
    return (
        <article className="p-12">
            <h1 className="text-4xl font-bold mb-8">Min-Commerce</h1>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {products && products.length > 0 && products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </section>
        </article>
    );
}