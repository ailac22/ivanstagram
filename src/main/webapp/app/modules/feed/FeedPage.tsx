import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, CardBody, CardTitle, Col, Row, Table } from 'reactstrap';
import { openFile, byteSize, Translate, log } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, CardImg, CardText } from 'reactstrap';
import PostComponent from 'app/modules/post/PostComponent';
import Header from 'app/shared/layout/header/header';
import { IPost } from 'app/shared/model/post.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import axios, { AxiosResponse } from 'axios';

const FeedPage = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const [feed, setFeed] = useState<IPost[]>([]);

  function getFeed(): Promise<AxiosResponse<IPost[]>> {
    return axios.get<IPost[]>('/api/feed');
  }

  useEffect(() => {
    console.log('gonna get feed');
    getFeed().then(entries => {
      setFeed(entries.data);
    });
  }, []);

  const { match } = props;

  return (
    <div>
      <Header isAuthenticated={true} isAdmin={false} ribbonEnv={''} isInProduction={false} isOpenAPIEnabled={false} />
      {feed.map(post => {
        return (
          <>
            <br />
            <PostComponent post={post} key={post.id}></PostComponent>
          </>
        );
      })}
      <hr />
    </div>
  );
};

export default FeedPage;