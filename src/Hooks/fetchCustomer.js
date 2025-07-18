const DOMAIN_NAME = import.meta.env.VITE_API_BASE_URL;

export const fetchCustomer = async (querykeys) => {
  const userId = querykeys.queryKey[1];
  if (userId) {
    const res = await fetch(
      `${DOMAIN_NAME}/api/customers/customer/${userId}`
    );
    const res_json = await res.json();
    return res_json;
  }
};
