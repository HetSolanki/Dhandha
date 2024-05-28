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
      setUser(userRes);
    };

    fetchUserData();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export const useUser = () => {
  return useContext(UserContext);
};
