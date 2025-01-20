import { PrismaService } from '@/database/prisma.service'
import type { PaginationParams } from '@/repositories/pagination-params'
import { ProductRepository } from '@/repositories/product-repository'

import { Injectable } from '@nestjs/common'
import { Prisma, type Product } from '@prisma/client'

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private prisma: PrismaService) {}

  async findMany({ page }: PaginationParams): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return products
  }

  async create(product: Prisma.ProductUncheckedCreateInput): Promise<void> {
    await this.prisma.product.create({ data: product })
  }
}
