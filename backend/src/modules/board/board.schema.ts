import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { IBoardLabel } from './board.interface';

export type BoardDocument = HydratedDocument<Board>;

@Schema({ timestamps: true })
export class Board {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  description?: string;

  @Prop({ required: false, default: [] })
  list?: string[];

  @Prop({ required: false, default: [] })
  labels?: IBoardLabel[];

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Users' })
  owner: Types.ObjectId;

  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'Users', default: [] })
  members?: Types.ObjectId[];
}

export const BoardSchema = SchemaFactory.createForClass(Board);
