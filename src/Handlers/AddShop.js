const DOMAIN_NAME = import.meta.env.VITE_API_BASE_URL;

export const createShop = async (data) => {
  const shop = await fetch(`${DOMAIN_NAME}/api/shop/createshop`, {
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
