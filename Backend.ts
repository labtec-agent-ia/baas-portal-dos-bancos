// src/clients/clients.controller.ts
import { Controller, Get, Post, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly service: ClientsService) {}

  @Post()
  async create(@Body() dto: CreateClientDto) {
    const client = await this.service.create(dto);
    return { id: client.id };
  }

  @Get()
  async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const client = await this.service.findOne(id);
    if (!client) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    return client;
  }
}
