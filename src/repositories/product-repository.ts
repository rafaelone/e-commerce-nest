import { Prisma } from '@prisma/client'

export abstract class ProductRepository {
  abstract create(product: Prisma.ProductUncheckedCreateInput): Promise<void>
}
