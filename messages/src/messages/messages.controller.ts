import { Controller, Get, Post } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
  @Get()
  getMessages(): void {
    console.log('Getting all messages!');
  }

  @Get('/:id')
  getMessage(): void {
    console.log('Getting message');
  }

  @Post()
  createMessage(): void {
    console.log('Message created');
  }
}
