import { Controller, Get } from '@nestjs/common';

@Controller('/api')
export class AppController {

  @Get('/hello')
  getHelloRoute(): string {
    return 'Hello there!';
  }

  @Get('/thank-you')
  getThankYou(): string {
    return `<h1>Thank you!</h1>`;
  }
}
