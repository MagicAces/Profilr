import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";

const School = () => {
  const { userInfo }: { userInfo: any } = useSelector(
    (state: any) => state.auth
  );

  const { loading } = useSelector((state: any) => state.profile);
  return (
    <>
      <div className="student-container-school">
        <h3 className="heading">School Info</h3>
        <div className="line"></div>
        <div className="body">
          <div className="row row-1">
            <div className="index-number">
              <span>Index number</span>
              <p>
                {!loading ? (
                  userInfo?.student?.index_number
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

            <div className="reference-no">
              <span>Reference No</span>
              <p>
                {!loading ? (
                  userInfo?.student?.reference_no
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
            <div className="programme">
              <span>Programme</span>
              <p>
                {!loading ? (
                  userInfo?.student?.program?.name
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

            <div className="level">
              <span>Level</span>
              <p>
                {!loading ? (
                  userInfo?.student?.level
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
          <div className="courses-section">
            <span className="heading">
              Courses (
              {userInfo?.student?.courses?.length || (
                <Skeleton
                  baseColor="#2C2C2C"
                  highlightColor="#444444"
                  width={15}
                  height={15}
                  style={{
                    borderRadius: "0.5rem",
                  }}
                />
              )}
              )
            </span>
            <div className="line"></div>
            <div className="courses">
              <div className="compulsory">
                <span className="heading">Compulsory</span>
                {loading ? (
                  <div className="compulsory-values">
                    {new Array(5).fill("").map((_, index: number) => (
                      <>
                        <Skeleton
                          key={index}
                          baseColor="#2C2C2C"
                          highlightColor="#444444"
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
                    {userInfo?.student?.courses?.filter(
                      (course: any) => course?.type === "Compulsory"
                    ).length > 0 ? (
                      userInfo?.student?.courses
                        ?.filter((course: any) => course?.type === "Compulsory")
                        .map((course: any, index: number) => (
                          <>
                            <div key={index} className="course">
                              <span className="course-top">
                                {course?.code} <span>({course?.credit})</span>
                              </span>
                              <span className="course-bottom">
                                {course.name}
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
              <div className="elective">
                <span className="heading">Electives</span>
                {loading ? (
                  <div className="compulsory-values">
                    {new Array(5).fill("").map((_, index: number) => (
                      <>
                        <Skeleton
                          key={index}
                          baseColor="#2C2C2C"
                          highlightColor="#444444"
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
                    {userInfo?.student?.courses?.filter(
                      (course: any) => course?.type === "Elective"
                    ).length > 0 ? (
                      userInfo?.student?.courses
                        ?.filter((course: any) => course?.type === "Elective")
                        .map((course: any, index: number) => (
                          <>
                            <div key={index} className="course">
                              <span className="course-top">
                                {course?.code} <span>({course?.credit})</span>
                              </span>
                              <span className="course-bottom">
                                {course.name}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default School;
