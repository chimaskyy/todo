import LandingPage from "./components/page/LandingPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpForm from "./components/forms/SignUp";
import LogIn from "./components/forms/LogIn";
import Todo from "./components/page/Todo";
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </Router>
    </>
  );
}

export default App
