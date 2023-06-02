import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';

export type ProjectDocument = HydratedDocument<Project>;

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  description?: string;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Users' })
  owner: Types.ObjectId;

  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'Users', default: [] })
  members?: Types.ObjectId[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
