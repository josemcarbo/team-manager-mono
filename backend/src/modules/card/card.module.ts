import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from '../shared/shared.module';
import { BoardModule } from '../board/board.module';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { Card, CardSchema } from './card.schema';
import { CardRepository } from './card.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }]),
    SharedModule,
    BoardModule,
  ],
  controllers: [CardController],
  providers: [CardService, CardRepository],
  exports: [CardService],
})
export class CardModule {}
