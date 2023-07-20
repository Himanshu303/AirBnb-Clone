/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const handleCookieVerification = async () => {
      if (!user) {
        const { data: user } = await axios.get("/profile");
        setUser(user);
        setReady(true);
      }
    };
    handleCookieVerification();
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
