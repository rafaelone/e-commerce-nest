import { ZodValidationPipe } from '@/pipes/zod-validation.pipe'
import { CreateProductUseCase } from '@/usecases/create-product-usecase'

import { Body, Controller, Post } from '@nestjs/common'
import { z } from 'zod'

const createProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  quantity: z.number(),
})

type createProductBodySchema = z.infer<typeof createProductSchema>

@Controller('/product')
export class CreateProductController {
  constructor(private createProductUseCase: CreateProductUseCase) {}

  @Post()
  async handle(
    @Body(new ZodValidationPipe(createProductSchema))
    body: createProductBodySchema,
  ) {
    const { name, description, price, quantity } = body

    await this.createProductUseCase.execute({
      name,
      description,
      price,
      quantity,
    })
  }
}
