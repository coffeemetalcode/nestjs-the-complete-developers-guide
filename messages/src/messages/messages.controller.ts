import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateMessageDto } from './dto/create-message.dto';

@Controller('messages')
export class MessagesController {
  @Get()
  getMessages(): void {
    console.log('Getting all messages!');
  }

  @Get('/:id')
  getMessage(@Param('id') id: string): void {
    console.log('Getting message for id', id);
  }

  @Post()
  createMessage(@Body() body: CreateMessageDto): void {
    console.log('Message created!', '\n', body);
  }
}
