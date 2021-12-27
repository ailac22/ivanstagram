import React, { useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { IUser } from 'src/main/webapp/app/shared/model/user.model';
import './AddPostModal.scss';
import FollowState from 'app/shared/model/info-types';
import axios from 'axios';

interface AddPostProps {
  toggleOpen: () => void;
  open: boolean;
}
// className="user-main-profile-image"
const AddPostModal: React.FC<AddPostProps> = ({ toggleOpen, open }) => {
  //   <Modal contentClassName="modal-content-class" toggle={toggleOpen} fade={true} centered={true} isOpen={open}>
  //     <ModalBody>
  //       <div className="modal-body-container">
  //         <img className="rounded-circle" src="content/images/jhipster_family_member_0_head-192.png" alt="" />
  //         <div className="mt-3">Unfollow @{user.login}?</div>
  //       </div>
  //     </ModalBody>
  //     <button
  //       className="fw-bold text-danger modal-button"
  //       onClick={() => {
  //         toggleFollowing();
  //         toggleOpen();
  //       }}
  //     >
  //       Unfollow
  //     </button>
  //     <button className="modal-button-round" onClick={toggleOpen}>
  //       Cancel
  //     </button>
  return (
    <Modal contentClassName="addpost-modal-content-class" toggle={toggleOpen} size="xl" fade={true} centered={true} isOpen={open}>
      <ModalHeader>Create new post</ModalHeader>
    </Modal>
  );
};

export default AddPostModal;
