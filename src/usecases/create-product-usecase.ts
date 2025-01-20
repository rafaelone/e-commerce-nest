import { ProductRepository } from '@/repositories/product-repository'
import { Injectable } from '@nestjs/common'

interface CreateProductUseCaseRequest {
  name: string
  description: string
  price: number
  quantity: number
}

interface CreateProductUseCaseResponse {}

@Injectable()
export class CreateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    name,
    description,
    price,
    quantity,
  }: CreateProductUseCaseRequest): Promise<CreateProductUseCaseResponse> {
    await this.productRepository.create({ name, description, price, quantity })
    return {}
  }
}
