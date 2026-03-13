import { Routes, Route } from "react-router-dom"
import ProfilePage from "./pages/ProfilePage.jsx"
import ResetPassword from "./features/auth/components/ResetPassword.jsx"
import VerifyEmail from "./features/auth/components/VerifyEmail.jsx"
import Page404 from "./pages/Page404.jsx"
import AccessControlPage from "./pages/AccessControlPage.jsx"
import DashboardPage from "./pages/DashboardPage.jsx"
import HomePage from "./pages/HomePage.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import CheckVerified from "./components/CheckVerified.jsx"

function App() {

  return (
    <Routes>
      <Route path="/profile" element={<CheckVerified> <ProfilePage /> </CheckVerified>} />

      <Route path="/" element={<CheckVerified><HomePage />  </CheckVerified>} />

      <Route path="/dashboard" element={<ProtectedRoute role={"admin"}> <CheckVerified> <DashboardPage /> </CheckVerified> </ProtectedRoute>} />

      <Route path="/access-control" element={<ProtectedRoute role={"admin"}> <CheckVerified> <AccessControlPage /> </CheckVerified> </ProtectedRoute>} />

      <Route path="/reset-password" element={<ResetPassword/>} />

      <Route path="/verify-email" element={<ProtectedRoute > <VerifyEmail /> </ProtectedRoute>} />

      <Route path="*" element={<Page404 />} />

    </Routes>
  )
}

export default App
