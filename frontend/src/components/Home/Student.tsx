// import { useSelector } from "react-redux";
// import { useGetStudentQuery } from "../../redux/features/user/userApiSlice";
import Personal from "./View/Personal";
import School from "./View/School";
// import { useEffect } from "react";

const Student = () => {
  // const { student: oldStudent } = useSelector((state: any) => state.student);

  // const {
  //   data: student,
  //   isLoading: studentLoading,
  //   error: studentError
  // } = useGetStudentQuery(oldStudent?.id, {
  //   pollingInterval: 5 * 1000,
  //   refetchOnFocus: true,
  // });


  // useEffect(() => {
  //   if (studentError) 
  //       toast.error
  // });
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
