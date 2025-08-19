/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
const DOMAIN_NAME = import.meta.env.VITE_API_BASE_URL;
const CustomerContext = createContext();

export default function CustomerProvider({ children }) {
  const [customer, setCustomer] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCustomerData = async () => {
      const customerDetails = await fetch(
        `${DOMAIN_NAME}/api/customers/customerall`,
        {
          method: "GET",
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
      const customerRes = await customerDetails.json();
      setCustomer(customerRes.data);
     
    };
    if (token)
      fetchCustomerData();
      
  }, []);

  const updateCustomerContext = async () => {
    const customerDetails = await fetch(
      `${DOMAIN_NAME}/api/customers/customerall`,
      {
        method: "GET",
        headers: {
          authorization: "Bearer " + token,
        },
      }
    );

    const customerRes = await customerDetails.json();
    setCustomer(customerRes.data);
  };

  const value = { customer, updateCustomerContext };
  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
}

export const useCustomer = () => {
  return useContext(CustomerContext);
};
