import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as fs from 'fs';
import * as path from 'path';
import { ExcelMngController } from './excelMngt.controller';
import { ExcelMngService } from './excel-mng.service';

describe('ExcelMngController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ExcelMngController],
      providers: [ExcelMngService],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('should upload a file successfully', async () => {
    const filePath = path.join(__dirname, 'test-files', 'test.xlsx');
    const response = await request(app.getHttpServer())
      .post('/excelMng/upload')
      .attach('file', filePath);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('filename');
    // Optionally, you can check if the file exists in the upload directory
    const uploadedFilePath = path.join(
      __dirname,
      '..',
      '..',
      'storage',
      response.body.filename,
    );
    expect(fs.existsSync(uploadedFilePath)).toBe(true);

    // Clean up the uploaded file after the test
    fs.unlinkSync(uploadedFilePath);
  });

  it('/GET files/:filename (fetch file)', async () => {
    const testFileName = 'test.xlsx';
    const filePath = path.join(__dirname, '..', '..', 'storage', testFileName);
    fs.writeFileSync(filePath, 'This is a test file for fetching');

    const response = await request(app.getHttpServer()).get(
      `/excelMng/${testFileName}`,
    );

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toBe(
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );

    // Clean up
    fs.unlinkSync(filePath);
  });
});
