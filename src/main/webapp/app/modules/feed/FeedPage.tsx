import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, CardBody, CardTitle, Col, Row, Table } from 'reactstrap';
import { openFile, byteSize, Translate, log } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, CardImg, CardText } from 'reactstrap';
import PostComponent from 'app/modules/post/PostComponent';
import Header from 'app/shared/layout/header/header';
import { IPost } from 'app/shared/model/post.model';
import { IUser } from 'app/shared/model/user.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import axios, { AxiosResponse } from 'axios';
import './FeedPage.scss';
import UserHeaderComponent from 'app/modules/post/UserHeaderComponent/UserHeaderComponent';

// <UserHeaderComponent></UserHeaderComponent>

const FeedPage = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const [feed, setFeed] = useState<IPost[]>([]);
  const [recommendedUsers, setRecommendedUsers] = useState<IUser[]>([]);

  function getUsersPage(page: number, size: number) {
    const usersEndpoint = '/api/users';
    return axios.get<IUser[]>(usersEndpoint, { params: { page, size } });
  }

  function getFeed(): Promise<AxiosResponse<IPost[]>> {
    return axios.get<IPost[]>('/api/feed');
  }

  useEffect(() => {
    console.log('gonna get feed');
    getFeed().then(entries => {
      setFeed(entries.data);
    });

    getUsersPage(0, 5).then(users => {
      setRecommendedUsers(users.data);
    });
  }, []);

  const { match } = props;

  return (
    <div>
      <Header isAuthenticated={true} isAdmin={false} ribbonEnv={''} isInProduction={false} isOpenAPIEnabled={false} />
      <Row>
        <Col md="8">
          {feed.map(post => {
            return (
              <>
                <br />
                <PostComponent post={post} key={post.id}></PostComponent>
              </>
            );
          })}
        </Col>
        <Col md="4" className="d-none d-md-block">
          <div className="mt-5">
            <header className="feedpage-suggestions-4u fw-bold">Suggestions for you</header>
            <section>
              {recommendedUsers.map(user => {
                return <UserHeaderComponent key={user.id} user={user}></UserHeaderComponent>;
              })}
            </section>
          </div>
        </Col>
      </Row>
      <hr />
    </div>
  );
};

export default FeedPage;
