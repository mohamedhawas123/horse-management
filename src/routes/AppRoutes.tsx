import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInPage from "../pages/SignInPage";
// import HorsesPage from "../pages/HorsesPage";
// import HorseDetailsPage from "../pages/HorseDetailsPage";
import ProtectedRoute from "./ProtectedRoute";
import HorsesPage from "../pages/HorsesPage";
import HorseDetailsPage from "../pages/HorseDetailsPage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/signin" element={<SignInPage />} />

        {/* Protected */}
        <Route
          path="/horses"
          element={
            <ProtectedRoute>
              <HorsesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/horses/:id"
          element={
            <ProtectedRoute>
              <HorseDetailsPage />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<SignInPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
