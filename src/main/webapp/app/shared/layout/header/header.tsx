import './header.scss';

import React, { useState } from 'react';

import { Navbar, Row, Col, Nav, Container, NavbarToggler, Collapse } from 'reactstrap';
import LoadingBar from 'react-redux-loading-bar';

import { Home, Brand } from './header-components';
import { AdminMenu, EntitiesMenu, AccountMenu } from '../menus';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isOpenAPIEnabled: boolean;
}

const Header = (props: IHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const renderDevRibbon = () =>
    props.isInProduction === false ? (
      <div className="ribbon dev">
        <a href="">Development</a>
      </div>
    ) : null;

  const toggleMenu = () => setMenuOpen(!menuOpen);

  /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */
  return (
    <div id="app-header">
      {
        //  renderDevRibbon()
      }
      <LoadingBar className="loading-bar" />
      <Navbar data-cy="navbar" className="jh-navbar d-flex justify-content-center" expand="sm" fixed="top" light>
        <Brand />
        <Nav id="header-tabs" className="ml-auto" navbar>
          <Home />
          {/*  props.isAuthenticated && <EntitiesMenu /> */}
          {/* props.isAuthenticated && props.isAdmin && <AdminMenu showOpenAPI={props.isOpenAPIEnabled} /> */}
          <AccountMenu isAuthenticated={props.isAuthenticated} />
        </Nav>
      </Navbar>
    </div>
  );
};

export default Header;
