import { Controller } from '@nestjs/common';
import { ChecklistService } from './checklist.service';

@Controller('checklist')
export class ChecklistController {
  constructor(private readonly checklistService: ChecklistService) {}
}
