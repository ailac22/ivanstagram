import React from 'react';
import { IUser } from 'app/shared/model/user.model';
import UserPostHeader from 'app/modules/user/UserPostHeader';
import './UserHeaderComponent.scss';
import { Link } from 'react-router-dom';
import useFollow from 'app/shared/followHook';
import FollowState from 'app/shared/model/info-types';
import { Button } from 'reactstrap';

interface UserHeaderComponentProps {
  user: IUser;
}

const UserHeaderComponent: React.FC<UserHeaderComponentProps> = ({ user }) => {
  const [following, toggleFollowing]: [FollowState, () => void] = useFollow(user);

  return (
    <header className="headerContainer">
      <div className="m-0 px-2 d-flex w-100 align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <div>
            <img className="profileImage" src="content/images/jhipster_family_member_0_head-192.png" alt="" />
          </div>
          <Link to={`/${user.login}`}>
            <span className="text-muted fw-bold">{user.login}</span>
          </Link>
        </div>
        <button className="me-2 border-0 bg-transparent fw-bold text-primary" onClick={toggleFollowing}>
          {following ? 'Following' : 'Follow'}
        </button>
      </div>
    </header>
  );
};

export default UserHeaderComponent;
