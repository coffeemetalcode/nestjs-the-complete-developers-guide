import { Controller, Get } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
  @Get('/messages')
  getMessages(): string {
    return 'Messages route works!';
  }
}
