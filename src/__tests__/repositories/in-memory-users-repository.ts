import { UsersRepository } from '@/repositories/user-repository'
import type { Prisma, User } from '@prisma/client'
import { randomUUID } from 'crypto'

export class InMemoryUsersRepository extends UsersRepository {
  public itens: User[] = []

  async create(user: Prisma.UserUncheckedCreateInput): Promise<void> {
    this.itens.push({
      id: randomUUID(),
      name: user.name,
      email: user.email,
      password_hash: user.password_hash,
      cartId: null,
      createdAt: new Date(),
      updatedAt: null,
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.itens.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }
}
