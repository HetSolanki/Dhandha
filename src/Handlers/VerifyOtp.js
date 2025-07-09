const DOMAIN_NAME = import.meta.env.VITE_API_BASE_URL;

export const VerifyOtp = async (data, phone_number) => {
  const verification = await fetch(`${DOMAIN_NAME}/api/auth/verifyotp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phone_number: phone_number,
      otp: data.pin,
    }),
  });
  return verification.json();
};
