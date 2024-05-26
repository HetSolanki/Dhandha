export const fetchCustomers = async () => {
  const res = await fetch("http://localhost:3001/api/customers/customerall", {
    method: "GET",
    headers: {
      authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  const res_json = await res.json();
  return res_json;
};
