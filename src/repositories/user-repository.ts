import type { Prisma, User } from '@prisma/client'

export abstract class UsersRepository {
  abstract create(user: Prisma.UserUncheckedCreateInput): Promise<void>
  abstract findByEmail(email: string): Promise<User | null>
}
