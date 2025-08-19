const DOMAIN_NAME = import.meta.env.VITE_API_BASE_URL;

export const createPaymentLink = async (data) => {
  const response = await fetch(
    `${DOMAIN_NAME}/api/paymentlink/createpaymentlink`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: data.amount,
        description: data.description,
        customer_email: data.customer_email,
        customer_name: data.customer_name,
        customer_phone: data.customer_phone,
        smsnotify: data.smsnotify,
        emailnotify: data.emailnotify,
        reminder_enable: data.reminder_enable,
        account: data.account_number,
      }),
    }
  );

  return response.json();
};
