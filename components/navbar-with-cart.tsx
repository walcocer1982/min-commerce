"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { UserButton } from "./UserButton";

export default function NavbarWithCart() {
  const { getItemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const itemCount = getItemCount();

  return (
    <header className="bg-card text-card-foreground shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold">TechStore</span>
            </Link>
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              <Link href="/" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground">
                Inicio
              </Link>
              <Link href="/products" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground">
                Productos
              </Link>
              <Link href="/categories" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground">
                Categorías
              </Link>
              <Link href="/deals" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground">
                Ofertas
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center">
            <Button variant="ghost" size="icon" asChild className="relative mr-4">
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 px-1.5 py-0.5 min-w-[1.25rem] text-xs" variant="destructive">
                    {itemCount}
                  </Badge>
                )}
              </Link>
            </Button>
            
            <UserButton />
            
            <div className="-mr-2 flex md:hidden ml-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
              >
                <span className="sr-only">Abrir menú</span>
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="pt-2 pb-4 space-y-1">
          <Link 
            href="/" 
            className="block px-4 py-2 text-base font-medium hover:bg-accent hover:text-accent-foreground"
            onClick={() => setMobileMenuOpen(false)}
          >
            Inicio
          </Link>
          <Link 
            href="/products" 
            className="block px-4 py-2 text-base font-medium hover:bg-accent hover:text-accent-foreground"
            onClick={() => setMobileMenuOpen(false)}
          >
            Productos
          </Link>
          <Link 
            href="/categories" 
            className="block px-4 py-2 text-base font-medium hover:bg-accent hover:text-accent-foreground"
            onClick={() => setMobileMenuOpen(false)}
          >
            Categorías
          </Link>
          <Link 
            href="/deals" 
            className="block px-4 py-2 text-base font-medium hover:bg-accent hover:text-accent-foreground"
            onClick={() => setMobileMenuOpen(false)}
          >
            Ofertas
          </Link>
        </div>
      </div>
    </header>
  );
} 