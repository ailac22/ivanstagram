import React, { Fragment } from 'react';
import { ValidatedField } from 'react-jhipster';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert, Row, Col, Form, Card } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export interface ILoginModalProps {
  loginError: boolean;
  handleLogin: (username: string, password: string, rememberMe: boolean) => void;
}

const LoginForm = (props: ILoginModalProps) => {
  const login = ({ username, password, rememberMe }) => {
    props.handleLogin(username, password, rememberMe);
  };

  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
  } = useForm({ mode: 'onTouched' });

  const { loginError } = props;
  return (
    <Card>
      <img src="content/images/ivanstagramLogo.svg" />
      <Form onSubmit={handleSubmit(login)}>
        <Row>
          <Col md="2">
            {loginError ? (
              <Alert color="danger" data-cy="loginError">
                <strong>Failed to log in!</strong> Please check your credentials and try again.
              </Alert>
            ) : null}
          </Col>
          <Col md="6">
            <ValidatedField
              name="username"
              placeholder="Username"
              required
              autoFocus
              data-cy="username"
              validate={{ required: 'Username cannot be empty!' }}
              register={register}
              error={errors.username}
              isTouched={touchedFields.username}
            />
            <ValidatedField
              name="password"
              type="password"
              placeholder="Your password"
              required
              data-cy="password"
              validate={{ required: 'Password cannot be empty!' }}
              register={register}
              error={errors.password}
              isTouched={touchedFields.password}
            />
          </Col>
        </Row>

        <Alert color="warning">
          <div className="mt-1">&nbsp;</div>
          <Link to="/account/reset/request" data-cy="forgetYourPasswordSelector">
            Did you forget your password?
          </Link>
        </Alert>
        <Alert color="warning">
          <span>You don&apos;t have an account yet?</span> <Link to="/account/register">Register a new account</Link>
        </Alert>
        <Button color="primary" type="submit" data-cy="submit">
          Log in
        </Button>
      </Form>
    </Card>
  );
};

export default LoginForm;
