import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './users.schema';
import { Model } from 'mongoose';
import { IUser } from './users.interface';
import { UsersTransformer } from './users.transformer';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(Users.name) private db: Model<Users>) {}

  async signup(user: IUser): Promise<IUser> {
    const newUser = (await this.db.create(user)).toObject();
    return UsersTransformer.toResponse(newUser);
  }

  async findOne(id: string): Promise<IUser> {
    const user = await this.db.findById(id);
    return user && UsersTransformer.toResponse(user.toObject());
  }

  async findOneByEmail(email: string): Promise<IUser> {
    const user = await this.db.findOne({ email });
    return user && UsersTransformer.toResponse(user.toObject());
  }

  async find(): Promise<IUser[]> {
    const users = await this.db.find();
    return (
      users && users.map((user) => UsersTransformer.toResponse(user.toObject()))
    );
  }
}
