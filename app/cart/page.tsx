"use client";

import React from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ShoppingCartPage() {
  const { items, removeItem, updateQuantity, getTotal } = useCart();

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-3xl font-bold">Tu Carrito</h1>
        <Badge variant="destructive">Archivo page.tsx del carrito</Badge>
      </div>
      
      {items.length === 0 ? (
        <Card className="text-center py-8">
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center">
                <ShoppingCart className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Tu carrito está vacío</h3>
              <p className="text-muted-foreground">No has añadido ningún producto a tu carrito todavía.</p>
            </div>
          </CardContent>
          <CardFooter className="justify-center">
            <Button asChild>
              <Link href="/">Continuar Comprando</Link>
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Imagen</TableHead>
                    <TableHead>Producto</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.product.id}>
                      <TableCell>
                        <div className="relative h-16 w-16 rounded-md overflow-hidden" style={{ minHeight: '64px' }}>
                          <Image 
                            src={item.product.imageUrl} 
                            alt={item.product.title}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{item.product.title}</p>
                          <p className="text-xs text-muted-foreground">{item.product.category}</p>
                        </div>
                      </TableCell>
                      <TableCell>${item.product.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removeItem(item.product.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${getTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Envío</span>
                    <span>Gratis</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${getTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={() => alert('Implementar proceso de pago')}
                >
                  Proceder al Pago
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Tienes preguntas?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Si tienes alguna pregunta sobre tu pedido o sobre nuestros productos, no dudes en contactarnos.
                </p>
                <p className="text-sm text-muted-foreground">
                  Nuestro servicio de atención al cliente está disponible 24/7.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Contactar Soporte
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
} 