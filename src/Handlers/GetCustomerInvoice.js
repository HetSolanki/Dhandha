export const GetCustomerInvoice = async (cid) => {
  const customerEntry = await fetch(
    `http://localhost:3001/api/customerentry/getCustomerInvoice/${cid}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    }
  );

  return customerEntry.json();
};
