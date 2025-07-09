const DOMAIN_NAME = import.meta.env.VITE_API_BASE_URL;

export const fetchUserDetails = async ({ queryKey }) => {
  const uid = queryKey[1];

  const user = await fetch(`${DOMAIN_NAME}/api/shop/getshop/${uid}`, {
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
