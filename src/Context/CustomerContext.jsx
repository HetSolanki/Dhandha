/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const CustomerContext = createContext();

export default function CustomerProvider({ children }) {
  const [customer, setCustomer] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCustomerData = async () => {
      const customerDetails = await fetch(
        `http://localhost:3001/api/customers/customerall`,
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

    fetchCustomerData();
  }, []);

  const updateCustomerContext = async () => {
    const customerDetails = await fetch(
      `http://localhost:3001/api/customers/customerall`,
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
