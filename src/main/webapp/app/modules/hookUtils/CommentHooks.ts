import { IComment } from 'app/shared/model/comment.model';
import { useFetch } from 'usehooks-ts';

export function useFetchComments(postId: number) {
  const commentsUrl = `api/comments/${postId}`;
  return useFetch<IComment[]>(commentsUrl);
}
