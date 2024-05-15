export const signinuser = async (data) => {
    const user = await fetch("http://localhost:3001/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone_number: data.get("phone_number"),
        password: data.get("password"),
      }),
    });
    
    const response = await user.json();
    return response;
  };
  