export const updateshop = async (data, uid, publicid) => {
  const user = await fetch(`http://localhost:3001/api/shop/updateshop`, {
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
