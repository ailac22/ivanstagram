import React, { FC } from 'react';
import { useParams, RouteComponentProps } from 'react-router-dom';
import SinglePostComponent from 'app/modules/post/SinglePostComponent/SinglePostComponent';
import usePost from './PostHook';
import { IPost } from 'app/shared/model/post.model';
import Header from 'app/shared/layout/header/header';

const SinglePost: React.FC<RouteComponentProps> = (props: RouteComponentProps<{ id: string }>) => {
  const { id } = useParams<{ id: string }>();

  const { data, error } = usePost(id);

  if (error) return <p>There is an error.</p>;

  if (!data) return <p>Loading...</p>;

  return (
    <>
      <Header isAuthenticated={true} isAdmin={false} ribbonEnv={''} isInProduction={false} isOpenAPIEnabled={false} />
      <SinglePostComponent post={data}></SinglePostComponent>
    </>
  );
};

export default SinglePost;
