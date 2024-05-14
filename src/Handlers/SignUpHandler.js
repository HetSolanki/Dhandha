export const createUser = async (data) => {
  const user = await fetch("http://localhost:3001/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phone_number: data.get("phone_number"),
      email: data.get("email"),
      password: data.get("password"),
    }),
  });




  return user;  
};
