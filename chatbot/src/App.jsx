import { Router, Route, Routes } from "react-router";
import "./App.css";
import Protect from "./helpers/Protect";
import Index from "./index/Index";
import Auth from "./auth/Auth";

const App = () => {
  return (
    <Routes>
      <Route index element={<Protect element={<Index />} />} exact />
      <Route path="/login" element={<Auth />} />
    </Routes>
  );
};

export default App;
