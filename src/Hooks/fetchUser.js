const DOMAIN_NAME = import.meta.env.VITE_API_BASE_URL;

export const fetchUser = async ({ queryKey }) => {
  const uid = queryKey[1];

  const user = await fetch(`${DOMAIN_NAME}/api/auth/user/${uid}`);

  const userRes = await user.json();

  if (userRes.status === "success") {
    return userRes;
  }
};
