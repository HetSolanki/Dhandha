const DOMAIN_NAME = import.meta.env.VITE_API_BASE_URL;

export const getadmindashborddata = async () => {
 
  const data = await fetch(`${DOMAIN_NAME}/api/auth/admin/admindashboardData`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  if (!data.ok) {
    console.log(data);
  }

  let res = {
    status: data.status,
    data: await data.json(),
  };

  return res;
};
