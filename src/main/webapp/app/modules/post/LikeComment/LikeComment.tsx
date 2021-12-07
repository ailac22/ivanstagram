import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart, faComment as regularComment, faSmile } from '@fortawesome/free-regular-svg-icons';
import { faComment as solidComment, faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import './LikeComment.scss';
import { useForm } from 'react-hook-form';
import Picker from 'emoji-picker-react';

const LikeComment = () => {
  const [liked, setLike] = useState<boolean>(true);

  function fakeLikeButtonHandler() {
    setLike(() => !liked);
  }

  const fakeLikeCount = 10000;
  const fakeTimeAgo = '1 HOUR AGO';

  function handleEmoji() {}

  // <Picker onEmojiClick={handleEmoji}/>
  return (
    <>
      <section className="likecomment-container">
        <div className="like-comment-icons">
          <FontAwesomeIcon
            onClick={fakeLikeButtonHandler}
            className="likecomment-button"
            size="lg"
            icon={liked ? solidHeart : regularHeart}
          />
          <FontAwesomeIcon className="likecomment-button" size="lg" icon={regularComment} />
        </div>

        <div className="likecomment-like-count">{fakeLikeCount} likes</div>
        <div className="likecomment-time-ago">{fakeTimeAgo} </div>
      </section>
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
