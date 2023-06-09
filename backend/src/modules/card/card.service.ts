import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ICard, ICardFindParam, ICardLabel } from './card.interface';
import { CardRepository } from './card.repository';
import { BoardService } from '../board/board.service';

@Injectable()
export class CardService {
  constructor(
    private readonly boardService: BoardService,
    private readonly cardRepository: CardRepository,
  ) {}

  async find(params: ICardFindParam): Promise<ICard[]> {
    return this.cardRepository.find(params);
  }

  async findOne(id: string): Promise<ICard> {
    const card = await this.cardRepository.findOne(id);
    if (!card) throw new NotFoundException('Card not found');
    return card;
  }

  async create(card: ICard): Promise<ICard> {
    await this.boardService.findOne(card.board).catch(() => {
      throw new BadRequestException('Board not found');
    });

    return this.cardRepository.create(card);
  }

  async addNewLabel(id: string, label: ICardLabel): Promise<ICard> {
    const card = await this.cardRepository.addNewLabel(id, label);
    if (!card) throw new NotFoundException('Card not found');
    return card;
  }

  async delete(id: string): Promise<ICard> {
    return this.cardRepository.delete(id);
  }
}
