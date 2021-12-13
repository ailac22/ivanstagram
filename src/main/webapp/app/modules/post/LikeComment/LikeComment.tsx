import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile } from '@fortawesome/free-regular-svg-icons';
import './LikeComment.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import Picker from 'emoji-picker-react';
import LikeCommentPanel from './LikeCommentPanel';
import axios, { AxiosResponse } from 'axios';

interface ILikeCommentProps {
  postId: number;
}

interface IFormInputs {
  comment: string;
  postId: number;
}

const LikeComment: React.FC<ILikeCommentProps> = ({ postId }) => {
  function handleEmoji() {}

  const { register, handleSubmit, watch, resetField, formState } = useForm<IFormInputs>({ mode: 'onChange' });
  // <Picker onEmojiClick={handleEmoji}/>

  watch('comment', '');

  console.log(formState.isValid);
  const onSubmit: SubmitHandler<IFormInputs> = data => {
    data.postId = postId;
    axios.post<IFormInputs>('/api/comments', data);
    resetField('comment');
  };

  return (
    <>
      <LikeCommentPanel />

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
