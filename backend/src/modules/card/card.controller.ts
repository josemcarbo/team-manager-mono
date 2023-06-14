import {
  Body,
  Controller,
  Get,
  Query,
  Param,
  Post,
  Req,
  Delete,
  Patch,
} from '@nestjs/common';
import {
  CardCreateLabelRequestDto,
  CardCreateRequestDto,
  CardFindAllParameters,
  CardFindOneRequestDto,
  CardFindOneResponseDto,
  CardUpdateRequestDto,
  CardUpdateValidator,
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
  find(
    @Query() params: CardFindAllParameters,
    @Req() request: any,
  ): Promise<ICard[]> {
    const owner = request.user.id;
    return this.cardService.find({ ...params, owner });
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
    @Body() labels: CardCreateLabelRequestDto[],
    @Param() { id }: CardFindOneRequestDto,
  ): Promise<ICard> {
    return this.cardService.addNewLabel(id, labels);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: CardFindOneResponseDto })
  @ApiOperation({ description: 'Remove a card' })
  @Delete('/:id')
  delete(@Param() { id }: CardFindOneRequestDto): Promise<ICard> {
    return this.cardService.delete(id);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: CardFindOneResponseDto })
  @ApiOperation({ description: 'Remove a card label' })
  @Patch('/:id/label')
  deleteLabel(
    @Param() { id }: CardFindOneRequestDto,
    @Body() labels: CardCreateLabelRequestDto[],
  ): Promise<ICard> {
    return this.cardService.removeLabel(id, labels);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: CardFindOneResponseDto })
  @ApiOperation({ description: 'Update a card label' })
  @Patch('/:id')
  update(
    @Param() { id }: CardFindOneRequestDto,
    @Body(CardUpdateValidator) card: CardUpdateRequestDto,
  ): Promise<ICard> {
    return this.cardService.update(id, card);
  }
}
