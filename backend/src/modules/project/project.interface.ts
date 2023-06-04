import { ObjectId } from 'mongoose';

export interface IProjectLabel {
  text: string;
  color: string;
}

export interface IProject {
  id?: ObjectId;
  name: string;
  description?: string;
  list?: string[];
  labels?: IProjectLabel[];
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
