// import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ThemeProvider from './context/ThemeContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import NavSearchProvider from './context/NavSearchContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <NavSearchProvider>
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  </NavSearchProvider>
  // </StrictMode >
)
