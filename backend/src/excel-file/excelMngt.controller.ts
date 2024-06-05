import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, basename, join } from 'path';
import { ExcelMngService } from './excel-mng.service';
import { Response } from 'express';

@Controller('excelMng')
export class ExcelMngController {
  constructor(private readonly excelMngService: ExcelMngService) { }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './storage',
        filename: (req, file, callback) => {
          // Generate a unique filename with a timestamp
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    // Handle the uploaded file, e.g., return file info
    return {
      filename: basename(file.filename),
    };
  }

  @Get(':filename')
  async getFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(__dirname, '..', '..', 'storage', filename);
    return res.sendFile(filePath);
  }
}
