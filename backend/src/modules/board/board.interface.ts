export interface IBoardLabel {
  text: string;
  color: string;
}

export interface IBoard {
  id?: string;
  name: string;
  description?: string;
  list?: string[];
  labels?: IBoardLabel[];
  owner: string;
  members?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IBoardFindParam {
  name?: string;
  description?: string;
  owner?: string;
}
