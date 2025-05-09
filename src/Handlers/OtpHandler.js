console.log("VITE_DOMAIN_NAME:", import.meta.env.VITE_DOMAIN_NAME);
const DOMAIN_NAME = import.meta.env.VITE_DOMAIN_NAME;

export const sendOtp = async (data) => {
  const response = await fetch(`${DOMAIN_NAME}/api/otp/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phone: data.phone,
    }),
  });

  const result = await response.json();
  return result;
}

export const verifyOtp = async (data) => {
  const response = await fetch(`${DOMAIN_NAME}/api/otp/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phone: data.phone,
      otp: data.otp,
    }),
  });

  const result = await response.json();
  return result;
}