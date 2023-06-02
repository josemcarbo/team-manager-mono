export class UsersTransformer {
  static toResponse(user) {
    const {
      _id,
      email,
      password,
      firstName,
      lastName,
      roles,
      createdAt,
      updatedAt,
    } = user;
    return {
      id: _id,
      email,
      password,
      firstName,
      lastName,
      roles,
      createdAt,
      updatedAt,
    };
  }
}
