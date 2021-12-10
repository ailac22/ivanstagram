import { IPost } from 'app/shared/model/post.model';
import { useFetch } from 'usehooks-ts';

export default function usePost(id: string) {
  const postUrl = `/api/p/${id}`;
  return useFetch<IPost>(postUrl);
}
