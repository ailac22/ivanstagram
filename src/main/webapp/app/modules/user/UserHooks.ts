import { IUser } from 'app/shared/model/user.model';
import { useFetch } from 'usehooks-ts';

export function useUser(userLogin: string) {
  const userUrl = `api/user/${userLogin}`;
  return useFetch<IUser>(userUrl);
}
