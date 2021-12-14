import React from 'react';
import { IPost } from 'app/shared/model/post.model';
import { Button, Col, Row } from 'reactstrap';
import UserPostHeader from 'app/modules/user/UserPostHeader';
import UserHeaderComponent from 'app/modules/post/UserHeaderComponent/UserHeaderComponent';
import './SinglePostComponent.scss';
import LikeComment from 'app/modules/post/LikeComment/LikeComment';
import UserComment from 'app/modules/post/UserComment/UserComment';
import { useFetchComments } from 'app/modules/hookUtils/CommentHooks';
import { IComment } from 'app/shared/model/comment.model';

type SinglePostComponentProps = {
  post: IPost;
};

const SinglePostComponent: React.FC<SinglePostComponentProps> = ({ post }) => {
  const { data: comments, error } = useFetchComments(post.id);

  if (error) return <p>There is an error.</p>;

  if (!comments) return <p>Loading...</p>;

  return (
    <>
      <br />
      <div className="single-post-container">
        <div>
          <img className="main-image" src={`data:${post.imageContentType};base64,${post.image}`} />
        </div>
        <div className="comments-main">
          <UserHeaderComponent user={post.owner} />
          <br />
          <section className="comments-section">
            {comments.map((comment, key) => {
              return <UserComment key={key} comment={comment} />;
            })}
          </section>
          <LikeComment post={post} />
        </div>
      </div>
    </>
  );
};

export default SinglePostComponent;
