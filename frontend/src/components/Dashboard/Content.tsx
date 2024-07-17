import { useDispatch, useSelector } from "react-redux";
// import Tabs from "./Tabs";
// import Requests from "./Requests";
import Register from "./Register";
import { MdClose, MdSearch, MdSearchOff } from "react-icons/md";
import { useState } from "react";
import { setSearch } from "../../redux/features/student/studentSlice";

const Content = () => {
  const { students, search } = useSelector((state: any) => state.student);
  const [showSearch, setShowSearch] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <div className="dashboard-container-content">
        {/* <Tabs /> */}
        <div className="history-row">
          <h3>History ({students.length})</h3>
          {showSearch ? (
            <span onClick={() => setShowSearch(false)}>
              <MdSearchOff />
            </span>
          ) : (
            <span onClick={() => setShowSearch(true)}>
              <MdSearch />
            </span>
          )}
        </div>
        {showSearch && (
          <div className="search-box">
            <MdSearch />
            <input
              type="text"
              value={search}
              placeholder="Search..."
              onChange={(e) => dispatch(setSearch(e.target.value))}
            />
            <MdClose onClick={() => dispatch(setSearch(""))} />
          </div>
        )}
        <Register />
        {/* {tab === 1 && <Requests />} */}
        {/* {tab === 2 && <Register />} */}
      </div>
    </>
  );
};

export default Content;
