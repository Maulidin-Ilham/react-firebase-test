import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import DetailPost from "./pages/DetailPost";
import AddPost from "./pages/AddPost";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/protected-route";

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
        <Route path="/:postId" element={<DetailPost />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
