export const fetchCustomerEnteries = async (cid) => {
  const customerEnteries = await fetch(
    `http://localhost:3001/api/customerentry/getallcustomerentry/${cid}`,
    {
      method: "GET",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );

  const res = await customerEnteries.json();

  console.log(res);
  return res;
};
