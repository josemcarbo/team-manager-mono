import { Injectable, NotFoundException } from '@nestjs/common';
import { IBoard, IBoardFindParam, IBoardLabel } from './board.interface';
import { BoardRepository } from './board.repository';

@Injectable()
export class BoardService {
  constructor(private readonly boardRepository: BoardRepository) {}

  async find(params: IBoardFindParam): Promise<IBoard[]> {
    return this.boardRepository.find(params);
  }

  async findOne(id: string): Promise<IBoard> {
    const board = await this.boardRepository.findOne(id);
    if (!board) throw new NotFoundException('Board not found');
    return board;
  }

  async create(board: IBoard): Promise<IBoard> {
    return this.boardRepository.create(board);
  }

  async addNewLabel(id: string, labels: IBoardLabel[]): Promise<IBoard> {
    const board = await this.boardRepository.addNewLabel(id, labels);
    if (!board) throw new NotFoundException('Board not found');
    return board;
  }

  async addNewList(id: string, list: string): Promise<IBoard> {
    const board = await this.boardRepository.addNewList(id, list);
    if (!board) throw new NotFoundException('Board not found');
    return board;
  }
}
