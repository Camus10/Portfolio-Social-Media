import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PageRender } from './PageRender';
import Home from './pages/home';
import Login from './pages/login';
import Notify from './components/notify/notify';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { refreshToken } from './redux/actions/authAction';


function App() {
  const { authReducer } = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  return(
    <Router>
      <Notify />
      <input type={'checkbox'} id='theme'></input>
      <div className='App'>
        <Routes className='main'>
          <Route path='/' element={authReducer.token ? <Home /> : <Login />} />
          <Route path='/:page' element={<PageRender />} />
          <Route path='/:page/:id' element={<PageRender />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;