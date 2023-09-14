import { Routes, Route, Link, useLocation, Outlet } from 'react-router-dom';
import ListsContainer from './Lists/ListsContainer';
import Instructions from './Instructions';
import NewList from './Lists/NewList';

function LoggedInMain() {
  const location = useLocation()
  const background = location.state && location.state.background

  return (
    <div>
      <Routes location={background || location}>
        <Route path='/' element={
          <div>
            <ListsContainer />
            <Link to='new_list' state={{ background: location }} >
              <button>New List</button>
            </Link>
            <Outlet />
          </div>} >
          <Route path='new_list' element={<NewList />} />
        </Route>
        <Route path='/instructions' element={<Instructions />} />
        {/* <Route exact path='/' element={<ListsContainer />} /> */}
        <Route path='*' element={<h1>404 not found</h1>} />
      </Routes>
      {background && (
        <Routes>
          <Route path='new_list' element={<NewList />} />
        </Routes>
      )}
    </div>
  );
}

export default LoggedInMain;
