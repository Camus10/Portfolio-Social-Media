import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PageRender } from './PageRender';
import Home from './pages/home';
import Login from './pages/login';


function App() {
  return(
    <Router>
      <input type={'checkbox'} id='theme'></input>
      <div className='App'>
        <Routes className='main'>
          <Route path='/' element={<Login />} />
          <Route path='/:page' element={<PageRender />} />
          <Route path='/:page/:id' element={<PageRender />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;