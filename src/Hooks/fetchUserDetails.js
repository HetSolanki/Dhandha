export const fetchUserDetails = async ({ queryKey }) => {
  const uid = queryKey[1];

  const user = await fetch(`http://localhost:3001/api/shop/getshop/${uid}`, {
    method: "GET",
    headers: {
      authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  const userRes = await user.json();

  if (userRes.status === "success") {
    return userRes;
  }
};
