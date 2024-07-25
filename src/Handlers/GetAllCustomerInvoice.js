export const GetAllCustomerInvoice = async () => {
  const customerEntry = await fetch(
    `http://localhost:3001/api/customerentry/getAllCustomerInvoice`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return customerEntry.json();
};
