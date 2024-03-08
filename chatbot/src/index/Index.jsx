import SendbirdApp from "@sendbird/uikit-react/App";
import "@sendbird/uikit-react/dist/index.css";
import { useNavigate } from "react-router";

function Index() {
  const authId = localStorage.getItem("authId")
  const navigate = useNavigate()
  const appId = import.meta.env.VITE_APP_ID;
  const userId = import.meta.env.VITE_USER_ID;
  const logoutHandler = () => {
    localStorage.removeItem("authId");
    navigate('/login')
  };
  return (
    <div className="App">
      <div className="d-flex justify-content-between align-items-center py-2 px-5">
        <h3>Ai-Chat</h3>
        <h5 onClick={logoutHandler}>Logout</h5>
      </div>
      <SendbirdApp
        appId={appId} // Use environment variable for Sendbird application ID
        userId={authId || null} // Use environment variable for user ID
      />
    </div>
  );
}

export default Index;
