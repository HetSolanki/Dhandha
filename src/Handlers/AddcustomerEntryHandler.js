const DOMAIN_NAME = import.meta.env.VITE_API_BASE_URL;

export const addcustomerEntry = async (data, cid) => {
  const customerentry = await fetch(
    `${DOMAIN_NAME}/api/customerentry/addcustomerentry`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        cid,
        bottle_count: data.no_of_bottles,
        delivery_date: new Date().toISOString().split("T")[0],
        delivery_status: data.delivery_status,
      }),
    }
  );

  return customerentry.json();
};
