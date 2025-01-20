import { ZodValidationPipe } from '@/pipes/zod-validation.pipe'
import { CreateUserUseCase } from '@/usecases/create-user-usecase'
import { Body, Controller, Post } from '@nestjs/common'
import { z } from 'zod'

const createUserSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
})

type CreateUserBodySchema = z.infer<typeof createUserSchema>

@Controller('/user')
export class CreateUserController {
  constructor(private createUseCases: CreateUserUseCase) {}

  @Post()
  async handle(
    @Body(new ZodValidationPipe(createUserSchema))
    body: CreateUserBodySchema,
  ) {
    const { name, email, password } = body

    await this.createUseCases.execute({ name, email, password_hash: password })
  }
}
