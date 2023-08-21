import { useContext } from 'react';
import { UserContext } from '../Context/user';
import LoggedInNavBar from './LoggedInNavBar';
import LoggedOutNavBar from './LoggedOutNavBar';
import './nav.css'

function NavBarContainer() {
  const { user } = useContext(UserContext)

  return (
    user ? 
      <LoggedInNavBar /> :
      <LoggedOutNavBar />
  );
}

export default NavBarContainer;
