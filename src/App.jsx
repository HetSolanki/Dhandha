/* eslint-disable react/no-children-prop */
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./Components/UI/UI-Components/SignIn";
import SignUp from "./Components/UI/UI-Components/SignUp";
import { Dashboard } from "./Components/Section/Dashboard";
import Customers from "./Components/Section/Customers";
import SettingsProfilePage from "./Components/Section/forms/MainPage";
import SettingsLayout from "./Components/Section/forms/layout";
import SettingsShopDetailsPage from "./Components/Section/forms/shopdeatis/page";
import SettingsSettingsDisplayPage from "./Components/Section/forms/display/page";
import CustomerEntry from "./Components/Section/CustomerEntry";
import CustomerEntryData from "./Components/Section/CustomerEntryData";
import { ThemeProvider } from "./Context/ThemeProviderContext ";
import Invoice from "./Components/Section/Invoice";
import { useEffect, useState } from "react";
import SettingsNotificationsPage from "./Components/Section/forms/notifications/page";
import SettingsBankDetailsPage from "./Components/Section/forms/bankdetails/page";

function App() {
  const [defaultRoute, setDefaultRoute] = useState('/');

  useEffect(() => {
    const savedDefaultRoute = localStorage.getItem('defaultRoute');
    if (savedDefaultRoute) {
      setDefaultRoute(savedDefaultRoute);
    }
  }, []);

  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to={defaultRoute} replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/customerentry" element={<CustomerEntry />} />
            <Route path="/customerentrydata" element={<CustomerEntryData />} />
            <Route path="/invoice" element={<Invoice />} />
            <Route
              path="/profile"
              element={<SettingsLayout children={<SettingsProfilePage />} />}
            />
            <Route
              path="/notifications-settings"
              element={<SettingsLayout children={<SettingsNotificationsPage />} />}
            />
            <Route
              path="/bankdetails"
              element={<SettingsLayout children={<SettingsBankDetailsPage />} />}
            />
            <Route
              path="/shopdetails"
              element={
                <SettingsLayout children={<SettingsShopDetailsPage />} />
              }
            />
            <Route
              path="/displaydetails"
              element={
                <SettingsLayout children={<SettingsSettingsDisplayPage setDefaultRoute={setDefaultRoute} />} />
              }
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
