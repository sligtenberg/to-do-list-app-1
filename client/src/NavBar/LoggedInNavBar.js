import { useContext } from 'react';
import { UserContext } from '../Context/user';
import { NavLink } from 'react-router-dom'

function LoggedInNavBar() {
  const { setUser } = useContext(UserContext)

  // delete user's session 
  function handleLogout() {
    fetch('/logout', {method: 'DELETE'})
    .then(rspns => {
      if (rspns.ok) setUser(null)
      else alert('Something went wrong')
    })
  }

  return (
    <nav>
      <NavLink to='/'>
        <button onClick={handleLogout} className='float-right'>Log Out</button>
      </NavLink>
    </nav>
  );
}

export default LoggedInNavBar;
