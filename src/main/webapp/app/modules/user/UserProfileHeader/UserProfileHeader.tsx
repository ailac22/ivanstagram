import React from 'react';
import { IUser, defaultValue } from 'app/shared/model/user.model';
import './UserProfileHeader.scss';

interface UserHeaderProps {
  user: IUser;
}

const UserProfileHeader: React.FC<UserHeaderProps> = ({ user }) => {
  return (
    <header className="user-profile-header">
      <img className="user-main-profile-image" src="content/images/jhipster_family_member_0_head-192.png" alt="" />
      <div>
        <div>
          <h2>{user?.login}</h2>
          <p>{user.comment}</p>
          <hr />
          <p> {`${user?.firstName} ${user?.lastName}`} </p>
        </div>
        <div className="uph-numbers-section">
          <p>
            <span className="uph-number">{user.numPosts}</span> posts
          </p>
          <p>
            <span className="uph-number">{user.numFollowers}</span> followers
          </p>
          <p>
            <span className="uph-number">{user.numFollowing}</span> following
          </p>
        </div>
        <p>{user.comment}</p>
      </div>
    </header>
  );
};

export default UserProfileHeader;
