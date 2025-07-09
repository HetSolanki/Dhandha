
const DOMAIN_NAME = import.meta.env.VITE_API_BASE_URL;

export const GetAllUsers = async () => {
  const users = await fetch(
    `${DOMAIN_NAME}/api/auth/userall`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return users.json();
};


export const AddNewUser = async (data) => {
    console.log(data);
  const users = await fetch(
    `${DOMAIN_NAME}/api/auth/user`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    }
  );

  console.log(users);

  return users.json();
}

export const UpdateUser = async (data) => {
  const users = await fetch(
    `${DOMAIN_NAME}/api/auth/user/${data._id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    }
  );

  return users.json();
}

export const DeleteUser = async (id) => {
  const users = await fetch(
    `${DOMAIN_NAME}/api/auth/user/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  const res = {
    status: users.status,
    data: await users.json(),
  }

  return res;
}

export const GetOneUser = async (id) => {
  const users = await fetch(
    `${DOMAIN_NAME}/api/auth/user/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return users.json();
}
