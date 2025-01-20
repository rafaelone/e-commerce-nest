import { UsersRepository } from '@/repositories/user-repository'
import { ConflictException, Injectable } from '@nestjs/common'

interface CreateUserUseCaseRequest {
  name: string
  email: string
  password_hash: string
}

interface CreateUserUseCaseResponse {}

@Injectable()
export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password_hash,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const findUserExists = await this.usersRepository.findByEmail(email)

    if (findUserExists) {
      throw new ConflictException(
        'User with same e-mail address already exists.',
      )
    }

    await this.usersRepository.create({ name, email, password_hash })
    return {}
  }
}
