import LandingPage from "./components/page/LandingPage";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SignUpForm from "./components/forms/SignUp";
import LogIn from "./components/forms/LogIn";
import Todo from "./components/page/Todo";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
function App() {
  const [user, setUser] = useState(null)
  const auth = getAuth()

   useEffect(() => {
     // Set up the auth state listener
     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
       if (currentUser) {
         setUser(currentUser);
       } else {
         setUser(null);
       }
     });

     // Cleanup subscription on unmount
     return () => unsubscribe();
   }, [auth]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/todo" /> : <LogIn />}
          />
          <Route
            path="/todo"
            element={user ? <Todo /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App
