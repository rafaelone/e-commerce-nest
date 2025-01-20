import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { UsersRepository } from '@/repositories/user-repository'
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository'
import { ProductRepository } from '@/repositories/product-repository'
import { PrismaProductRepository } from './prisma/repositories/prisma-product-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: ProductRepository,
      useClass: PrismaProductRepository,
    },
  ],
  exports: [PrismaService, UsersRepository, ProductRepository],
})
export class DatabaseModule {}
