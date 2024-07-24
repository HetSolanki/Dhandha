const DOMAIN_NAME = import.meta.env.VITE_DOMAIN_NAME;

export const updateUser = async (data, uid) => {
  const user = await fetch(`${DOMAIN_NAME}/api/auth/user/${uid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fname: data.fname,
      lname: data.lname,
      phone_number: data.phone_number,
      email: data.email,
    }),
  });

  return user.json();
};
