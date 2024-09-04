const DOMAIN_NAME = import.meta.env.VITE_DOMAIN_NAME;

export const signinuser = async (data) => {
  const user = await fetch(`${DOMAIN_NAME}/api/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phone_number: data.phone_number,
      password: data.password,
    }),
  });

  const response = await user.json();
  return response;
};
