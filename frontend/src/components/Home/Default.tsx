import { useNavigate } from "react-router";
import welcome from "../../assets/welcome.svg";
import { PiStudent } from "react-icons/pi";
const Default = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="no-student-profile">
        <img src={welcome} alt={"welcome"} />
        {/* <p>No Student Profile Found</p> */}
        <button className="create-profile" onClick={() => navigate("/create")}>
          <PiStudent />
          <span>Create Profile</span>
        </button>
      </div>
    </>
  );
};

export default Default;
