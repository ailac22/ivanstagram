import React from 'react';
import { IUser } from 'app/shared/model/user.model';
import UserPostHeader from 'app/modules/user/UserPostHeader';
import './UserComment.scss';

const UserComment: React.FC = () => {
  const comment =
    'Dolor consequatur enim quia vero cumque et? Alias nam minima libero quaerat fuga. Eum quae autem doloribus architecto a. Quas maiores unde repellat magni animi expedita quidem, perspiciatis Placeat odio eos et id assumenda in Iure accusantium sapiente nisi facere.';
  return (
    <div className="user-comment-container">
      <img className="profileImage" src="content/images/jhipster_family_member_0_head-192.png" alt="" />
      <div className="user-comment-text">
        <span className="user-comment-user-name">name</span> · {comment}
      </div>
    </div>
  );
};

export default UserComment;
