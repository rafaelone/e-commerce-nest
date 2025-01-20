import { InMemoryUsersRepository } from '@/__tests__/repositories/in-memory-users-repository'

import { makeUser } from '@/__tests__/factories/make-user'
import { ConflictException } from '@nestjs/common'
import { CreateUserUseCase } from '@/usecases/create-user-usecase'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: CreateUserUseCase

describe('Create User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new CreateUserUseCase(inMemoryUsersRepository)
  })

  it('should be able to create a new user', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
    })

    expect(inMemoryUsersRepository.itens).toEqual([
      expect.objectContaining({
        name: 'John Doe',
        email: 'johndoe@example.com',
      }),
    ])
  })

  it('should not be able to create a new user with same email', async () => {
    const user = makeUser({
      email: 'johndoe@example.com',
    })

    await inMemoryUsersRepository.create(user)

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password_hash: '123456',
      }),
    ).rejects.toBeInstanceOf(ConflictException)
  })
})
