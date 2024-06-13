import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const LoginPage = lazy(() => import('./pages/LoginPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));

const DiscoverGamesPage = lazy(() => import('./pages/user/DiscoverGamesPage'));


function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />

        <Route path="/discover-games" element={<DiscoverGamesPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
