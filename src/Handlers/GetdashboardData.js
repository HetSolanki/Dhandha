export const GetdashboardData = async () => {
  const data = await fetch(
    `http://localhost:3001/api/customerentry/getdashboarddata/`,
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
