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

  async addNewLabel(id: string, labels: ICardLabel[]): Promise<ICard> {
    const card = await this.findOne(id);

    if (!card) throw new NotFoundException('Card not found');

    const board = await this.boardService.findOne(card.board).catch(() => {
      throw new BadRequestException('Board not found');
    });

    const [cardUpdated] = await Promise.all([
      this.cardRepository.addNewLabel(id, labels),
      this.boardService.addNewLabel(board.id, labels),
    ]);

    return cardUpdated;
  }

  async delete(id: string): Promise<ICard> {
    return this.cardRepository.delete(id);
  }

  async removeLabel(id: string, labels: ICardLabel[]): Promise<ICard> {
    return this.cardRepository.removeLabel(id, labels);
  }

  async update(id: string, card: Partial<ICard>): Promise<ICard> {
    return this.cardRepository.update(id, card);
  }
}
