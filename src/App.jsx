import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./Components/UI/SignIn";
import SignUp from "./Components/UI/SignUp";
import Home from "./Components/Section/Home";
import { Dashboard } from "./Components/Section/Dashboard";
import Navbar from "./Components/Section/Navbar";
import Customers from "./Components/Section/Customers";

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/customers" element={<Customers />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
