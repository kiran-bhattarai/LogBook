import LoginPage from "./LoginPage"
import { Routes, Route } from "react-router-dom"
import ForgotPassword from "./ForgotPassword"
import SignupPage from "./SignupPage"
import NoteInput from "./NoteInput"
import NotesCard from "./NotesCard"
import NotesView from "./NotesView"
import Footer from "./Footer"
import Body from "./Body.jsx"
import NoteEditor from "./NoteEditor.jsx"
import ProfilePage from "./ProfilePage.jsx"
import SearchUsers from "./SearchUsers.jsx"
import UserItem from "./UserItem.jsx"
import Dashboard from "./Dashboard.jsx"
import AccessControl from "./AccessControl.jsx"
import ResetPassword from "./ResetPassword.jsx"
import VerifyEmail from "./VerifyEmail.jsx"

function App() {

  return (
    <Routes>
      <Route path="/item" element={<UserItem />} />
      <Route path="/search" element={<SearchUsers />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/editor" element={<NoteEditor />} />
      <Route path="/body" element={<Body />} />
      <Route path="/footer" element={<Footer />} />
      <Route path="/input" element={<NoteInput />} />
      <Route path="/view" element={<NotesView />} />
      <Route path="/card" element={<NotesCard />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/access-control" element={<AccessControl />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="*" element={<ProfilePage />} />
    </Routes>
  )
}

export default App
