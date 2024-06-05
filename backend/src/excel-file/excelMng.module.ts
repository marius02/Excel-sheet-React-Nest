import { Module } from '@nestjs/common';
import { ExcelMngController } from './excelMngt.controller';
import { ExcelMngService } from './excel-mng.service';

@Module({
  controllers: [ExcelMngController],
  providers: [ExcelMngService],
})
export class ExcelMngModule { }
