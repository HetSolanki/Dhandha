const DOMAIN_NAME = import.meta.env.VITE_DOMAIN_NAME;

export const sendOtp = async (data) => {
  const verification = await fetch(`${DOMAIN_NAME}/api/auth/sendotp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phone_number: data.phone_number,
    }),
  });

  return verification.json();
};
