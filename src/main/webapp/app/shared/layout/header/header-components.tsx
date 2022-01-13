import React from 'react';

import { NavItem, NavLink, NavbarBrand } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';

export const BrandIcon = props => (
  <div {...props} className="brand-icon">
    <img src="content/images/ivanstagramLogo.svg" alt="" />
  </div>
);

export const Brand = () => (
  <NavbarBrand tag={Link} to="/" className="flex-grow-1 brand-logo">
    <BrandIcon />
  </NavbarBrand>
);

export const Home = () => (
  <NavItem>
    <NavLink tag={Link} to="/" className="d-flex align-items-center">
      <FontAwesomeIcon size="lg" icon="home" />
    </NavLink>
  </NavItem>
);

export const AddPost = ({ togglePostOpen }) => (
  <NavItem>
    <div className="">
      <FontAwesomeIcon onClick={togglePostOpen} size="lg" icon={faPlusSquare} />
    </div>
  </NavItem>
);
