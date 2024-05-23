import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./Components/UI/UI-Components/SignIn";
import SignUp from "./Components/UI/UI-Components/SignUp";
import { Dashboard } from "./Components/Section/Dashboard";
import Customers from "./Components/Section/Customers";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/customers" element={<Customers />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
