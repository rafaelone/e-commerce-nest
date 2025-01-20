import { CreateProductController } from '@/controller/create-product.controller'
import { CreateUserController } from '@/controller/create-user.controller'
import { FetchProductsController } from '@/controller/fetch-product.controller'
import { DatabaseModule } from '@/database/database.module'
import { CreateProductUseCase } from '@/usecases/create-product-usecase'
import { CreateUserUseCase } from '@/usecases/create-user-usecase'
import { FetchProductsUseCase } from '@/usecases/fetch-products-usecase'

import { Module } from '@nestjs/common'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateUserController,
    CreateProductController,
    FetchProductsController,
  ],
  providers: [CreateUserUseCase, CreateProductUseCase, FetchProductsUseCase],
})
export class HttpModule {}
