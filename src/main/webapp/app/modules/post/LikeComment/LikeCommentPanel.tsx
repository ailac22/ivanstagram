import React, { useState } from 'react';
import { faHeart as regularHeart, faComment as regularComment, faSmile } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment as solidComment, faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';

const LikeCommentPanel = () => {
  const [liked, setLike] = useState<boolean>(true);

  const fakeLikeCount = 10000;
  const fakeTimeAgo = '1 HOUR AGO';

  function LikeButtonHandler() {
    setLike(() => !liked);
  }

  return (
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
  );
};

export default LikeCommentPanel;
