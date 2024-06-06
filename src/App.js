import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Authenticate/Login';
import SignUp from './Components/Authenticate/SignUp';
import Dashboard from './Components/Dashboard/Dashboard';
import { ToastContainer } from 'react-toastify';
import Bookshelf from './Components/Bookshelf/Bookshelf';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<Login />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/signup' element={<SignUp />}/>
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/bookshelf' element={<Bookshelf/>} />
      </Routes>
      <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
