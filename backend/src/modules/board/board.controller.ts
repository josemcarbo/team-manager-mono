import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import {
  BoardCreateLabelRequestDto,
  BoardCreateListRequestDto,
  BoardCreateRequestDto,
  BoardFindOneRequestDto,
  BoardFindOneResponseDto,
} from './board.dto';
import { BoardService } from './board.service';
import { IBoard } from './board.interface';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Boards')
@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: [BoardFindOneResponseDto] })
  @ApiOperation({ description: 'Find all boards by user' })
  @Get()
  find(@Req() request: any): Promise<IBoard[]> {
    const owner = request.user.id;
    return this.boardService.find({ owner });
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: BoardFindOneResponseDto })
  @ApiOperation({ description: 'Get one board' })
  @Get('/:id')
  findOne(@Param() { id }: BoardFindOneRequestDto): Promise<IBoard> {
    return this.boardService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: BoardFindOneResponseDto })
  @ApiOperation({ description: 'Create a board' })
  @Post()
  create(
    @Body() board: BoardCreateRequestDto,
    @Req() request: any,
  ): Promise<IBoard> {
    const owner = request.user.id;
    return this.boardService.create({ ...board, owner });
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: BoardFindOneResponseDto })
  @ApiOperation({ description: 'Add a board list' })
  @Post('/:id/list')
  createList(
    @Body() { list }: BoardCreateListRequestDto,
    @Param() { id }: BoardFindOneRequestDto,
  ): Promise<IBoard> {
    return this.boardService.addNewList(id, list);
  }
}
