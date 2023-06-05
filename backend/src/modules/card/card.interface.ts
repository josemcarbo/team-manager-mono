import { ObjectId } from 'mongoose';

export interface ICardLabel {
  text: string;
  color: string;
}

export interface ICard {
  id?: ObjectId;
  name: string;
  description?: string;
  status: string;
  labels?: ICardLabel[];
  dueDate?: Date;
  startDate?: Date;
  assignee?: ObjectId;
  reviewer?: ObjectId;
  points: number;
  owner: ObjectId;
}

export interface ICardFindParam {
  status?: string;
  assignees?: ObjectId;
  reviewer?: ObjectId;
  owner?: ObjectId;
}
