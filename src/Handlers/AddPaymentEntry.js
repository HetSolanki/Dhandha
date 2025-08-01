const DOMAIN_NAME = import.meta.env.VITE_API_BASE_URL;

export const addpaymententry = async (data, cid) => {
  const paymententry = await fetch(
    `${DOMAIN_NAME}/api/paymentdetails/addpaymentdetails`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        cid,
        amount: data.amount,
        payment_date: data.payment_date,
        payment_status: data.payment_status,
      }),
    }
  );

  return paymententry.json();
};
