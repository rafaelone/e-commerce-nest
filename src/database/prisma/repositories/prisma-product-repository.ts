import { PrismaService } from '@/database/prisma.service'
import { ProductRepository } from '@/repositories/product-repository'

import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private prisma: PrismaService) {}

  async create(product: Prisma.ProductUncheckedCreateInput): Promise<void> {
    await this.prisma.product.create({ data: product })
  }
}
