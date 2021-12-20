import React, { useEffect, useState } from 'react';
import { IUser, defaultValue } from 'app/shared/model/user.model';
import './UserProfileHeader.scss';
import FollowState from 'app/shared/model/info-types';
import { Button } from 'reactstrap';
import axios from 'axios';
import useFollow from 'app/shared/followHook';

import { faUser, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UnfollowModal from 'app/modules/user/UnfollowModal/UnfollowModal';

interface UserHeaderProps {
  user: IUser;
}

// TODO: XSS on a=href? check backend

const UserProfileHeader: React.FC<UserHeaderProps> = ({ user }) => {
  const [following, toggleFollowing]: [FollowState, () => void] = useFollow(user);

  // const [following, toggleFollowing] = useState<FollowState>(FollowState.TO_FOLLOW);
  const [unfollowOpen, setUnfollowOpen] = useState(false);

  function toggleOpen() {
    setUnfollowOpen(!unfollowOpen);
  }

  // const followEP = followEndpoint(user.login);

  useEffect(() => {
    // axios.get(followEP).then(response => setFollowing(response.data))
    // toggleFollowing();
  }, []);

  // <>
  //   <FontAwesomeIcon size="xs" icon={faUser} />
  //   <FontAwesomeIcon size="xs" icon={faCheck} />
  // </>
  console.log('following: ');
  console.log(following);
  return (
    <>
      <header className="user-profile-header">
        <div>
          <img className="user-main-profile-image" src="content/images/jhipster_family_member_0_head-192.png" alt="" />
        </div>
        <div className="user-main-profile-info">
          <div className="uph-name-section">
            <h2 className="uph-name">{user?.login}</h2>
            <button
              type="button"
              className={following === FollowState.FOLLOWING ? 'uph-following-button' : 'uph-follow-button'}
              onClick={following === FollowState.TO_FOLLOW ? toggleFollowing : toggleOpen}
            >
              {following === FollowState.TO_FOLLOW ? (
                'Follow '
              ) : (
                <>
                  <FontAwesomeIcon size="xs" icon={faUser} />
                  <FontAwesomeIcon size="xs" icon={faCheck} />
                </>
              )}
            </button>
          </div>
          <div className="uph-numbers-section">
            <p className="uph-follow-info">
              <span className="uph-bold">{user.numPosts}</span> posts
            </p>
            <p className="uph-follow-info">
              <span className="uph-bold">{user.numFollowers}</span> followers
            </p>
            <p className="uph-follow-info">
              <span className="uph-bold">{user.numFollowing}</span> following
            </p>
          </div>
          <div className="uph-bold"> {`${user?.firstName} ${user?.lastName}`} </div>
          <div>{user.comment}</div>
          <a href={`http://${user.link}`}>
            <p>{user.link}</p>
          </a>
        </div>
      </header>
      <UnfollowModal
        user={user}
        open={unfollowOpen}
        setOpen={setUnfollowOpen}
        toggleOpen={toggleOpen}
        toggleFollowing={toggleFollowing}
      ></UnfollowModal>
      <hr />
    </>
  );
};

export default UserProfileHeader;
