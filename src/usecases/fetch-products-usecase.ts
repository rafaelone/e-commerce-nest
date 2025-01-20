import { ProductRepository } from '@/repositories/product-repository'
import { Injectable } from '@nestjs/common'
import { Product } from '@prisma/client'

interface FetchProductsUseCaseRequest {
  page: number
}

interface FetchProductsUseCaseResponse {
  products: Product[]
}

@Injectable()
export class FetchProductsUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    page,
  }: FetchProductsUseCaseRequest): Promise<FetchProductsUseCaseResponse> {
    const products = await this.productRepository.findMany({ page })

    return { products }
  }
}
