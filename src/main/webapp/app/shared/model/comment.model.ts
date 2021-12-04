import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';

export interface IComment {
  id?: number;
  comment?: string;
  createdAt?: string;
  owner?: IUser;
  likes?: IUser[] | null;
}

export const defaultValue: Readonly<IComment> = {};
