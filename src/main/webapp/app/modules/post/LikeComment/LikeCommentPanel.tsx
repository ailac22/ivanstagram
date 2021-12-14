import React, { useState, useEffect } from 'react';
import { faHeart as regularHeart, faComment as regularComment, faSmile } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment as solidComment, faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { IPost } from 'app/shared/model/post.model';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';

interface ILikeCommentProps {
  post: IPost;
  commentHandler: () => void;
}

const LikeCommentPanel: React.FC<ILikeCommentProps> = ({ post, commentHandler }) => {
  const [likeCount, setLikeCount] = useState<number>(0);
  const [liked, setLike] = useState<boolean>(false);
  // const [justLiked, setJustLiked] = useState<boolean | null>(null);

  const timeAgo: Date = new Date(post.createdAt);

  const apiEndpointLike = `/api/p/${post.id}/like`;
  const apiEndpointUnlike = `/api/p/${post.id}/unlike`;

  function initPostLiked() {
    axios.get<boolean>(apiEndpointLike).then(r => {
      setLike(r.data);
      setLikeCount(post.likeCount - (r.data ? 1 : 0));
    });
  }

  function queryPostLiked() {
    axios.get<boolean>(apiEndpointLike).then(r => {
      setLike(r.data);
    });
  }

  function likePost() {
    axios.post(apiEndpointLike).then(() => queryPostLiked());
  }

  function unlikePost() {
    axios.post(apiEndpointUnlike).then(() => queryPostLiked());
  }

  useEffect(() => {
    initPostLiked();
  }, []);

  function likeButtonHandler() {
    liked ? unlikePost() : likePost();
  }

  function getLikes(): number {
    return likeCount + (liked ? 1 : 0);
  }

  return (
    <section className="likecomment-container">
      <div className="like-comment-icons">
        <FontAwesomeIcon
          onClick={likeButtonHandler}
          className={liked ? ' likecomment-button-red' : 'likecomment-button'}
          size="lg"
          icon={liked ? solidHeart : regularHeart}
        />
        <FontAwesomeIcon onClick={commentHandler} className="likecomment-button" size="lg" icon={regularComment} />
      </div>
      <div className="likecomment-like-count">{getLikes()} likes</div>
      <Link to={`/p/${post.id}`}>
        <div className="likecomment-time-ago">{formatDistanceToNow(timeAgo).toString()} ago</div>
      </Link>
    </section>
  );
};

export default LikeCommentPanel;
