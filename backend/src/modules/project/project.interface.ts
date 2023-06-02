import { ObjectId } from 'mongoose';

export interface IProject {
  id?: ObjectId;
  name: string;
  description?: string;
  owner: ObjectId;
  members?: ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProjectFindParam {
  name?: string;
  description?: string;
  owner?: ObjectId;
}
