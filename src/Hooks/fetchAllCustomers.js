export const fetchCustomers = async () => {
  const res = await fetch("http://localhost:3001/api/customers/customerall");

  const res_json = await res.json();
  return res_json;
};
