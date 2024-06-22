import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Loader from "../components/Utils/Loader";

const Failure = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const message = new URLSearchParams(location.search).get("message");

  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, 1500);
  }, []);

  setTimeout(() => {
    navigate("/");
  }, 2000);

  console.log(decodeURIComponent(message || ""));

  return (
    <>
      <Loader />
      <div className="window-container">
        <h1>{decodeURIComponent(message || "")}</h1>
      </div>
    </>
  );
};

export default Failure;
