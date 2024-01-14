import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';

import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private _messagesService: MessagesService) {}

  @Get()
  async getMessages() {
    return await this._messagesService.findAll();
  }

  @Get('/:id')
  async getMessage(@Param('id') id: string) {
    const message = await this._messagesService.findOne(id);

    if (!message) {
      throw new NotFoundException(`no message of id ${id} was found!`);
    }

    return message;
  }

  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    return this._messagesService.create(body);
  }
}
