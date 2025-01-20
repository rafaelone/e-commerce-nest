import { PrismaService } from '@/database/prisma.service'
import { UsersRepository } from '@/repositories/user-repository'
import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'

@Injectable()
export class PrismaUserRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<void> {
    await this.prisma.user.create({ data: user })
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } })

    if (!user) {
      return null
    }

    return user
  }
}
