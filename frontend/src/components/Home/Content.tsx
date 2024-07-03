import { useSelector } from "react-redux";
import Student from "./Student";
import Default from "./Default";

const Content = () => {
  const { userInfo } = useSelector((state: any) => state.auth);
  const { loading } = useSelector((state: any) => state.profile);

  return (
    <>
      <div className="home-container-content">
        {!loading && !userInfo?.student ? <Default /> : <Student /> }
      </div>
    </>
  );
};

export default Content;
