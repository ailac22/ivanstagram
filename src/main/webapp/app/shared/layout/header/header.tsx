import './header.scss';

import React, { useState } from 'react';

import { Navbar, Row, Col, Nav, Container, NavbarToggler, Collapse } from 'reactstrap';
import LoadingBar from 'react-redux-loading-bar';

import { Home, Brand, AddPost } from './header-components';
import { AdminMenu, EntitiesMenu, AccountMenu } from '../menus';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import AddPostModal from 'app/modules/post/AddPostModal/AddPostModal';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isOpenAPIEnabled: boolean;
}

const Header = (props: IHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [addPostOpen, setAddPostOpen] = useState<boolean>(false);

  const renderDevRibbon = () =>
    props.isInProduction === false ? (
      <div className="ribbon dev">
        <a href="">Development</a>
      </div>
    ) : null;

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleAddPostOpen = () => setAddPostOpen(!addPostOpen);
  /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */
  return (
    <div id="app-header">
      {
        //  renderDevRibbon()
      }
      <LoadingBar className="loading-bar" />
      <Navbar data-cy="navbar" className="jh-navbar" expand="sm" fixed="top" light>
        <div className="main-container w-100 d-flex flex-row justify-content-between align-items-center">
          <Brand />

          <input
            className=" search-user-input d-none d-sm-inline border-0 rounded-1"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <Nav id="header-tabs" className="flex-grow-1 d-flex header-nav-icons flex-row justify-content-end align-items-center" navbar>
            <Home />
            <AddPost togglePostOpen={toggleAddPostOpen} />
            {/*  props.isAuthenticated && <EntitiesMenu /> */}
            {/* props.isAuthenticated && props.isAdmin && <AdminMenu showOpenAPI={props.isOpenAPIEnabled} /> */}
            <AccountMenu isAuthenticated={props.isAuthenticated} />
          </Nav>
        </div>
      </Navbar>

      <AddPostModal open={addPostOpen} toggleOpen={toggleAddPostOpen} />
    </div>
  );
};

export default Header;
