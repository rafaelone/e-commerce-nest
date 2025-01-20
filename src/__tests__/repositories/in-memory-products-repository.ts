import { ProductRepository } from '@/repositories/product-repository'

import { Prisma, Product } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { randomUUID } from 'crypto'

export class InMemoryProductsRepository extends ProductRepository {
  public itens: Product[] = []

  async create(product: Prisma.ProductUncheckedCreateInput): Promise<void> {
    this.itens.push({
      id: randomUUID(),
      name: product.name,
      description: product.description,
      price: new Decimal(product.price.toString()),
      quantity: new Decimal(product.quantity.toString()),
      createdAt: new Date(),
      cartId: null,
      updatedAt: null,
    })
  }
}
