const { PrismaClient } = require('@prisma/client')
// Importar productos de manera compatible con CommonJS
const { products } = require('./seed-data')

const prisma = new PrismaClient()

async function main() {
    console.log('Iniciando migración de datos...')

    // Limpiar datos existentes
    await prisma.orderItem.deleteMany()
    await prisma.order.deleteMany()
    await prisma.product.deleteMany()

    // Insertar productos
    for (const product of products) {
        await prisma.product.create({
            data: {
                ...product,
                stock: Math.floor(Math.random() * 100) + 1 // Stock aleatorio entre 1 y 100
            }
        })
    }

    console.log('Migración completada exitosamente')
}

main()
    .catch((e) => {
        console.error('Error durante la migración:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    }) 