import React, { useEffect, useState } from 'react';
import PostComponent from 'app/modules/post/PostComponent';
import { useAppDispatch, useAppSelector } from 'app/config/store';
// import { getUserEntries } from 'app/entities/entry/entry.reducer'; //TODO: !!!!!!!!
// import { getUser } from 'app/entities/ivs-user/ivs-user.reducer';  //TODO: !!!!!!!!!!!!!!!
import { Button } from 'reactstrap';
import UserProfileHeader from 'app/modules/user/UserProfileHeader/UserProfileHeader';
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

  const { data: posts, error } = usePosts(userName);
  const { data: user, error: userError } = useUser(userName);

  if (error || userError) return <p>There is an error.</p>;

  if (!posts || !user) return <p>Loading...</p>;

  function renderFeed() {
    return (
      <section className="userPhotosGrid">
        {posts.map(post => {
          return (
            <>
              <Link to={`/p/${post.id}`}>
                <UserProfilePost post={post}></UserProfilePost>
              </Link>
            </>
          );
        })}
      </section>
    );
  }

  const feed = renderFeed();

  return (
    <>
      <Header isAuthenticated={true} isAdmin={false} ribbonEnv={''} isInProduction={false} isOpenAPIEnabled={false} />{' '}
      <UserProfileHeader user={user}></UserProfileHeader>
      {feed}
    </>
  );
};

export default UserProfile;
