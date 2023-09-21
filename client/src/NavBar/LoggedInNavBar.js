import { useContext } from 'react';
import { UserContext } from '../Context/user';
import { useNavigate } from 'react-router-dom'

function LoggedInNavBar() {
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

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
      <button onClick={() => navigate('/')}>Lists</button>
      <button onClick={() => navigate('/instructions')}>Instructions</button>
      <button className='float-right' onClick={() => {
        navigate('/')
        handleLogout()
      }}>Log Out</button>
    </nav>
  );
}

export default LoggedInNavBar;
