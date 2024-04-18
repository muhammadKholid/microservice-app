import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdermsService } from './orderms.service';
import { CreateOrdermDto } from './dto/create-orderm.dto';
// import { UpdateOrdermDto } from './dto/update-orderm.dto';
import { ProducerService } from 'src/kafka/producer.service';

@Controller('orderms')
export class OrdermsController {
  constructor(
    private readonly ordermsService: OrdermsService,
    private readonly producerService: ProducerService
  ) { }

  @Post()
  async create(@Body() createOrdermDto: CreateOrdermDto) {
    const order = await this.ordermsService.create(createOrdermDto);
    this.producerService.produce(
      'order-topic',
      { value: JSON.stringify(order) }
    );
    return order;
  }

  @Get()
  async findAll() {
    return this.ordermsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.ordermsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOrdermDto: UpdateOrdermDto) {
  //   return this.ordermsService.update(+id, updateOrdermDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.ordermsService.remove(+id);
  // }
}
