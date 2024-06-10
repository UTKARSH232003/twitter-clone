import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter} from 'react-router-dom';
import App from './App.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx';
import { UserProvider } from './context/UserContext.jsx';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <UserProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
)