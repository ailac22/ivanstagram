import React from 'react';
import { IPost } from 'app/shared/model/post.model';
import { Button, Col, Row, Table, Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import UserPostHeader from 'app/modules/user/UserPostHeader';
import UserHeaderComponent from 'app/modules/post/UserHeaderComponent/UserHeaderComponent';
import LikeComment from 'app/modules/post/LikeComment/LikeComment';
import { IComment } from 'app/shared/model/comment.model';

type PostComponentProps = {
  post: IPost;
};

const PostComponent: React.FC<PostComponentProps> = ({ post }) => {
  return (
    <div>
      <UserHeaderComponent user={post.owner} />
      <Card key={post.id}>
        <CardImg src={`data:${post.imageContentType};base64,${post.image}`} width="100%"></CardImg>
        <CardBody>
          <LikeComment addComment={(c: IComment) => {}} post={post} />
        </CardBody>
      </Card>
    </div>
  );
};

export default PostComponent;
