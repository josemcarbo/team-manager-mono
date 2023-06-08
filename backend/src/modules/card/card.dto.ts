import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ICardLabel } from './card.interface';

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

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  labels?: ICardLabel[];

  @ApiProperty({ required: false })
  @IsDate()
  @IsOptional()
  dueDate?: Date;

  @ApiProperty({ required: false })
  @IsDate()
  @IsOptional()
  startDate?: Date;

  @ApiProperty({
    format: 'mongoid',
    required: false,
  })
  @IsMongoId()
  @IsOptional()
  assignee?: string;

  @ApiProperty({
    format: 'mongoid',
    required: false,
  })
  @IsMongoId()
  @IsOptional()
  reviewer?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  points?: number;

  @ApiProperty({
    format: 'mongoid',
    required: true,
  })
  @IsMongoId()
  board: string;
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

export class CardFindAllParameters {
  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  status?: string;

  @ApiProperty({
    format: 'mongoid',
    required: false,
  })
  @IsMongoId()
  @IsOptional()
  assignees?: string;

  @ApiProperty({
    format: 'mongoid',
    required: false,
  })
  @IsMongoId()
  @IsOptional()
  reviewer?: string;

  @ApiProperty({
    format: 'mongoid',
    required: false,
  })
  @IsMongoId()
  @IsOptional()
  board?: string;
}
