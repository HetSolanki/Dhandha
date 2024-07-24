/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const PaymentDetailContext = createContext();

export default function PaymentDetailProvider({ children }) {
  const [paymentdata, setPaymentdata] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPaymentData = async () => {
      const paymentDetails = await fetch(
        `http://localhost:3001/api/customers/customerall`,
        {
          method: "GET",
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
      const paymentRes = await paymentDetails.json();
      setPaymentdata(paymentRes.data);
      console.log(paymentRes.data);
    };
    if (token)
      fetchPaymentData();
      
  }, []);

  const updatePaymentDetailContext = async () => {
    const paymentDetails = await fetch(
      `http://localhost:3001/api/customers/customerall`,
      {
        method: "GET",
        headers: {
          authorization: "Bearer " + token,
        },
      }
    );

    const paymentRes = await paymentDetails.json();
    setPaymentdata(paymentRes.data);
  };

  const value = { paymentdata, updatePaymentDetailContext };
  return (
    <PaymentDetailContext.Provider value={value}>
      {children}
    </PaymentDetailContext.Provider>
  );
}

export const usePaymentDetail = () => {
  return useContext(PaymentDetailContext);
};
