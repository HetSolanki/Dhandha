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
import { ThemeProvider, useTheme } from "./Context/ThemeProviderContext ";
import Invoice from "./Components/Section/Invoice";
import { useEffect, useState } from "react";
import SettingsNotificationsPage from "./Components/Section/forms/notifications/page";
import Error from "./Components/Section/404";
import ComingSoonPage from "./Components/Section/ComingSoonPage";
import UnderConstructionPage from "./Components/Section/UnderConstructionPage";
import Invoicex from "./Components/Section/Invoicex";
import PaymentDetails from "./Components/Section/PaymentDetails";
import PaymentsEntryData from "./Components/Section/PaymentsEntryData";
import LandingPage from "./Components/Section/LandingPage";
import { SkeletonTheme } from "react-loading-skeleton";

function App() {
  const [defaultRoute, setDefaultRoute] = useState("/mainpage");
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  useEffect(() => {
    const savedDefaultRoute = localStorage.getItem("defaultRoute");
    if (savedDefaultRoute) {
      setDefaultRoute(savedDefaultRoute);
    }
  }, []);


  return (    
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <SkeletonTheme
          baseColor={`${mediaQuery.matches ? "#1c1c1c" : ""}`}
          highlightColor={`${mediaQuery.matches ? "#525252" : ""}`}
        >
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={<Navigate to={defaultRoute} replace />}
              />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signupdp" element={<SignUp />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/customerentry" element={<CustomerEntry />} />
              <Route
                path="/customerentrydata"
                element={<CustomerEntryData />}
              />
              <Route path="/paymentdetails" element={<PaymentDetails />} />
              <Route path="/paymentsdata" element={<PaymentsEntryData />} />
              <Route path="/invoice" element={<Invoice />} />
              <Route path="/invoicex" element={<Invoicex />} />
              <Route path="/mainpage" element={<LandingPage />} />
              <Route
                path="/profile"
                element={<SettingsLayout children={<SettingsProfilePage />} />}
              />
              <Route
                path="/notifications-settings"
                element={
                  <SettingsLayout children={<SettingsNotificationsPage />} />
                }
              />
              {/* <Route
              path="/bankdetails"
              element={<SettingsLayout children={<SettingsBankDetailsPage />} />}
            /> */}
              <Route
                path="/shopdetails"
                element={
                  <SettingsLayout children={<SettingsShopDetailsPage />} />
                }
              />
              <Route
                path="/displaydetails"
                element={
                  <SettingsLayout
                    children={
                      <SettingsSettingsDisplayPage
                        setDefaultRoute={setDefaultRoute}
                      />
                    }
                  />
                }
              />
              <Route path="/404" element={<Error />} />
              <Route path="/comming-soon" element={<ComingSoonPage />} />
              <Route
                path="/under-construction"
                element={<UnderConstructionPage />}
              />

              <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
          </BrowserRouter>
        </SkeletonTheme>
      </ThemeProvider>
    </>
  );
}

export default App;
