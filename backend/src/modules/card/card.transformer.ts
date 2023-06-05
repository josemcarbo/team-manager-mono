export class CardTransformer {
  static toResponse(card) {
    const { _id, __v, ...rest } = card;
    return {
      id: _id,
      ...rest,
    };
  }
}
