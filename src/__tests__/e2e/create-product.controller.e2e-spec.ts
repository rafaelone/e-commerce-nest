import { AppModule } from '@/app.module'
import { PrismaService } from '@/database/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Create product (E2E)', () => {
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

  test('[POST] /product', async () => {
    const response = await request(app.getHttpServer()).post('/product').send({
      name: 'PS5',
      description: '1tb',
      price: 3999.99,
      quantity: 10,
    })

    expect(response.statusCode).toBe(201)

    const productOnDatabase = await prisma.product.findMany({
      where: {
        name: 'PS5',
      },
    })

    expect(productOnDatabase).toBeTruthy()
  })
})
