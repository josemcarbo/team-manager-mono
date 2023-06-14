import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ICardLabel } from './card.interface';
import { BadRequestException, PipeTransform } from '@nestjs/common';

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
  @IsString()
  @IsOptional()
  dueDate?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  startDate?: string;

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
  @IsOptional()
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

export class CardUpdateRequestDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  status?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  labels?: ICardLabel[];

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  dueDate?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  startDate?: string;

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
  @IsOptional()
  point?: number;
}

export class CardUpdateValidator implements PipeTransform {
  transform(entity: CardUpdateRequestDto): any {
    const regExp = new RegExp(
      /[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3}Z/,
    );

    if (entity.startDate && !regExp.test(entity.startDate))
      throw new BadRequestException(['property statDate is not valid']);

    if (entity.startDate && !entity.dueDate)
      throw new BadRequestException(['dueDate property must be defined']);

    if (entity.dueDate && !regExp.test(entity.dueDate))
      throw new BadRequestException(['property dueDate is not valid']);

    if (entity.startDate > entity.dueDate)
      throw new BadRequestException(['property startDate is after dueDate']);

    return entity;
  }
}
