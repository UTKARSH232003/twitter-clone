import './App.css'
import {Routes, Route, Navigate} from "react-router-dom";
import Login from "./pages/login/Login"
import Signup from "./pages/signup/SignUp"
import { Toaster } from 'react-hot-toast';
import Home from './pages/home/Home';
import { useAuthContext } from './context/AuthContext';
import People from './pages/people/People';
import Profile from './pages/profile/Profile';

function App() {
  const { authUser } = useAuthContext();
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
        <Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
				<Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
				<Route path='/signup' element={authUser ? <Navigate to='/' /> : <Signup />} />
        <Route path="/people" element={authUser ? <People /> : <Navigate to="/login" />} />
        <Route path="/profile/:query" element={authUser ? <Profile /> : <Navigate to="/login" />} />
      </Routes>
      <Toaster/>
    </div>
  )
}
export default App
