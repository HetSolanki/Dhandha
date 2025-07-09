const DOMAIN_NAME = import.meta.env.VITE_API_BASE_URL;

export const GetAllCustomerInvoice = async () => {
  const customerEntry = await fetch(
    `${DOMAIN_NAME}/api/customerentry/getAllCustomerInvoice`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return customerEntry.json();
};
