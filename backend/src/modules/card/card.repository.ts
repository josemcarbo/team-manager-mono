import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Card } from './card.schema';
import { Model } from 'mongoose';
import { ICard, ICardLabel, ICardFindParam } from './card.interface';
import { CardTransformer } from './card.transformer';

@Injectable()
export class CardRepository {
  constructor(@InjectModel(Card.name) private db: Model<Card>) {}

  async find(params: ICardFindParam): Promise<ICard[]> {
    const cards = await this.db.find(params);
    return (
      cards && cards.map((card) => CardTransformer.toResponse(card.toObject()))
    );
  }

  async findOne(id: string): Promise<ICard> {
    // TODO: const card = await this.db.findById(id).lean().populate('owner');
    const card = await this.db.findById(id);
    return card && CardTransformer.toResponse(card.toObject());
  }

  async create(card: ICard): Promise<ICard> {
    const newCard = (await this.db.create(card)).toObject();
    return CardTransformer.toResponse(newCard);
  }

  async update(id: string, card: any): Promise<ICard> {
    await this.db.updateOne({ _id: id }, card).lean();
    return this.findOne(id);
  }

  async addNewLabel(id: string, labels: ICardLabel[]): Promise<ICard> {
    await this.update(id, {
      $addToSet: {
        labels: { $each: labels },
      },
    });
    return this.findOne(id);
  }

  async removeLabel(id: string, labels: ICardLabel[]): Promise<ICard> {
    await this.update(id, {
      $pull: {
        labels: { $in: labels },
      },
    });
    return this.findOne(id);
  }

  async delete(id: string): Promise<ICard> {
    const deletedCard = (await this.db.findByIdAndRemove(id)).toObject();
    return CardTransformer.toResponse(deletedCard);
  }
}
