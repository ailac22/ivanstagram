import React, { useState, useEffect } from 'react';
import { IUser } from 'src/main/webapp/app/shared/model/user.model';
import './AddPostModal.scss';
import FollowState from 'app/shared/model/info-types';
import axios from 'axios';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { isNumber, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { IPost } from 'app/shared/model/post.model';

interface AddPostProps {
  toggleOpen: () => void;
  open: boolean;
}

// className="user-main-profile-image"
const AddPostModal: React.FC<AddPostProps> = ({ toggleOpen, open }) => {
  const submitPost = values => {
    const post = {
      imageContentType: values.imageContentType,
      image: values.image,
    };
    axios.post('/api/posts', post);
  };

  useEffect(() => {}, []);

  const defaultValues = () => {
    return { comment: '' };
  };

  return (
    <Modal toggle={toggleOpen} size="xl" fade={true} centered={true} isOpen={open}>
      <ModalHeader className="d-flex justify-content-center">
        <div className="">Create new post</div>
      </ModalHeader>
      <ModalBody className="addpost-modal-body">
        <ValidatedForm defaultValues={defaultValues()} onSubmit={submitPost}>
          <ValidatedBlobField
            label="Image"
            id="post-image"
            name="image"
            data-cy="image"
            isImage
            accept="image/*"
            validate={{
              required: { value: true, message: 'This field is required.' },
            }}
          />
          <ValidatedField
            label="Comment"
            name="comment"
            id="comment"
            data-cy="comment"
            type="textarea"
            validate={{
              required: { value: true, message: 'This field is required.' },
              minLength: { value: 3, message: 'This field is required to be at least 3 characters.' },
            }}
          />
          <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit">
            Post
          </Button>
        </ValidatedForm>
      </ModalBody>
      <ModalFooter></ModalFooter>
    </Modal>
  );
};

export default AddPostModal;
