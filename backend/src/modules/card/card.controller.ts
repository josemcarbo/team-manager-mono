import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import {
  CardCreateLabelRequestDto,
  CardCreateRequestDto,
  CardFindOneRequestDto,
  CardFindOneResponseDto,
} from './card.dto';
import { CardService } from './card.service';
import { ICard } from './card.interface';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Cards')
@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: [CardFindOneResponseDto] })
  @ApiOperation({ description: 'Find all card by board' })
  @Get()
  find(@Req() request: any): Promise<ICard[]> {
    const owner = request.user.id;
    return this.cardService.find({ owner });
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: CardFindOneResponseDto })
  @ApiOperation({ description: 'Get one card' })
  @Get('/:id')
  findOne(@Param() { id }: CardFindOneRequestDto): Promise<ICard> {
    return this.cardService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: CardFindOneResponseDto })
  @ApiOperation({ description: 'Create a card' })
  @Post()
  create(
    @Body() card: CardCreateRequestDto,
    @Req() request: any,
  ): Promise<ICard> {
    const owner = request.user.id;
    return this.cardService.create({ ...card, owner });
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: CardFindOneResponseDto })
  @ApiOperation({ description: 'Add a card label' })
  @Post('/:id/label')
  createLabel(
    @Body() label: CardCreateLabelRequestDto,
    @Param() { id }: CardFindOneRequestDto,
  ): Promise<ICard> {
    return this.cardService.addNewLabel(id, label);
  }
}
