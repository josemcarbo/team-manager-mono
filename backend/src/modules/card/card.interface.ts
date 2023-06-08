export interface ICardLabel {
  text: string;
  color: string;
}

export interface ICard {
  id?: string;
  name: string;
  description?: string;
  status: string;
  labels?: ICardLabel[];
  dueDate?: Date;
  startDate?: Date;
  assignee?: string;
  reviewer?: string;
  points: number;
  owner: string;
  board: string;
}

export interface ICardFindParam {
  status?: string;
  assignees?: string;
  reviewer?: string;
  owner?: string;
  board?: string;
}
