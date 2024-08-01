const DOMAIN_NAME = import.meta.env.VITE_DOMAIN_NAME;

export const Addshopname = async (cid, name) => {
  const user = await fetch(`${DOMAIN_NAME}/api/auth/user/${cid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      shop_name: name,
    }),
  });

  return user.json();
};
