import { useNavigate } from "react-router-dom";

import { MdHome } from "react-icons/md";

import "../css/notfound.css";
import logo from "../assets/Profilr.png";
import Starfield from "react-starfield";

const Error = () => {
  const navigate = useNavigate();
  return (
    <>
      <Starfield
        starCount={50}
        starColor={[138, 138, 138]}
        speedFactor={0.5}
        backgroundColor="black"
      />
      <div className="not-found">
        <div className="not-found-body">
          <div className="not-found-body-top">
            <img src={logo} alt="error" />
            <div className="not-found-body-top-text">
              <h1>503 Error</h1>
              <p>Oops... Sorry. Error Occured</p>
            </div>
          </div>
          <button onClick={() => navigate("/")}>
            <MdHome />
            <span>Back to Home</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Error;
