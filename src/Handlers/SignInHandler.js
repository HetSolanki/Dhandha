export const signinuser = async (data) => {
  const user = await fetch("http://localhost:3001/api/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authentication: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify({
      phone_number: data.phone_number,
      password: data.password,
    }),
  });

  const response = await user.json();
  return response;
};
