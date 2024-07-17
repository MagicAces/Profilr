const BASE_URL =
  import.meta.env.VITE_NODE_ENV === "production"
    ? window.location.origin
    : "http://localhost:5000";
    
const USERS_URL = "/api/users";
const AUTH_URL = `${USERS_URL}/auth/google`;
const COURSES_URL = "/api/courses";
const PROGRAMS_URL = "/api/programs";
const STUDENTS_URL = "/api/students";

export {
  BASE_URL,
  USERS_URL,
  STUDENTS_URL,
  AUTH_URL,
  COURSES_URL,
  PROGRAMS_URL,
};
