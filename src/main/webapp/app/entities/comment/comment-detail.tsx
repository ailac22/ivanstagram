import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './comment.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const CommentDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const commentEntity = useAppSelector(state => state.comment.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="commentDetailsHeading">Comment</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{commentEntity.id}</dd>
          <dt>
            <span id="comment">Comment</span>
          </dt>
          <dd>{commentEntity.comment}</dd>
          <dt>
            <span id="createdAt">Created At</span>
          </dt>
          <dd>{commentEntity.createdAt ? <TextFormat value={commentEntity.createdAt} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>Owner</dt>
          <dd>{commentEntity.owner ? commentEntity.owner.login : ''}</dd>
          <dt>Like</dt>
          <dd>
            {commentEntity.likes
              ? commentEntity.likes.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.login}</a>
                    {commentEntity.likes && i === commentEntity.likes.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/comment" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/comment/${commentEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default CommentDetail;
