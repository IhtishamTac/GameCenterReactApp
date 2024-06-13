import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const LoginPage = lazy(() => import('./pages/LoginPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));

const DiscoverGamesPage = lazy(() => import('./pages/user/DiscoverGamesPage'));
const DetailGamePage = lazy(() => import('./pages/user/DetailGamePage'));
const ProfilePage = lazy(() => import('./pages/user/ProfilePage'));

const ListAdminPage = lazy(() => import('./pages/admin/ListAdminPage'));
const ListUserPage = lazy(() => import('./pages/admin/ListUserPage'));
const AddUserPage = lazy(() => import('./pages/admin/AddUserPage'));
const UpdateUserPage = lazy(() => import('./pages/admin/UpdateUserPage'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />

        <Route path="/discover-games" element={<DiscoverGamesPage />} />
        <Route path="/detail-game/:slug" element={<DetailGamePage />} />
        <Route path="/profile/:username" element={<ProfilePage />} />

        <Route path="/list-admin" element={<ListAdminPage />} />
        <Route path="/list-user" element={<ListUserPage />} />
        <Route path="/add-user" element={<AddUserPage />} />
        <Route path="/update-user/:id/:paramUsername" element={<UpdateUserPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
