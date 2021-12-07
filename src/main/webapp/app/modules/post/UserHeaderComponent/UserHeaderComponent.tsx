import React from 'react';
import { IUser } from 'app/shared/model/user.model';
import UserPostHeader from 'app/modules/user/UserPostHeader';
import './UserHeaderComponent.scss';
import { Link } from 'react-router-dom';

interface UserHeaderComponentProps {
  user: IUser;
}

const UserHeaderComponent: React.FC<UserHeaderComponentProps> = ({ user }) => {
  return (
    <header className="headerContainer">
      <img className="profileImage" src="content/images/jhipster_family_member_0_head-192.png" alt="" />
      <Link to={`/${user.login}`}>
        <span className="user-name">{user.login}</span>
      </Link>
    </header>
  );
};

export default UserHeaderComponent;
