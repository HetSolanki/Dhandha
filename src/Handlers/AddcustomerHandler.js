const DOMAIN_NAME = import.meta.env.VITE_API_BASE_URL;

export const addcustomer = async (data, uid) => {
  const customer = await fetch(`${DOMAIN_NAME}/api/customers/customer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      uid,
      cname: data.cname,
      cphone_number: data.cphone_number,
      caddress: data.caddress,
      bottle_price: data.bottle_price,
      delivery_sequence_number: data.delivery_sequence_number,
    }),
  });

  return customer.json();
};
