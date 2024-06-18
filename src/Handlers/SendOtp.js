export const sendOtp = async (data) => {
  const verification = await fetch("http://localhost:3001/api/auth/sendotp", {
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
