import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./Components/UI/UI-Components/SignIn";
import SignUp from "./Components/UI/UI-Components/SignUp";
import Home from "./Components/Section/Home";
import { Dashboard } from "./Components/Section/Dashboard";
import Customers from "./Components/Section/Customers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "./Context/UserContext";

function App() {
  const queryClient = new QueryClient();
  const user = jwtDecode(localStorage.getItem("token"));
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider value={user}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/home" element={<Home />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/customers" element={<Customers />} />
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </QueryClientProvider>
    </>
  );
}

export default App;
