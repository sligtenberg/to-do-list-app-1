import { Routes, Route } from 'react-router-dom';
import ListsContainer from './Lists/ListsContainer';
import Home from './Home';
import NewList from './NewList';

function MainPageContainer() {
  return (
    <Routes>
      <Route path='/home' element={<Home />} />
      <Route path='/lists' element={<ListsContainer />} />
      <Route path='/new_list' element={<NewList />} />
      <Route exact path='/' element={<Home />} />
      <Route path='*' element={<h1>404 not found</h1>} />
    </Routes>
  );
}

export default MainPageContainer;
