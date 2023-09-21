import { Routes, Route, useLocation, Outlet, useNavigate } from 'react-router-dom';
import ListsContainer from './Lists/ListsContainer';
import Instructions from './Instructions';
import NewList from './Modals/NewList';
import CollaboratorsContainer from './Modals/CollaboratorsContainer';

function LoggedInMain() {
  const location = useLocation()
  const background = location.state && location.state.background
  const navigate = useNavigate()

  return (
    <div>
      <Routes location={background || location}>
        <Route path='/' element={
          <div>
            <ListsContainer />
            <button onClick={() => navigate('/new_list')} state={{ background: location }} className='new-list-btn'>
              Create New List
            </button>
            <Outlet />
          </div>} >
          <Route path='/new_list' element={<NewList />} />
          <Route path='/collaborators/:id' element={<CollaboratorsContainer />} />
        </Route>
        <Route path='/instructions' element={<Instructions />} />
        <Route path='*' element={<h1>404 not found</h1>} />
      </Routes>
      {background && (
        <Routes>
          <Route path='/new_list' element={<NewList />} />
          <Route path='/collaborators/:id' element={<CollaboratorsContainer />} />
        </Routes>
      )}
    </div>
  );
}

export default LoggedInMain;
