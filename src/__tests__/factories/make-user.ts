import { faker } from '@faker-js/faker'
import type { User } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export function makeUser(override: Partial<User> = {}) {
  const user = {
    id: randomUUID(),
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password_hash: '123456',
    cartId: null,
    createdAt: new Date(),
    updatedAt: null,
    ...override,
  }

  return user
}
