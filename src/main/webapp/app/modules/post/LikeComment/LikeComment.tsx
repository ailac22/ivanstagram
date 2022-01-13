import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile } from '@fortawesome/free-regular-svg-icons';
import './LikeComment.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import Picker from 'emoji-picker-react';
import LikeCommentPanel from './LikeCommentPanel';
import axios, { AxiosResponse } from 'axios';
import { IPost } from 'app/shared/model/post.model';
import { IComment } from 'app/shared/model/comment.model';

interface ILikeCommentProps {
  post: IPost;
  addComment: (comment: IComment) => void;
}

interface IFormInputs {
  comment: string;
  postId: number;
}

const LikeComment: React.FC<ILikeCommentProps> = ({ post, addComment }) => {
  function handleEmoji() {}

  const { register, handleSubmit, setFocus, watch, resetField, formState } = useForm<IFormInputs>({ mode: 'onChange' });
  // <Picker onEmojiClick={handleEmoji}/>

  watch('comment', '');

  const onSubmit: SubmitHandler<IFormInputs> = data => {
    data.postId = post.id;
    axios.post<IComment>('/api/comments', data).then(c => {
      addComment(c.data);
    });
    resetField('comment');
  };

  function focusComment() {
    setFocus('comment');
  }
  return (
    <>
      <LikeCommentPanel commentHandler={focusComment} post={post} />

      <div className="comment-box-container">
        <form onSubmit={handleSubmit(onSubmit)} className="singlepost-comment-box-form">
          <FontAwesomeIcon size="lg" icon={faSmile} />
          <input
            {...register('comment', { required: true, minLength: 1 })}
            name="comment"
            placeholder="Add a comment..."
            className="likecomment-comment-input"
          />
          <button disabled={!formState.isValid} type="submit" className="singlepost-comment-box">
            Post
          </button>
        </form>
      </div>
    </>
  );
};

export default LikeComment;
