import { useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { UserContext } from "./Context/user";
import NavBarContainer from "./NavBar/NavBarContainer";
import MainPageContainer from "./MainPage/MainPageContainer";

function App() {
  const { setUser } = useContext(UserContext)

  useEffect(() => {
    // auto login - on page load, get request to '/me' looks for a user in the session
    // if found, the user is logged in and set to user in
    fetch('/me').then(rspns => {
      if (rspns.ok) rspns.json().then(userObj => setUser(userObj))
    })
  }, [setUser])

  return (
    <BrowserRouter className='app'>
      <h1>Collaborative</h1>
      <NavBarContainer />
      <MainPageContainer />
    </BrowserRouter>
  );
}

export default App;
