import { MessagesRepository } from './messages.repository';

export class MessagesService {
  messages: MessagesRepository;

  constructor() {
    // DON'T DO THIS IN REAL APPS
    // USE DEPENDENCY INJECTION INSTEAD
    this.messages = new MessagesRepository();
  }

  findOne(id: string) {
    return this.messages.findOne(id);
  }

  findAll() {
    return this.messages.findAll();
  }

  create(content) {
    return this.messages.create(content);
  }
}
