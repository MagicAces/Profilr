import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StudentProfile } from "../../../types";
import { MdClose, MdHome, MdOutlineCheck } from "react-icons/md";
import { useApproveProfileMutation } from "../../../redux/features/user/userApiSlice";
import { toast } from "react-toastify";

import { setLoading } from "../../../redux/features/student/studentSlice";
import Loader from "../../Utils/Loader";

const Personal = () => {
  const { student, loading }: { student: StudentProfile; loading: boolean } =
    useSelector((state: any) => state.student);
  const [approve, { isLoading: approveLoading }] = useApproveProfileMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleApprove = async (status: boolean) => {
    try {
      const res = await approve({
        secret: import.meta.env.VITE_ADMIN_SECRET,
        student_id: student.id,
        approved: status ? "true" : "false",
      }).unwrap();
      toast.success(res.message);
      dispatch(setLoading(true));
      navigate("/admin", { replace: true });
    } catch (error: any) {
      toast.error(error?.data?.message || error?.message);
    }
  };
  return (
    <>
      {approveLoading && <Loader />}
      <div className="student-container-personal">
        <div className="header">
          <h3 className="heading">Personal Details</h3>
          {!loading && (
            <div className="action-buttons">
              <button
                type="button"
                className="home-button"
                onClick={() => navigate("/admin")}
              >
                <MdHome />
                <span>Home</span>
              </button>
              <button
                type="button"
                className="approve-button"
                onClick={() => handleApprove(true)}
              >
                <MdOutlineCheck />
                <span>Approve</span>
              </button>
              <button
                type="button"
                className="reject-button"
                onClick={() => handleApprove(false)}
              >
                <MdClose />
                <span>Reject</span>
              </button>
            </div>
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
              <img src={student?.image_url} alt="student's image" />
            )}
          </div>
          <div className="body-right">
            <div className="row row-1">
              <div className="first-name">
                <span>First name</span>
                <p>
                  {!loading ? (
                    student?.first_name
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
                    student?.last_name
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
                    student?.other_name || "N/A"
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
                    student?.email
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
                    student?.gender
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
                    student?.phone_no
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
