const DOMAIN_NAME = import.meta.env.VITE_DOMAIN_NAME;

export const signinuser = async (data) => {
  try {
    const response = await fetch(`${DOMAIN_NAME}/api/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone_number: data.phone_number,
        password: data.password,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error signing in user:", error);
    throw error;
  }
};
