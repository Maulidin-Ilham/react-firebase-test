import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import DetailPost from "./pages/DetailPost";
import AddPost from "./pages/AddPost";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/protected-route";
import Riwayat from "./pages/Riwayat";
import KalkulatorY from "./pages/KalkulatorY";
import KalkulatorInvestasi from "./pages/KalkulatorInvestasi";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/add-post"
          element={
            <ProtectedRoute>
              <AddPost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/riwayat"
          element={
            <ProtectedRoute>
              <Riwayat />
            </ProtectedRoute>
          }
        />
        <Route
          path="/kalkulator-investasi"
          element={
            <ProtectedRoute>
              <KalkulatorInvestasi />
            </ProtectedRoute>
          }
        />
        <Route
          path="/kalukator-y"
          element={
            <ProtectedRoute>
              <KalkulatorY />
            </ProtectedRoute>
          }
        />
        <Route path="/:postId" element={<DetailPost />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
