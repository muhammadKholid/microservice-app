import { PartialType } from '@nestjs/mapped-types';
import { CreateOrdermDto } from './create-orderm.dto';

export class UpdateOrdermDto extends PartialType(CreateOrdermDto) {}
