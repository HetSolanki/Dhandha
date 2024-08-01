const DOMAIN_NAME = import.meta.env.VITE_DOMAIN_NAME;

export const GetCustomerInvoice = async (cid) => {
  const customerEntry = await fetch(
    `${DOMAIN_NAME}/api/customerentry/getCustomerInvoice/${cid}`,
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
