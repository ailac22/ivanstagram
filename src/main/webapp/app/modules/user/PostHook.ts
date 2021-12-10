import { IPost } from 'app/shared/model/post.model';
import { useFetch } from 'usehooks-ts';

export function usePost(id: string) {
  const postUrl = `/api/p/${id}`;
  return useFetch<IPost>(postUrl);
}

export function usePosts(userLogin: string) {
  const postsUrl = `/api/${userLogin}/posts`;
  return useFetch<IPost[]>(postsUrl);
}
