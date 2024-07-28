const DOMAIN_NAME = import.meta.env.VITE_DOMAIN_NAME;

export const GetAllCustomerInvoice = async () => {
  const customerEntry = await fetch(
    `${DOMAIN_NAME}/api/customerentry/getAllCustomerInvoice`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return customerEntry.json();
};
