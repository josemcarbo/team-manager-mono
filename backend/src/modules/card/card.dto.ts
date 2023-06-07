import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ICardLabel } from './card.interface';
import { ObjectId } from 'mongoose';

export class CardFindOneRequestDto {
  @ApiProperty({
    format: 'mongoid',
  })
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}

export class CardFindOneResponseDto {
  @ApiProperty({
    format: 'mongoid',
  })
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  labels: ICardLabel[];

  @ApiProperty()
  dueDate: Date;

  @ApiProperty()
  startDate: Date;

  @ApiProperty({
    format: 'mongoid',
  })
  assignee: string;

  @ApiProperty({
    format: 'mongoid',
  })
  reviewer: string;

  @ApiProperty({
    format: 'mongoid',
  })
  owner: string;

  @ApiProperty()
  point: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class CardCreateRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  labels?: ICardLabel[];

  @ApiProperty()
  @IsDate()
  @IsOptional()
  dueDate?: Date;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  startDate?: Date;

  @ApiProperty({
    format: 'mongoid',
  })
  @IsMongoId()
  @IsOptional()
  assignee?: ObjectId;

  @ApiProperty({
    format: 'mongoid',
  })
  @IsMongoId()
  @IsOptional()
  reviewer?: ObjectId;

  @ApiProperty()
  points: number;

  @IsMongoId()
  board: ObjectId;

  @ApiProperty()
  owner: ObjectId;
}

export class CardCreateLabelRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  color: string;
}
