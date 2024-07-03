import Personal from "./View/Personal";
import School from "./View/School";

const Student = () => {
  return (
    <>
      <div className="student-container">
        <Personal />
        <School />
      </div>
    </>
  );
};

export default Student;
