export const createUser = async (data) => {
  const user = await fetch("http://localhost:3001/api/auth/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phone_number: data.phone_number,
      email: data.email,
      password: data.password,
    }),
  });

  return user.json();
};
