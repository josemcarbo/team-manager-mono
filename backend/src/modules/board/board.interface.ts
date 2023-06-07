import { ObjectId } from 'mongoose';

export interface IBoardLabel {
  text: string;
  color: string;
}

export interface IBoard {
  id?: ObjectId;
  name: string;
  description?: string;
  list?: string[];
  labels?: IBoardLabel[];
  owner: ObjectId;
  members?: ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IBoardFindParam {
  name?: string;
  description?: string;
  owner?: ObjectId;
}
