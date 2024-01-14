import { Injectable } from '@nestjs/common';

import { readFile, writeFile } from 'fs/promises';

const SOURCE_FILE = 'messages.json';

@Injectable()
export class MessagesRepository {
  async findOne(id: string) {
    const contents = await readFile(SOURCE_FILE, 'utf-8');
    const messages = JSON.parse(contents);

    return messages[id];
  }

  async findAll() {
    const contents = await readFile(SOURCE_FILE, 'utf-8');
    const messages = JSON.parse(contents);

    return messages;
  }

  async create(content: string) {
    const contents = await readFile(SOURCE_FILE, 'utf-8');
    const messages = JSON.parse(contents);
    const id = Math.floor(Math.random() * 999);

    messages[id] = { id, content };

    await writeFile(SOURCE_FILE, JSON.stringify(messages));
  }
}
