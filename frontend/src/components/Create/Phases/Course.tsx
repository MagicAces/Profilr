import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Course as CourseType,
  CourseQuery,
  StudentInput,
} from "../../../types";
import {
  fillStudent,
  setCourses,
  setPhase,
} from "../../../redux/features/profile/profileSlice";
import { useGetCoursesQuery } from "../../../redux/features/profile/profileApiSlice";
import { toast } from "react-toastify";
import Switch from "react-switch";
import Skeleton from "react-loading-skeleton";

const Course = () => {
  const {
    student,
    courseQuery,
    courses,
  }: {
    student: StudentInput;
    courseQuery: CourseQuery;
    courses: CourseType[];
  } = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();
  const {
    data: coursesData,
    isLoading: coursesLoading,
    error: coursesError,
  } = useGetCoursesQuery(courseQuery, {
    pollingInterval: 5 * 1000,
    skipPollingIfUnfocused: true,
    refetchOnReconnect: true,
  });

  const isFetchBaseQueryError = (
    error: unknown
  ): error is { data: { message: string } } => {
    return (
      typeof error === "object" &&
      error !== null &&
      "data" in error &&
      "message" in (error as any).data
    );
  };

  useEffect(() => {
    if (coursesError) {
      const errorMessage = isFetchBaseQueryError(coursesError)
        ? coursesError.data.message
        : "Server Error";
      toast.error(errorMessage, {
        toastId: "E2",
      });
    }

    if (!coursesLoading && !coursesError && coursesData) {
      dispatch(setCourses(coursesData?.courses));
    }
  }, [dispatch, coursesLoading, coursesData, coursesError]);

  useEffect(() => {
    if (!coursesLoading && coursesData) {
      const newCourseIds = coursesData.courses
        .filter((course: CourseType) => course.type === "Compulsory")
        .map((course: CourseType) => course.id);

      const updatedCourseIds = Array.from(
        new Set([...student.course_ids, ...newCourseIds])
      );

      dispatch(
        fillStudent({
          ...student,
          course_ids: updatedCourseIds,
        })
      );
    }
  }, [dispatch, coursesLoading]);

  const handleChange = (
    checked: boolean,
    _: MouseEvent | React.SyntheticEvent<MouseEvent | KeyboardEvent, Event>,
    id: string
  ) => {
    if (checked)
      dispatch(
        fillStudent({
          ...student,
          course_ids: [...student.course_ids, Number(id)],
        })
      );
    else
      dispatch(
        fillStudent({
          ...student,
          course_ids: student.course_ids.filter(
            (course_id: number) => course_id !== Number(id)
          ),
        })
      );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(setPhase(4));
  };

  return (
    <>
      <form className="courses-offered" onSubmit={handleSubmit}>
        <div className="col col-1">
          <p className="heading">Compulsory</p>
          <div className="line"></div>
          {coursesLoading ? (
            <div className="compulsory-values">
              {new Array(5).fill("").map((_) => (
                <>
                  <Skeleton
                    baseColor="#2C2C2C"
                    highlightColor="#8A8A8A"
                    className={"course"}
                    height={90}
                    width={250}
                    style={{
                      borderRadius: "0.5rem",
                      // marginTop: "0.5rem",
                      padding: "1rem",
                    }}
                  />
                </>
              ))}
            </div>
          ) : (
            <div className="compulsory-values">
              {courses.filter(
                (course: CourseType) => course?.type === "Compulsory"
              ).length > 0 ? (
                courses
                  .filter((course: CourseType) => course?.type === "Compulsory")
                  .map((course: CourseType) => (
                    <>
                      <div className="course">
                        <div className="course-left">
                          <span>
                            {course?.code} <span>({course?.credit})</span>
                          </span>
                          <span>{course.name}</span>
                        </div>
                        <span className="course-right">
                          <Switch
                            onChange={handleChange}
                            checked={
                              student.course_ids.filter(
                                (id: number) => id === course.id
                              ).length === 1
                            }
                            disabled={true}
                            onColor="#BBBBBB"
                            offColor="#2C2C2C"
                            onHandleColor="#FFFFFF"
                            offHandleColor="#8A8A8A"
                            uncheckedIcon={false}
                            checkedIcon={false}
                            activeBoxShadow="0 0 2px 3px transparent"
                            width={50}
                            height={25}
                            id={course.id.toString()}
                          />
                        </span>
                      </div>
                    </>
                  ))
              ) : (
                <p className="no-course-found">No courses found</p>
              )}
            </div>
          )}
        </div>
        <div className="col col-2">
          <p className="heading">Elective</p>
          <div className="line"></div>
          {coursesLoading ? (
            <div className="elective-values">
              {new Array(5).fill("").map((_) => (
                <>
                  <Skeleton
                    baseColor="#2C2C2C"
                    highlightColor="#8A8A8A"
                    className={"course"}
                    height={90}
                    width={250}
                    style={{
                      borderRadius: "0.5rem",
                      // marginTop: "0.5rem",
                      padding: "1rem",
                    }}
                  />
                </>
              ))}
            </div>
          ) : (
            <div className="elective-values">
              {courses.filter(
                (course: CourseType) => course?.type === "Elective"
              ).length > 0 ? (
                courses
                  .filter((course: CourseType) => course?.type === "Elective")
                  .map((course: CourseType) => (
                    <>
                      <div className="course">
                        <div className="course-left">
                          <span>
                            {course?.code} <span>({course?.credit})</span>
                          </span>
                          <span>{course.name}</span>
                        </div>
                        <span className="course-right">
                          <Switch
                            onChange={handleChange}
                            checked={
                              student.course_ids.filter(
                                (id: number) => id === course.id
                              ).length === 1
                            }
                            disabled={false}
                            onColor="#888888"
                            offColor="#2C2C2C"
                            onHandleColor="#FFFFFF"
                            offHandleColor="#8A8A8A"
                            uncheckedIcon={false}
                            checkedIcon={false}
                            activeBoxShadow="0 0 2px 3px transparent"
                            width={50}
                            height={25}
                            id={course.id.toString()}
                          />
                        </span>
                      </div>
                    </>
                  ))
              ) : (
                <p className="no-course-found">No courses found</p>
              )}
            </div>
          )}
        </div>
        <div className="buttons">
          <button
            type="button"
            className="back-button"
            onClick={() => dispatch(setPhase(2))}
          >
            Back
          </button>
          <button type="submit" className="submit-button">
            Next
          </button>
        </div>
      </form>
    </>
  );
};

export default Course;
