import { useContext, useState } from 'react';
import { UserContext } from '../Context/user';

function LoggedOutNavBar() {
  const [loginMode, setLoginMode] = useState(true)
  const { setUser } = useContext(UserContext)

  // if logging in, create a session for the user
  // if createing an account, create a new user, and start a session for them
  function handleSubmit(e) {
    e.preventDefault()
    fetch((loginMode ? '/login' : '/users'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: e.target[2].value,
        password: e.target[3].value
      })
    })
    .then(rspns => {
      if(rspns.ok) rspns.json().then(setUser)
      else rspns.json().then(rspns => alert(rspns.errors))
    })
  }

  return (
    <nav>
      <form onSubmit={handleSubmit}>
        Log In<input
          type='radio'
          name='loginModeToggle'
          defaultChecked
          onClick={() => setLoginMode(true)}/>
        Create Account<input
          type='radio'
          name='loginModeToggle'
          onClick={() => {
            setLoginMode(false)
            alert("DO NOT USE A PASSWORD YOU USE FOR ANY OTHER SITE")
          }}/>
        <span className='float-right'>
          <input placeholder='username' autoFocus/>
          <input type='password' placeholder='password'/>
          <input
            type='submit'
            value={loginMode ? 'Log In' : 'Create Account'}/>
        </span>
      </form>
    </nav>
  );
}

export default LoggedOutNavBar;
