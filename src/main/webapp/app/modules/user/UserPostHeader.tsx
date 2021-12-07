import React from 'react';
// import { IIvsUser, defaultValue } from 'app/shared/model/ivs-user.model';
import { IUser } from 'src/main/webapp/app/shared/model/user.model';

interface UserPostHeaderProp {
  user: IUser;
}

const UserPostHeader: React.FC<UserPostHeaderProp> = ({ user }) => {
  return (
    <div>
      <h2>{user.login}</h2>
    </div>
  );
};

export default UserPostHeader;
