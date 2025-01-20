import { FetchProductsUseCase } from '@/usecases/fetch-products-usecase'
import { InMemoryProductsRepository } from '../repositories/in-memory-products-repository'
import { makeProduct } from '../factories/make-product'

let inMemoryProductsRepository: InMemoryProductsRepository
let sut: FetchProductsUseCase

describe('Fetch Products', () => {
  beforeEach(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository()

    sut = new FetchProductsUseCase(inMemoryProductsRepository)
  })

  it('should be able to fetch products', async () => {
    await inMemoryProductsRepository.create(
      makeProduct({ createdAt: new Date(2022, 0, 20) }),
    )
    await inMemoryProductsRepository.create(
      makeProduct({ createdAt: new Date(2022, 0, 18) }),
    )
    await inMemoryProductsRepository.create(
      makeProduct({ createdAt: new Date(2022, 0, 23) }),
    )

    const result = await sut.execute({
      page: 1,
    })

    expect(result.products).toEqual([
      expect.objectContaining({ createdAt: new Date(2022, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 18) }),
    ])
  })

  it('should be able to fetch paginated recent questions', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryProductsRepository.create(makeProduct())
    }

    const result = await sut.execute({
      page: 2,
    })

    expect(result.products).toHaveLength(2)
  })
})
