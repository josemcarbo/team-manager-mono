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
  assignee?: string;

  @ApiProperty({
    format: 'mongoid',
  })
  @IsMongoId()
  @IsOptional()
  reviewer?: string;

  @ApiProperty()
  points: number;

  @IsMongoId()
  board: string;

  @ApiProperty()
  owner: string;
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
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  status?: string;

  @ApiProperty({
    format: 'mongoid',
  })
  @IsMongoId()
  @IsOptional()
  assignees?: string;

  @ApiProperty({
    format: 'mongoid',
  })
  @IsMongoId()
  @IsOptional()
  reviewer?: string;

  @ApiProperty({
    format: 'mongoid',
  })
  @IsMongoId()
  @IsOptional()
  board?: string;
}
