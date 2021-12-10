import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PostComponent from 'app/modules/post/PostComponent';
import { useAppDispatch, useAppSelector } from 'app/config/store';
// import { getUserEntries } from 'app/entities/entry/entry.reducer'; !!!!!!!!
// import { getUser } from 'app/entities/ivs-user/ivs-user.reducer';  !!!!!!!!!!!!!!!
import { Button } from 'reactstrap';
import UserProfileHeader from 'app/modules/user/UserProfileHeader';
import FojlowState from 'app/shared/model/info-types';
import './UserProfile.scss';
import { RouteComponentProps } from 'react-router-dom';
import Header from 'app/shared/layout/header/header';
// import UserProfilePost from 'app/entities/entry/UserProfilePost';
import { Link } from 'react-router-dom';

const UserProfile: React.FC<RouteComponentProps> = (props: RouteComponentProps<{ user: string }>) => {
  const dispatch = useAppDispatch();

  const ivsuser = useAppSelector(state => state.ivsUser.entity);
  const userLoading = useAppSelector(state => state.ivsUser.loading);
  const entryList = useAppSelector(state => state.entry.entities);
  const loading = useAppSelector(state => state.entry.loading);

  /* Header */
  const ribbonEnv = useAppSelector(state => state.applicationProfile.ribbonEnv);
  const isInProduction = useAppSelector(state => state.applicationProfile.inProduction);
  const isOpenAPIEnabled = useAppSelector(state => state.applicationProfile.isOpenAPIEnabled);
  const userName = props.match.params.user;

  const [following, setFollowing] = useState<FollowState>(FollowState.TO_FOLLOW);

  useEffect(() => {
    dispatch(getUser(userName));
    dispatch(getUserEntries(userName));
  }, []);

  function handlerFollowUser() {
    axios.post(`/api/admin/follow/${userName}`).then(response => setFollowing(response.data));
    // dispatch(followUser(userName));
  }

  function renderFeed() {
    return (
      <div className="userPhotosGrid">
        {entryList.map(entry => {
          return (
            <>
              <Link to={`/p/${entry.id}`}>
                <UserProfilePost post={entry}></UserProfilePost>
              </Link>
            </>
          );
        })}
      </div>
    );
  }

  const feed = renderFeed();

  return (
    <>
      <Header isAuthenticated={true} isAdmin={false} ribbonEnv={ribbonEnv} isInProduction={false} isOpenAPIEnabled={false} />
      <br />

      {userLoading ? '' : <UserProfileHeader user={ivsuser}></UserProfileHeader>}

      {console.log(ivsuser)}
      <Button color="primary" onClick={handlerFollowUser}>
        {following === FollowState.TO_FOLLOW ? 'Follow' : 'Following'}
      </Button>
      {feed}
    </>
  );
};

export default UserProfile;
