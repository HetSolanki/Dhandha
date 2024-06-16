export const fetchCustomer = async (querykeys) => {
  const userId = querykeys.queryKey[1];
  if (userId) {
    const res = await fetch(
      `http://localhost:3001/api/customers/customer/${userId}`
    );
    const res_json = await res.json();
    return res_json;
  }
};
