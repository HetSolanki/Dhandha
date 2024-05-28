export const createShop = async (data) => {
  
  const shop = await fetch("http://localhost:3001/api/shop/createshop", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify({
      shop_name: data.shop_name,
    }),
  });

  return shop.json();
};
