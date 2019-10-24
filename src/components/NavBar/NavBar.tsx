import React, { useState } from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import AuthNavItem from './AuthNavItem'
import '@fortawesome/fontawesome-free/css/all.css';

interface NavBarProps {
  isAuthenticated: boolean,
  user: any,
  authButtonMethod: React.MouseEventHandler<HTMLElement>
}

const NavBar: React.SFC<NavBarProps> = ({ isAuthenticated, user, authButtonMethod }) => {
  const [isOpen, setIsOpen] = useState(false)

  function toggle() {
    setIsOpen(!isOpen);
  }

  // Only show calendar nav item if logged in
  let calendarLink = null;
  if (isAuthenticated) {
    calendarLink = (
      <RouterNavLink to="/calendar" className="link dim gray f6 f5-ns dib mr3" exact>Calendar</RouterNavLink>
    );
  }

  let peopleLink = null;
  if (isAuthenticated) {
    peopleLink = (
      <RouterNavLink to="/people" className="link dim gray f6 f5-ns dib mr3" exact>People</RouterNavLink>
    );
  }

  return (
    <div>
      <nav className="pa3 pa4-ns">
        <RouterNavLink to="/" className="link dim black b f6 f5-ns dib mr3" exact>Home</RouterNavLink>
        {calendarLink}
        {peopleLink}
        <AuthNavItem
          isAuthenticated={isAuthenticated}
          authButtonMethod={authButtonMethod}
          user={user} />
      </nav>
    </div>
  );
}

export default NavBar
