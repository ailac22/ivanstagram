import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile } from '@fortawesome/free-regular-svg-icons';
import './LikeComment.scss';
import { useForm } from 'react-hook-form';
import Picker from 'emoji-picker-react';
import LikeCommentPanel from './LikeCommentPanel';

const LikeComment = () => {
  function handleEmoji() {}

  // <Picker onEmojiClick={handleEmoji}/>
  return (
    <>
      <LikeCommentPanel />

      <div className="comment-box-container">
        <form className="singlepost-comment-box-form">
          <FontAwesomeIcon size="lg" icon={faSmile} />
          <input width="300px" placeholder="Add a comment..." className="likecomment-comment-input" type="text" />

          <button className="singlepost-comment-box">Post</button>
        </form>
      </div>
    </>
  );
};

export default LikeComment;
