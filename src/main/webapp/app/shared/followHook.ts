import { useState, useEffect } from 'react';
import { IUser } from 'app/shared/model/user.model';
import FollowState from 'app/shared/model/info-types';
import axios from 'axios';
import { useEffectOnce } from 'usehooks-ts';

export const followEndpoint = (userLogin: string) => {
  return `/api/follow/${userLogin}`;
};

export const unfollowEndpoint = (userLogin: string) => {
  return `/api/unfollow/${userLogin}`;
};

function useFollow(user: IUser): [FollowState, () => void] {
  const [following, setFollowing] = useState<FollowState>(FollowState.TO_FOLLOW);

  function setFollowingEPState(newState: string) {
    setFollowing(FollowState[newState]);
  }

  useEffectOnce(() => {
    axios.get<string>(followEndpoint(user.login)).then(response => setFollowingEPState(response.data));
  });

  function followToggle() {
    if (following === FollowState.TO_FOLLOW) {
      axios.post<string>(followEndpoint(user.login)).then(response => setFollowingEPState(response.data));
    } else {
      axios.post<string>(unfollowEndpoint(user.login)).then(response => setFollowingEPState(response.data));
    }
  }

  return [following, followToggle];
}

export default useFollow;
