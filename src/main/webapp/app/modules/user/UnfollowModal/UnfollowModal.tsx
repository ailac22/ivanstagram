import React, { useState } from 'react';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import { IUser } from 'src/main/webapp/app/shared/model/user.model';
import './UnfollowModal.scss';
import FollowState from 'app/shared/model/info-types';
import axios from 'axios';

interface UnfollowModalProps {
  user: IUser;
  toggleOpen: () => void;
  open: boolean;
  setOpen: (b: React.SetStateAction<boolean>) => void;
  toggleFollowing: () => void;
}
// className="user-main-profile-image"
const UnfollowModal: React.FC<UnfollowModalProps> = ({ user, toggleOpen, open, setOpen, toggleFollowing }) => {
  return (
    <Modal contentClassName="modal-content-class" toggle={toggleOpen} fade={true} centered={true} isOpen={open}>
      <ModalBody>
        <div className="modal-body-container">
          <img className="rounded-circle" src="content/images/jhipster_family_member_0_head-192.png" alt="" />
          <div className="mt-3">Unfollow @{user.login}?</div>
        </div>
      </ModalBody>
      <button
        className="fw-bold text-danger modal-button"
        onClick={() => {
          toggleFollowing();
          toggleOpen();
        }}
      >
        Unfollow
      </button>
      <button className="modal-button-round" onClick={toggleOpen}>
        Cancel
      </button>
    </Modal>
  );
};

export default UnfollowModal;
