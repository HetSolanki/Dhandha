export const GetCustomerInvoice = async (querykeys) => {
  const customerEntry = await fetch(
    "http://localhost:3001/api/customerentry/getCustomerInvoice",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cid: querykeys[1],
      }),
    }
  );

  return customerEntry.json();
};
