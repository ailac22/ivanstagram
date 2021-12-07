import React from 'react';
import { IPost } from 'app/shared/model/post.model';
import { Button, Col, Row } from 'reactstrap';
import UserPostHeader from 'app/modules/user/UserPostHeader';
import UserHeaderComponent from 'app/modules/post/UserHeaderComponent/UserHeaderComponent';
import './SinglePostComponent.scss';
import LikeComment from 'app/modules/post/LikeComment/LikeComment';
import UserComment from 'app/modules/post/UserComment/UserComment';

type SinglePostComponentProps = {
  post: IPost;
};

// Esto se llamará 'FeedPostComponent'

//      <UserPostHeader user={post.owner}></UserPostHeader>
//      <Card key={post.id}>
//        <CardImg src={`data:${post.imageContentType};base64,${post.image}`} width="100%"></CardImg>
//        <CardBody>
//          <CardText>{post.footer}</CardText>
//        </CardBody>
//      </Card>
// <UserHeaderComponent user={post.owner} />
const SinglePostComponent: React.FC<SinglePostComponentProps> = ({ post }) => {
  return (
    <>
      <br />
      <div className="single-post-container">
        <div>
          <img className="main-image" src={`data:${post.imageContentType};base64,${post.image}`} />
        </div>
        <div className="comments">
          <UserHeaderComponent user={post.owner} />
          <br />
          <UserComment />
          <UserComment />
          <LikeComment />
        </div>
      </div>
    </>
  );
};

export default SinglePostComponent;
