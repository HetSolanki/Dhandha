/* eslint-disable react/prop-types */
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext({
  user: null,
});

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");

  const userToken = jwtDecode(token);

  useEffect(() => {
    const fetchUserData = async () => {
      const userDetails = await fetch(
        `http://localhost:3001/api/shop/getshop/${userToken.id}`,
        {
          method: "GET",
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );

      const userRes = await userDetails.json();
      setUser(userRes.data);
    };

    fetchUserData();
  }, []);

  const updateUserContext = async () => {
    const token = localStorage.getItem("token");
    const userToken = jwtDecode(token);
    const userDetails = await fetch(
      `http://localhost:3001/api/shop/getshop/${userToken.id}`,
      {
        method: "GET",
        headers: {
          authorization: "Bearer " + token,
        },
      }
    );
    const userRes = await userDetails.json();
    setUser(userRes.data);
  };

  const value = { user, updateUserContext };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUser = () => {
  return useContext(UserContext);
};
