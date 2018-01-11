import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import List from 'terra-list';
import ApplicationMenuLayout from 'terra-application-menu-layout';
import RoutingStackDelegate from 'terra-navigation-layout/lib/RoutingStackDelegate';
import MenuToolbar from './MenuToolbar';

import './MenuList.scss';

const propTypes = {
  routingStackDelegate: RoutingStackDelegate.propType,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
  links: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    path: PropTypes.string,
    text: PropTypes.string,
    hasSubNav: PropTypes.bool,
  })),
  headerText: PropTypes.string,
};

const generateMenuLinks = (links, location) => {
  const navLinks = !!links && links.map(link =>
    <List.Item
      key={link.id}
      hasChevron={link.hasSubNav}
      content={
        <NavLink
          key={link.id}
          className="menu-link"
          location={location}
          to={link.path}
          activeStyle={{
            fontWeight: 'bold',
          }}
        >
          {link.text}
        </NavLink>}
    />);

  return (<List>{navLinks}</List>);
};

const MenuList = ({ routingStackDelegate, links, headerText, location }) => (
  <ApplicationMenuLayout
    header={<MenuToolbar text={headerText} routingStackDelegate={routingStackDelegate} />}
    content={generateMenuLinks(links, routingStackDelegate.location || location)}
  />
);

MenuList.propTypes = propTypes;

export default withRouter(MenuList);
