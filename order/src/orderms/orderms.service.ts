import { Injectable } from '@nestjs/common';
// import { CreateOrdermDto } from './dto/create-orderm.dto';
// import { UpdateOrdermDto } from './dto/update-orderm.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Orderm } from './entities/orderm.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdermsService {
  constructor(@InjectRepository(Orderm)
  private readonly orderRepo: Repository<Orderm>
  ) { }
  async getFromKafka(data: any) {
    console.log(data);

    return data;
  }

  async create(data: any) {
    const order = await this.orderRepo.save({
      ...data,
    });

    return { success: true, data: order };

  }

  async findAll() {
    return this.orderRepo.find();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} orderm`;
  // }

  // update(id: number, updateOrdermDto: UpdateOrdermDto) {
  //   return `This action updates a #${id} orderm`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} orderm`;
  // }
}
