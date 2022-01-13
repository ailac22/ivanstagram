import React, { Fragment } from 'react';
import { ValidatedField } from 'react-jhipster';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert, Row, Col, Form, Card } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './LoginForm.scss';

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
    <Row>
      <Col sm={{ offset: 3, size: 6 }}>
        <Card>
          <img className="loginform-logo" src="content/images/ivanstagramLogo.svg" />
          <Form onSubmit={handleSubmit(login)}>
            <div className="mx-5">
              {loginError ? (
                <Alert color="danger" data-cy="loginError">
                  <strong>Failed to log in!</strong> Please check your credentials and try again.
                </Alert>
              ) : null}
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
              <Button className="w-100 mb-5" color="primary" type="submit" data-cy="submit">
                Log in
              </Button>
            </div>
          </Form>
        </Card>
        <Card className="mt-2 d-flex justify-content-center align-items-center p-2">
          <header className="mt-1 fw-bold">Enter with this visitor account:</header>
          <div>
            <span className="fw-bold">Name:</span>
            <span className="fst-italic"> visitor</span>
          </div>
          <div>
            <span className="fw-bold">Pass:</span>
            <span className="fst-italic"> visitor</span>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginForm;
