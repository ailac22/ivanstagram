import React from 'react';
import { IUser } from 'app/shared/model/user.model';
import { IComment } from 'app/shared/model/comment.model';
import UserPostHeader from 'app/modules/user/UserPostHeader';
import './UserComment.scss';

interface UserCommentProps {
  comment: IComment;
}

const UserComment: React.FC<UserCommentProps> = ({ comment }) => {
  // const commentFake =
  //   'Dolor consequatur enim quia vero cumque et? Alias nam minima libero quaerat fuga. Eum quae autem doloribus architecto a. Quas maiores unde repellat magni animi expedita quidem, perspiciatis Placeat odio eos et id assumenda in Iure accusantium sapiente nisi facere.';
  return (
    <div className="user-comment-container">
      <img className="profileImage" src="content/images/jhipster_family_member_0_head-192.png" alt="" />
      <div className="user-comment-text">
        <span className="fw-bold text-break">{comment.owner.login}</span> · {comment.comment}
      </div>
    </div>
  );
};

export default UserComment;
