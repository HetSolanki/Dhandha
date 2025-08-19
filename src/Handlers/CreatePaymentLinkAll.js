const DOMAIN_NAME = import.meta.env.VITE_API_BASE_URL;

export const createPaymentLinkAll = async () => {
  const allCustomers = await fetch(
    `${DOMAIN_NAME}/api/paymentlink/createpaymentlinkall`,
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
