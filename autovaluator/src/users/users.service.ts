import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private _repo: Repository<User>,
  ) {}

  create(email: string, password: string) {
    const user = this._repo.create({ email, password });

    this._repo.save(user);
  }

  findOne(id: number) {
    return this._repo.findOneBy({ id });
  }

  find(email: string) {
    return this._repo.find({ where: { email } });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found!`);
    }

    Object.assign(user, attrs);
    return this._repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    return this._repo.remove(user);
  }
}
