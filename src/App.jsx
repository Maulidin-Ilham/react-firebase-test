import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DetailPost from "./pages/DetailPost";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:postId" element={<DetailPost />} />
      </Routes>
    </Router>
  );
};

export default App;
