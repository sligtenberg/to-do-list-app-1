import { useContext, useState } from 'react';
import { UserContext } from '../Context/user';

function LoggedOutNavBar() {
  const { setUser } = useContext(UserContext)

  const [loginMode, setLoginMode] = useState(true)
  const [formFields, setFormFields] = useState({
    username: '',
    password: ''
  })

  const handleFormFieldType = e =>
    setFormFields({...formFields, [e.target.name]: e.target.value})

  function setLoginModeFalse() {
    setLoginMode(false)
    alert("DO NOT USE A PASSWORD YOU USE FOR ANY OTHER SITE")
  }

  // if logging in, create a session for the user
  // if createing an account, create a new user, and start a session for them
  function handleSubmit(e) {
    e.preventDefault()
    fetch((loginMode ? '/login' : '/users'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formFields)
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
          onClick={setLoginModeFalse}/>
        <span className='float-right'>
          <input
            autoFocus
            placeholder='username'
            name='username'
            value={formFields.username}
            onChange={handleFormFieldType}/>
          <input
            type='password'
            placeholder='password'
            name='password'
            value={formFields.password}
            onChange={handleFormFieldType}/>
          <input
            type='submit'
            value={loginMode ? 'Log In' : 'Create Account'}/>
        </span>
      </form>
    </nav>
  );
}

export default LoggedOutNavBar;
