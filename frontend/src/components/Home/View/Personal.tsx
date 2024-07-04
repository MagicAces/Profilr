import { MdCircle } from "react-icons/md";
import { TbUserEdit } from "react-icons/tb";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Personal = () => {
  const { userInfo }: { userInfo: any } = useSelector(
    (state: any) => state.auth
  );
  const { loading } = useSelector((state: any) => state.profile);

  return (
    <>
      <div className="student-container-personal">
        <div className="header">
          <div>
            <h3 className="heading">Personal Details</h3>
            <div
              className={`status ${userInfo?.student?.status?.toLowerCase()}`}
            >
              <MdCircle />
              <span>{userInfo?.student?.status}</span>
            </div>
          </div>
          {!loading && (
            <Link to="/edit" className="edit-link">
              <TbUserEdit />
              <span>Edit Profile</span>
            </Link>
          )}
        </div>
        <div className="body">
          <div className="body-left">
            {loading ? (
              <Skeleton
                baseColor="#2C2C2C"
                highlightColor="#444444"
                height={412}
                width={294}
                style={{
                  borderRadius: "0.5rem",
                  // marginTop: "0.5rem",
                  padding: "1rem",
                }}
              />
            ) : (
              <img src={userInfo?.student?.image_url} alt="student's image" />
            )}
          </div>
          <div className="body-right">
            <div className="row row-1">
              <div className="first-name">
                <span>First name</span>
                <p>
                  {!loading ? (
                    userInfo?.student?.first_name
                  ) : (
                    <Skeleton
                      baseColor="#2C2C2C"
                      highlightColor="#444444"
                      style={{
                        borderRadius: "0.5rem",
                      }}
                    />
                  )}
                </p>
              </div>

              <div className="last-name">
                <span>Last name</span>
                <p>
                  {!loading ? (
                    userInfo?.student?.last_name
                  ) : (
                    <Skeleton
                      baseColor="#2C2C2C"
                      highlightColor="#444444"
                      style={{
                        borderRadius: "0.5rem",
                      }}
                    />
                  )}
                </p>
              </div>
            </div>
            <div className="row row-2">
              <div className="other-name">
                <span>Other name</span>
                <p>
                  {!loading ? (
                    userInfo?.student?.other_name || "N/A"
                  ) : (
                    <Skeleton
                      baseColor="#2C2C2C"
                      highlightColor="#444444"
                      style={{
                        borderRadius: "0.5rem",
                      }}
                    />
                  )}
                </p>
              </div>

              <div className="email">
                <span>Email</span>
                <p>
                  {!loading ? (
                    userInfo?.student?.email
                  ) : (
                    <Skeleton
                      baseColor="#2C2C2C"
                      highlightColor="#444444"
                      style={{
                        borderRadius: "0.5rem",
                      }}
                    />
                  )}
                </p>
              </div>
            </div>
            <div className="row row-3">
              <div className="gender">
                <span>Gender</span>
                <p>
                  {!loading ? (
                    userInfo?.student?.gender
                  ) : (
                    <Skeleton
                      baseColor="#2C2C2C"
                      highlightColor="#444444"
                      style={{
                        borderRadius: "0.5rem",
                      }}
                    />
                  )}
                </p>
              </div>

              <div className="email">
                <span>Phone number</span>
                <p>
                  {!loading ? (
                    userInfo?.student?.phone_no
                  ) : (
                    <Skeleton
                      baseColor="#2C2C2C"
                      highlightColor="#444444"
                      style={{
                        borderRadius: "0.5rem",
                      }}
                    />
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Personal;
