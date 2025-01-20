import { ZodValidationPipe } from '@/pipes/zod-validation.pipe'
import { FetchProductsUseCase } from '@/usecases/fetch-products-usecase'
import { Controller, Get, Query } from '@nestjs/common'

import { z } from 'zod'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/products')
export class FetchProductsController {
  constructor(private fetchProductsUseCase: FetchProductsUseCase) {}

  @Get()
  async handler(
    @Query('page', queryValidationPipe) page: PageQueryParamSchema,
  ) {
    const result = await this.fetchProductsUseCase.execute({
      page,
    })

    return { products: result.products }
  }
}
