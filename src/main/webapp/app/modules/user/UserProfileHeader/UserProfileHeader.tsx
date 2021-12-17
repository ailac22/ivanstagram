import React, { useEffect, useState } from 'react';
import { IUser, defaultValue } from 'app/shared/model/user.model';
import './UserProfileHeader.scss';
import FollowState from 'app/shared/model/info-types';
import { Button } from 'reactstrap';
import axios from 'axios';

import { faUser, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface UserHeaderProps {
  user: IUser;
}

// TODO: XSS on a=href? check backend

const UserProfileHeader: React.FC<UserHeaderProps> = ({ user }) => {
  function handlerFollowUser() {
    axios.post(`/api/follow/${user.login}`).then(response => setFollowing(response.data));
  }

  const [following, setFollowing] = useState<FollowState>(FollowState.TO_FOLLOW);

  return (
    <>
      <header className="user-profile-header">
        <div>
          <img className="user-main-profile-image" src="content/images/jhipster_family_member_0_head-192.png" alt="" />
        </div>
        <div className="user-main-profile-info">
          <div className="uph-name-section">
            <h2 className="uph-name">{user?.login}</h2>
            <button type="button" className={following ? 'uph-following-button' : 'uph-follow-button'} onClick={handlerFollowUser}>
              {following === FollowState.TO_FOLLOW ? (
                'Follow'
              ) : (
                <>
                  <FontAwesomeIcon size="xs" icon={faUser} />
                  <FontAwesomeIcon size="xs" icon={faCheck} />
                </>
              )}
            </button>
          </div>
          <div className="uph-numbers-section">
            <p className="uph-follow-info">
              <span className="uph-bold">{user.numPosts}</span> posts
            </p>
            <p className="uph-follow-info">
              <span className="uph-bold">{user.numFollowers}</span> followers
            </p>
            <p className="uph-follow-info">
              <span className="uph-bold">{user.numFollowing}</span> following
            </p>
          </div>
          <div className="uph-bold"> {`${user?.firstName} ${user?.lastName}`} </div>
          <div>{user.comment}</div>
          <a href={`http://${user.link}`}>
            <p>{user.link}</p>
          </a>
        </div>
      </header>
      <hr />
    </>
  );
};

export default UserProfileHeader;
