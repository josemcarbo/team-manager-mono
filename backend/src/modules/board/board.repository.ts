import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Board } from './board.schema';
import { Model } from 'mongoose';
import { IBoard, IBoardFindParam, IBoardLabel } from './board.interface';
import { BoardTransformer } from './board.transformer';

@Injectable()
export class BoardRepository {
  constructor(@InjectModel(Board.name) private db: Model<Board>) {}

  async find(params: IBoardFindParam): Promise<IBoard[]> {
    const boards = await this.db.find(params);
    return (
      boards &&
      boards.map((board) => BoardTransformer.toResponse(board.toObject()))
    );
  }

  async findOne(id: string): Promise<IBoard> {
    // TODO: const board = await this.db.findById(id).lean().populate('owner');
    const board = await this.db.findById(id);
    return board && BoardTransformer.toResponse(board.toObject());
  }

  async create(board: IBoard): Promise<IBoard> {
    const newBoard = (await this.db.create(board)).toObject();
    return BoardTransformer.toResponse(newBoard);
  }

  async update(id: string, board: any): Promise<IBoard> {
    return this.db.updateOne({ _id: id }, board).lean();
  }

  async addNewLabel(id: string, label: IBoardLabel): Promise<IBoard> {
    await this.update(id, {
      $push: {
        labels: label,
      },
    });
    return this.findOne(id);
  }
  async addNewList(id: string, item: string): Promise<IBoard> {
    return this.db.findByIdAndUpdate(id, { $push: { list: item } });
  }
}
