import React from 'react';
import { IUser, defaultValue } from 'app/shared/model/user.model';

interface UserHeaderProps {
  user: IUser;
}

const UserProfileHeader: React.FC<UserHeaderProps> = ({ user }) => {
  return (
    <div>
      <h2>{user?.login}</h2>
      <p>{user.comment}</p>
      <hr />
      <p> {`${user?.firstName} ${user?.lastName}`} </p>
    </div>
  );
};

export default UserProfileHeader;
