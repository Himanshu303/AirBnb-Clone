import { useContext, useState } from "react";
import { UserContext } from "../Context/UseContext";
import { Navigate } from "react-router-dom";
import LoadingBar from "./LoadingBar";
import axios from "axios";
import AccountNav from "./AccountNav";

const AccountPage = () => {
  const { ready, user, setUser } = useContext(UserContext);

  const [redirect, setRedirect] = useState(false);

  const logout = async () => {
    await axios.post("/logout");
    setUser(null);
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  if (!ready) {
    return <LoadingBar />;
  }

  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div>
      <AccountNav />
      {"account" && (
        <div className="text-center max-w-xs mx-auto">
          Logged in as {user?.email}
          <button onClick={logout} className="primary  max-w-xs mt-2 ">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
