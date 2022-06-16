import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PageRender } from './PageRender';


function App() {
  return(
    <Router>
      <input type={'checkbox'} id='theme'></input>
      <div className='App'>
        <Routes className='main'>
          <Route path='/:page' element={<PageRender />} />
          <Route path='/:page/:id' element={<PageRender />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;