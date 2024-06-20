export const createPaymentLinkAll = async () => {
  const allCustomers = await fetch(
    `http://localhost:3001/api/paymentlink/createpaymentlinkall`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: "Payment for Bottles",
        smsnotify: true,
        emailnotify: false,
        reminder_enable: false,
      }),
    }
  );

  return allCustomers.json();
};
