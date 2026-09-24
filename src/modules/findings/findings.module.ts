import { Module } from '@nestjs/common';
import { FindingsService } from './findings.service';
import { FindingsController } from './findings.controller';

@Module({
  controllers: [FindingsController],
  providers: [FindingsService],
})
export class FindingsModule {}
