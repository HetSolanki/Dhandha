export const fetchUser = async ({ queryKey }) => {
  const uid = queryKey[1];

  const user = await fetch(`http://localhost:3001/api/auth/user/${uid}`);

  const userRes = await user.json();

  if (userRes.status === "success") {
    return userRes;
  }
};
