// import { showToast } from "@jobber/components/Toast";
import { Navigate } from "react-router";

function Protect({ element }) {
  const userProfileSession = localStorage.getItem("authId");
  if (!userProfileSession || userProfileSession === null) {
    return <Navigate to={"/login"} />;
  } else {
    return element;
  }
}

export default Protect;
