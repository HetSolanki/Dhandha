/* eslint-disable react/no-children-prop */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./Components/UI/UI-Components/SignIn";
import SignUp from "./Components/UI/UI-Components/SignUp";
import { Dashboard } from "./Components/Section/Dashboard";
import Customers from "./Components/Section/Customers";
import SettingsProfilePage from "./Components/Section/forms/MainPage";
import SettingsLayout from "./Components/Section/forms/layout";
import SettingsShopDetailsPage from "./Components/Section/forms/shopdeatis/page";
import CustomerEntry from "./Components/Section/CustomerEntry";
import CustomerEntryData from "./Components/Section/CustomerEntryData";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customerentry" element={<CustomerEntry />} />
          <Route path="/customerentrydata" element={<CustomerEntryData />} />
          <Route
            path="/profile"
            element={<SettingsLayout children={<SettingsProfilePage />} />}
          />
          <Route
            path="/shopdetails"
            element={<SettingsLayout children={<SettingsShopDetailsPage />} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
