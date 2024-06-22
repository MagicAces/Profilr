import { useSelector } from "react-redux";
import Student from "./Student";
import Default from "./Default";

const Content = () => {
  const { userInfo } = useSelector((state: any) => state.auth);

  return (
    <>
      <div className="home-container-content">
        {userInfo?.student ? <Student /> : <Default />}
      </div>
    </>
  );
};

export default Content;
