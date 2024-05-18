import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DetailPost from "./pages/DetailPost";
import AddPost from "./pages/AddPost";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-post" element={<AddPost />} />
        <Route path="/:postId" element={<DetailPost />} />
      </Routes>
    </Router>
  );
};

export default App;
