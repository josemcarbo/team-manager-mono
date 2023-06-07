import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';
import { IBoardLabel } from './board.interface';

export class BoardFindOneRequestDto {
  @ApiProperty({
    format: 'mongoid',
  })
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}

export class BoardFindOneResponseDto {
  @ApiProperty({
    format: 'mongoid',
  })
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  list: string[];

  @ApiProperty()
  labels: IBoardLabel[];

  @ApiProperty({
    format: 'mongoid',
  })
  owner: string;

  @ApiProperty({
    type: [Types.ObjectId],
  })
  members: Types.ObjectId[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class BoardCreateRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  list?: string[];

  @ApiProperty()
  @IsArray()
  @IsOptional()
  labels?: IBoardLabel[];
}

export class BoardCreateLabelRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  color: string;
}

export class BoardCreateListRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  list: string;
}
