import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { Test } from '@nestjs/testing'

import { PrismaService } from '@/database/prisma.service'
import { AppModule } from '@/app.module'

describe('Fetch recents questios (E2E)', () => {
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

  test('[GET] /products', async () => {
    await prisma.product.createMany({
      data: [
        {
          name: 'Playstation 5',
          description: 'Video game',
          price: 3999.99,
          quantity: 10,
        },
        {
          name: 'Xbox Series',
          description: 'Video game',
          price: 2899.99,
          quantity: 5,
        },
      ],
    })

    const response = await request(app.getHttpServer()).get('/products')

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      products: [
        expect.objectContaining({ name: 'Playstation 5' }),
        expect.objectContaining({ name: 'Xbox Series' }),
      ],
    })
  })
})
