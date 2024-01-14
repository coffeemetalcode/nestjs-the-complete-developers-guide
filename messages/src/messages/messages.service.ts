import { Injectable } from '@nestjs/common';

import { MessagesRepository } from './messages.repository';

@Injectable()
export class MessagesService {
  constructor(private _messages: MessagesRepository) {}

  findOne(id: string) {
    return this._messages.findOne(id);
  }

  findAll() {
    return this._messages.findAll();
  }

  create(content) {
    return this._messages.create(content);
  }
}
