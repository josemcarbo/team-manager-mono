export class ProjectTransformer {
  static toResponse(project) {
    const { _id, __v, ...rest } = project;
    return {
      id: _id,
      ...rest,
    };
  }
}
