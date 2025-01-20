import { faker } from '@faker-js/faker'
import { Product } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export function makeProduct(override: Partial<Product> = {}) {
  const product = {
    id: randomUUID(),
    name: faker.person.firstName(),
    description: faker.food.description,
    price: faker.number.float(),
    quantity: faker.number.int(),
    cartId: null,
    createdAt: new Date(),
    updatedAt: null,
    ...override,
  }

  return product
}
