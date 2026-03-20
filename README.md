# LogBook

LogBook is a MERN-stack platform featuring private and public notes, user discovery, and a modern UI with adaptive themes. It includes infinite scrolling, full OAuth/email authentication, and a data-driven admin dashboard for user management.

> Deployment link: https://logbook-mauve.vercel.app/

## Features

### Authentication & Security
- Local login/signup with email verification
- OAuth login via Google & Facebook
- Password reset with expiring codes
- Role-based access (User/Admin)
- Rate limiting using Redis
- Logging using Winston
- Automatic admin assignment to first user

### Notes
- Create, read, update, and delete public/private notes
- Search your notes and view other users’ public notes

### Profiles & Customization
- Custom profile pictures via Cloudinary
- Search and view other users’ profiles
- Dark/light mode with system detection and manual toggle

### Admin Dashboard
- View users and notes statistics with charts
- Manage users: rename, remove profile pictures, promote/demote, or delete

### Frontend Experience
- Smooth UI with loading skeletons
- Infinite scrolling with TanStack Query

## How to run locally

1. **Install dependencies**     
Run `npm install` in both the **frontend** and **backend** folders.

2. **Setup environment variables**  
   - Rename the provided `.env.example` files in both frontend and backend folders to `.env`.  
   - Fill in the required values such as `ACCESS_TOKEN_SECRET`, `MONGO_URL`, etc.

3. **Start the backend**        
Navigate to backend folder and run `npm start` on terminal.

4. **Start the frontend**        
Navigate to frontend folder and run `npm run dev` on terminal.

5. **Open the app**     
Open your browser at http://localhost:5173

## Screenshots

<div style="display: flex; flex-direction: column; gap: 20px;">

  <!-- Row 1: Access Control -->
  <div style="display: flex; gap: 20px; justify-content: center;">
    <div style="text-align: center;">
      <img src="assets/Dark/AccessControl.png" alt="Dark Mode - Access Control" width="100%"/>
      <p>Dark Mode - Access Control</p>
    </div>
    <div style="text-align: center;">
      <img src="assets/Light/AccessControl.png" alt="Light Mode - Access Control" width="100%"/>
      <p>Light Mode - Access Control</p>
    </div>
  </div>

  <!-- Row 2: Avatar Change -->
  <div style="display: flex; gap: 20px; justify-content: center;">
    <div style="text-align: center;">
      <img src="assets/Dark/AvatarChange.png" alt="Dark Mode - Avatar Change" width="100%"/>
      <p>Dark Mode - Avatar Change</p>
    </div>
    <div style="text-align: center;">
      <img src="assets/Light/AvatarChange.png" alt="Light Mode - Avatar Change" width="100%"/>
      <p>Light Mode - Avatar Change</p>
    </div>
  </div>

  <!-- Row 3: Dashboard -->
  <div style="display: flex; gap: 20px; justify-content: center;">
    <div style="text-align: center;">
      <img src="assets/Dark/Dashboard.png" alt="Dark Mode - Dashboard" width="100%"/>
      <p>Dark Mode - Dashboard</p>
    </div>
    <div style="text-align: center;">
      <img src="assets/Light/Dashboard.png" alt="Light Mode - Dashboard" width="100%"/>
      <p>Light Mode - Dashboard</p>
    </div>
  </div>

  <!-- Row 4: Edit Note -->
  <div style="display: flex; gap: 20px; justify-content: center;">
    <div style="text-align: center;">
      <img src="assets/Dark/Edit.png" alt="Dark Mode - Edit Note" width="100%"/>
      <p>Dark Mode - Edit Note</p>
    </div>
    <div style="text-align: center;">
      <img src="assets/Light/Edit.png" alt="Light Mode - Edit Note" width="100%"/>
      <p>Light Mode - Edit Note</p>
    </div>
  </div>

  <!-- Row 5: Homepage -->
  <div style="display: flex; gap: 20px; justify-content: center;">
    <div style="text-align: center;">
      <img src="assets/Dark/Homepage.png" alt="Dark Mode - Homepage" width="100%"/>
      <p>Dark Mode - Homepage</p>
    </div>
    <div style="text-align: center;">
      <img src="assets/Light/Homepage.png" alt="Light Mode - Homepage" width="100%"/>
      <p>Light Mode - Homepage</p>
    </div>
  </div>

  <!-- Row 6: Profile -->
  <div style="display: flex; gap: 20px; justify-content: center;">
    <div style="text-align: center;">
      <img src="assets/Dark/Profile.png" alt="Dark Mode - Profile" width="100%"/>
      <p>Dark Mode - Profile</p>
    </div>
    <div style="text-align: center;">
      <img src="assets/Light/Profile.png" alt="Light Mode - Profile" width="100%"/>
      <p>Light Mode - Profile</p>
    </div>
  </div>

  <!-- Row 7: Reset Password -->
  <div style="display: flex; gap: 20px; justify-content: center;">
    <div style="text-align: center;">
      <img src="assets/Dark/ResetPassword.png" alt="Dark Mode - Reset Password" width="100%"/>
      <p>Dark Mode - Reset Password</p>
    </div>
    <div style="text-align: center;">
      <img src="assets/Light/ResetPassword.png" alt="Light Mode - Reset Password" width="100%"/>
      <p>Light Mode - Reset Password</p>
    </div>
  </div>

  <!-- Row 8: Search -->
  <div style="display: flex; gap: 20px; justify-content: center;">
    <div style="text-align: center;">
      <img src="assets/Dark/Search.png" alt="Dark Mode - Search" width="100%"/>
      <p>Dark Mode - Search</p>
    </div>
    <div style="text-align: center;">
      <img src="assets/Light/Search.png" alt="Light Mode - Search" width="100%"/>
      <p>Light Mode - Search</p>
    </div>
  </div>

  <!-- Row 9: Unauthenticated -->
  <div style="display: flex; gap: 20px; justify-content: center;">
    <div style="text-align: center;">
      <img src="assets/Dark/Unauthenticated.png" alt="Dark Mode - Unauthenticated" width="100%"/>
      <p>Dark Mode - Unauthenticated</p>
    </div>
    <div style="text-align: center;">
      <img src="assets/Light/Unauthenticated.png" alt="Light Mode - Unauthenticated" width="100%"/>
      <p>Light Mode - Unauthenticated</p>
    </div>
  </div>

</div>