import { Routes, Route } from "react-router-dom"
import Body from "./pages/HomePage.jsx"
import ProfilePage from "./pages/ProfilePage.jsx"
import Dashboard from "./features/admin/components/Dashboard.jsx"
import AccessControl from "./features/admin/components/AccessControl.jsx"
import ResetPassword from "./features/auth/components/ResetPassword.jsx"
import VerifyEmail from "./features/auth/components/VerifyEmail.jsx"
import Page404 from "./pages/Page404.jsx"
import AccessControlPage from "./pages/AccessControlPage.jsx"
import DashboardPage from "./pages/DashboardPage.jsx"
import HomePage from "./pages/HomePage.jsx"

function App() {

  return (
    <Routes>
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/access-control" element={<AccessControlPage />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  )
}

export default App
