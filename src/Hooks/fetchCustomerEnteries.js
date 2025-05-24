const DOMAIN_NAME = import.meta.env.VITE_DOMAIN_NAME;

export const fetchCustomerEnteries = async (cid) => {
  const customerEnteries = await fetch(
    `${DOMAIN_NAME}/api/customerentry/getallcustomerentry/${cid}`,
    {
      method: "GET",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );

  const res = await customerEnteries.json();

  return res;
};
