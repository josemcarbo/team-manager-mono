import { Injectable, NotFoundException } from '@nestjs/common';
import { EncryptService } from '../shared/encrypt/encrypt.service';
import { IUser } from './users.interface';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly encryptService: EncryptService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async signUp(user: IUser): Promise<IUser> {
    user.password = await this.encryptService.encrypt(user.password);
    return this.usersRepository.signup(user);
  }

  async findOne(id: string): Promise<IUser> {
    const user = await this.usersRepository.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findOneByEmail(email: string): Promise<IUser> {
    const user = await this.usersRepository.findOneByEmail(email);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async find(): Promise<IUser[]> {
    return this.usersRepository.find();
  }
}
