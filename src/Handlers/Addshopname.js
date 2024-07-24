export const Addshopname = async (cid, name) => {
  const user = await fetch(
    `http://localhost:3001/api/auth/user/${cid}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shop_name: name,
      }), 
    }
  );

  return user.json();
};
