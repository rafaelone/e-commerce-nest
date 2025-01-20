import { InMemoryProductsRepository } from '../repositories/in-memory-products-repository'
import { CreateProductUseCase } from '@/usecases/create-product-usecase'

let inMemoryProductsRepository: InMemoryProductsRepository
let sut: CreateProductUseCase

describe('Create User', () => {
  beforeEach(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository()
    sut = new CreateProductUseCase(inMemoryProductsRepository)
  })

  it('should be able to create a product', async () => {
    await sut.execute({
      name: 'Playstation 5',
      description: '1tb, two crontrolls',
      price: 3998.99,
      quantity: 5,
    })

    expect(inMemoryProductsRepository.itens).toEqual([
      expect.objectContaining({
        name: 'Playstation 5',
        description: '1tb, two crontrolls',
      }),
    ])

    expect(inMemoryProductsRepository.itens[0].id).toEqual(expect.any(String))
  })
})
