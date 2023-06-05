import { Injectable, NotFoundException } from '@nestjs/common';
import { ICard, ICardFindParam, ICardLabel } from './card.interface';
import { CardRepository } from './card.repository';

@Injectable()
export class CardService {
  constructor(private readonly cardRepository: CardRepository) {}

  async find(params: ICardFindParam): Promise<ICard[]> {
    return this.cardRepository.find(params);
  }

  async findOne(id: string): Promise<ICard> {
    const card = await this.cardRepository.findOne(id);
    if (!card) throw new NotFoundException('Card not found');
    return card;
  }

  async create(card: ICard): Promise<ICard> {
    return this.cardRepository.create(card);
  }

  async addNewLabel(id: string, label: ICardLabel): Promise<ICard> {
    const card = await this.cardRepository.addNewLabel(id, label);
    if (!card) throw new NotFoundException('Card not found');
    return card;
  }
}
