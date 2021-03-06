import React, { useState } from 'react';
import { IPost } from 'src/main/webapp/app/shared/model/post.model';
import './UserProfilePost.scss';
import { Button, Card, CardImg, CardImgOverlay, Fade } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons';

interface UserProfilePostProps {
  post: IPost;
}

const UserProfilePost: React.FC<UserProfilePostProps> = ({ post }) => {
  const [isHovering, setHovering] = useState<boolean>(false);

  function renderImageOverlay() {
    return (
      <CardImgOverlay className="overlay">
        <div className="icon-info">
          <FontAwesomeIcon icon={faComment} />
          <span className="view-comment-numbers">{post.commentCount}</span>
          <FontAwesomeIcon icon={faHeart} />
          <span className="view-comment-numbers">{post.likeCount}</span>
        </div>
      </CardImgOverlay>
    );
  }

  const overlay = isHovering ? renderImageOverlay() : '';

  // Se intentaba usar <Fade in={isHovering} transitionAppear={false} transitionAppearTimeout={transition}>

  return (
    <Card className="h-100" key={post.id} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
      <CardImg className={isHovering ? 'upp-hoverImage' : 'upp-image'} src={`data:${post.imageContentType};base64,${post.image}`} />
      {overlay}
    </Card>
  );
};

export default UserProfilePost;
