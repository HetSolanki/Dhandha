const DOMAIN_NAME = import.meta.env.VITE_API_BASE_URL;

export const GetdashboardData = async () => {
  const data = await fetch(
    `${DOMAIN_NAME}/api/customerentry/getdashboarddata/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );

  return data.json();
};
