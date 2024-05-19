import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./Components/UI/SignIn";
import SignUp from "./Components/UI/SignUp";
import Home from "./Components/Section/Home";
import { Dashboard } from "./Components/Section/Dashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
