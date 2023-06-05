import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { ICardLabel } from './card.interface';

export type CardDocument = HydratedDocument<Card>;

@Schema({ timestamps: true })
export class Card {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  description?: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: false, default: [] })
  labels?: ICardLabel[];

  @Prop({ required: false })
  dueDate?: Date;

  @Prop({ required: false })
  startDate?: Date;

  @Prop({ require: false, type: MongooseSchema.Types.ObjectId, ref: 'Users' })
  assignee?: Types.ObjectId;

  @Prop({ require: false, type: MongooseSchema.Types.ObjectId, ref: 'Users' })
  reviewer?: Types.ObjectId;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Users' })
  owner: Types.ObjectId;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Project' })
  project: Types.ObjectId;

  @Prop({ require: true })
  points?: number;
}

export const CardSchema = SchemaFactory.createForClass(Card);
