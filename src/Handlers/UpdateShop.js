const DOMAIN_NAME = import.meta.env.VITE_DOMAIN_NAME;
export const updateshop = async (data, publicid) => {
  const user = await fetch(`${DOMAIN_NAME}/api/shop/updateshop`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify({
      shop_name: data.shop_name,
      shop_address: data.shop_address,
      publicid,
    }),
  });

  return user.json();
};
