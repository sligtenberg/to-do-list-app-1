import { useContext } from 'react';
import { UserContext } from '../Context/user';
import LoggedInMain from './LoggedInMain';
import LoggedOutMain from './LoggedOutMain';

function MainPageContainer() {
  const { user } = useContext(UserContext)

  return user ? <LoggedInMain /> : <LoggedOutMain />;
}

export default MainPageContainer;
