import { Routes, Route } from 'react-router-dom';
import Lists from './Lists';
import Home from './Home';

function MainPageContainer() {
  return (
    <Routes>
      <Route path='/home' element={<Home />} />
      <Route path='/lists' element={<Lists />} />
      <Route exact path='/' element={<Home />} />
      <Route path='*' element={<h1>404 not found</h1>} />
    </Routes>
  );
}

export default MainPageContainer;
