import { Prisma, type Product } from '@prisma/client'
import { PaginationParams } from './pagination-params'

export abstract class ProductRepository {
  abstract create(product: Prisma.ProductUncheckedCreateInput): Promise<void>
  abstract findMany(params: PaginationParams): Promise<Product[]>
}
