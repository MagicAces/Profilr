import { useSelector } from "react-redux";
import { StudentProfile } from "../../types";
import { useNavigate } from "react-router";
import Skeleton from "react-loading-skeleton";
import Avatar from "react-avatar";

const Students = () => {
  const {
    students,
    loading,
  }: { students: StudentProfile[]; loading: boolean } = useSelector(
    (state: any) => state.student
  );
  const navigate = useNavigate();

  return (
    <>
      <div className="students-container">
        {loading ? (
          new Array(7).fill("").map((_, index: number) => (
            <Skeleton
              key={index}
              baseColor="#2C2C2C"
              highlightColor="#444444"
              className={"student-card"}
              style={{
                borderRadius: "0.5rem",
                padding: "1rem",
              }}
            />
          ))
        ) : students.length > 0 ? (
          students.map((student: StudentProfile, index: number) => (
            <div
              className="student-card"
              onClick={() => navigate(`/admin/student/${student?.id}`)}
              key={index}
            >
              <div className="student-card-left">
                <p className="name">
                  {`${student?.last_name} ${student?.other_name || ""} ${
                    student?.first_name
                  } `}
                </p>
                <div className="other-details">
                  <span>{student?.index_number}</span>
                  <span>{student?.program?.name}</span>
                  <span>Level {student?.level}</span>
                </div>
              </div>
              {/* {convertISOToCustomFormat(student?.updated_at)} */}
              <Avatar
                className={"student-image"}
                src={student?.image_url}
                name={`${student?.first_name} ${student?.last_name}`}
                size={"50"}
                round={false}
                maxInitials={1}
                textSizeRatio={0.5}
                textMarginRatio={0.05}
              />
            </div>
          ))
        ) : (
          <div className="no-student-found"> No students found</div>
        )}
      </div>
    </>
  );
};

export default Students;
