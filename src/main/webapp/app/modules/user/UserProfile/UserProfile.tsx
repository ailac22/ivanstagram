import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PostComponent from 'app/modules/post/PostComponent';
import { useAppDispatch, useAppSelector } from 'app/config/store';
// import { getUserEntries } from 'app/entities/entry/entry.reducer'; !!!!!!!!
// import { getUser } from 'app/entities/ivs-user/ivs-user.reducer';  !!!!!!!!!!!!!!!
import { Button } from 'reactstrap';
import UserProfileHeader from 'app/modules/user/UserProfileHeader';
import FollowState from 'app/shared/model/info-types';
import './UserProfile.scss';
import { RouteComponentProps } from 'react-router-dom';
import Header from 'app/shared/layout/header/header';
// import UserProfilePost from 'app/entities/entry/UserProfilePost';
import { Link } from 'react-router-dom';
import { usePosts } from '../PostHook';
import { useUser } from '../UserHooks';

import UserProfilePost from 'app/modules/user/UserProfilePost/UserProfilePost';

const UserProfile: React.FC<RouteComponentProps> = (props: RouteComponentProps<{ user: string }>) => {
  const dispatch = useAppDispatch();

  const userName = props.match.params.user;

  const [following, setFollowing] = useState<FollowState>(FollowState.TO_FOLLOW);

  const { data: posts, error } = usePosts(userName);
  const { data: user, error: userError } = useUser(userName);

  if (error || userError) return <p>There is an error.</p>;

  if (!posts || !user) return <p>Loading...</p>;

  console.log(`user: `);
  console.log(user);

  function handlerFollowUser() {
    axios.post(`/api/admin/follow/${userName}`).then(response => setFollowing(response.data));
    // dispatch(followUser(userName));
  }

  function renderFeed() {
    return (
      <div className="userPhotosGrid">
        {posts.map(post => {
          return (
            <>
              <Link to={`/p/${post.id}`}>
                <UserProfilePost post={post}></UserProfilePost>
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
      <Header isAuthenticated={true} isAdmin={false} ribbonEnv={''} isInProduction={false} isOpenAPIEnabled={false} />
      <UserProfileHeader user={user}></UserProfileHeader>
      <br />
      <Button color="primary" onClick={handlerFollowUser}>
        {following === FollowState.TO_FOLLOW ? 'Follow' : 'Following'}
      </Button>

      {feed}
    </>
  );
};

export default UserProfile;
