const DOMAIN_NAME = import.meta.env.VITE_API_BASE_URL;

export const fetchCustomers = async () => {
  const res = await fetch(`${DOMAIN_NAME}/api/customers/customerall`, {
    method: "GET",
    headers: {
      authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  const res_json = await res.json();
  return res_json;
};
