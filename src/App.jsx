/* eslint-disable react/no-children-prop */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./Components/UI/UI-Components/SignIn";
import SignUp from "./Components/UI/UI-Components/SignUp";
import { Dashboard } from "./Components/Section/Dashboard";
import Customers from "./Components/Section/Customers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "./Context/UserContext";
import SettingsProfilePage from "./Components/Section/forms/MainPage";
import SettingsLayout from "./Components/Section/forms/layout";
import SettingsAccountPage from "./Components/Section/forms/account/page";

function App() {
  const queryClient = new QueryClient();

  let user = null;
  if (localStorage.getItem("token") !== null) {
    user = jwtDecode(localStorage.getItem("token"));
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider value={user}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/customers" element={<Customers />} />
              <Route
                path="/profile"
                element={<SettingsLayout children={<SettingsProfilePage />} />}
              />
              {/* <Route
                path="/account"
                element={<SettingsLayout children={<SettingsAccountPage />} />}
              /> */}
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </QueryClientProvider>
    </>
  );
}

export default App;
