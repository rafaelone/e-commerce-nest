import { AppModule } from '@/app.module'
import { PrismaService } from '@/database/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Create user (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[POST] /user', async () => {
    const response = await request(app.getHttpServer()).post('/user').send({
      name: 'John Doe',
      email: 'johnDoe@example.com',
      password: '123456',
    })

    expect(response.statusCode).toBe(201)

    const userOnDatabase = await prisma.user.findUnique({
      where: {
        email: 'johnDoe@example.com',
      },
    })
    expect(userOnDatabase).toBeTruthy()
  })

  test('[POST] /user Conflict Exception', async () => {
    await request(app.getHttpServer()).post('/user').send({
      name: 'John Doe',
      email: 'johnDoe@example.com',
      password: '123456',
    })

    const response = await request(app.getHttpServer()).post('/user').send({
      name: 'John Doe',
      email: 'johnDoe@example.com',
      password: '123456',
    })
    console.log(response)
    expect(response.statusCode).toBe(409)
  })
})
