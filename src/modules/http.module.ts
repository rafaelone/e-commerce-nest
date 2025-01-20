import { CreateUserController } from '@/controller/create-user.controller'
import { DatabaseModule } from '@/database/database.module'
import { CreateUserUseCase } from '@/usecases/create-user-usecase'
import { Module } from '@nestjs/common'

@Module({
  imports: [DatabaseModule],
  controllers: [CreateUserController],
  providers: [CreateUserUseCase],
})
export class HttpModule {}
