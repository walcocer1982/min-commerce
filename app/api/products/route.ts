import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { CreateProductSchema } from "@/lib/validations/product"
import { ZodError } from "zod"

export async function GET() {
    try {
        console.log('API GET /api/products llamada');
        
        // Obtener todos los productos
        console.log('Obteniendo todos los productos');
        const products = await prisma.product.findMany()
        console.log(`Encontrados ${products.length} productos`);
        return NextResponse.json(products)
    } catch (error) {
        console.error('Error al obtener productos:', error)
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        )
    }
}

export async function POST(request: Request) {
    try {
        // Extraer datos de la solicitud
        const body = await request.json()
        
        // Validar los datos con Zod
        const validatedData = CreateProductSchema.parse(body)
        
        // Crear el producto en la base de datos
        const newProduct = await prisma.product.create({
            data: validatedData,
        })
        
        // Devolver respuesta con el nuevo producto
        return NextResponse.json(newProduct, { status: 201 })
    } catch (error) {
        // Manejar errores de validación de Zod
        if (error instanceof ZodError) {
            return NextResponse.json(
                { 
                    error: "Error de validación", 
                    details: error.errors 
                },
                { status: 400 }
            )
        }
        
        // Manejar otros errores
        console.error('Error al crear producto:', error)
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        )
    }
}