import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';

export interface IPost {
  id?: number;
  imageContentType?: string;
  image?: string;
  createdAt?: string;
  owner?: IUser;
  likeCount: number;
}

export const defaultValue: Readonly<IPost> = { likeCount: 0 };
