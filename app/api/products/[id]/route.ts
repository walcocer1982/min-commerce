import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ProductIdSchema, UpdateProductSchema } from "@/lib/validations/product";
import { ZodError } from "zod";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Validar ID con Zod
    const { id } = ProductIdSchema.parse(params);

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: "Error de validación",
          details: error.errors,
        },
        { status: 400 }
      );
    }

    console.error("Error al obtener producto:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = ProductIdSchema.parse(params);
    const body = await request.json();
    const validatedData = UpdateProductSchema.parse(body);

    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      );
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: "Error de validación",
          details: error.errors,
        },
        { status: 400 }
      );
    }

    console.error("Error al actualizar producto:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = ProductIdSchema.parse(params);

    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      );
    }

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Producto eliminado correctamente" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: "Error de validación",
          details: error.errors,
        },
        { status: 400 }
      );
    }

    console.error("Error al eliminar producto:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
} 