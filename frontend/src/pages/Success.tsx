import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Loader from "../components/Utils/Loader";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, 1500);
  }, []);

  setTimeout(() => {
    navigate("/");
  }, 2000);

  return (
    <>
      <Loader />
      <div className="window-container">
        <h1>Redirecting You...</h1>
      </div>
    </>
  );
};

export default Success;
