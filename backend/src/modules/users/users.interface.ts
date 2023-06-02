import { ObjectId } from 'mongoose';

export enum ERole {
  ADMIN = 'admin',
  USER = 'user',
}

export interface IUser {
  id?: ObjectId;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  roles?: ERole[];
  createdAt?: Date;
  updatedAt?: Date;
}
