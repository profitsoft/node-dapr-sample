import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { AppController } from "../src/app.controller";

describe("AppModule (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should respond with "Hello World!" on GET /ping', () => {
    return request(app.getHttpServer())
      .get("/ping")
      .expect(200)
      .expect("Hello World!");
  });
});
