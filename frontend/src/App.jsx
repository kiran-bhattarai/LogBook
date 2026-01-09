import LoginPage from "./LoginPage"
import { Routes, Route } from "react-router-dom"
import ForgotPassword from "./ForgotPassword"
import SignupPage from "./SignupPage"

function App() {

  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  )
}

export default App
