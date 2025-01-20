import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { UsersRepository } from '@/repositories/user-repository'
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [PrismaService, UsersRepository],
})
export class DatabaseModule {}
