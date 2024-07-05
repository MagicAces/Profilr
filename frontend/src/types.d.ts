export interface ProfileState {
  phase: number;
  student: StudentInput;
  courses: Course[];
  programs: Program[];
  courseQuery: CourseQuery;
  loading: boolean;
}

export interface StudentState {
  students: StudentProfile[];
  loading: boolean;
  student: {} | StudentProfile;
  tab: number;
}

export interface StudentProfile {
  id: number;
  first_name: string;
  last_name: string;
  other_name?: string;
  email: string;
  phone_no: string;
  gender: string;
  level: number;
  semester: number;
  index_number: number;
  reference_no: number;
  program_id: number;
  program: Program;
  courses: Course[];
  image_url: string;
  created_on: string;
  updated_at: string;
}

export interface StudentInput {
  id?: number;
  first_name: string;
  last_name: string;
  other_name?: string;
  email: string;
  phone_no: string;
  gender: string;
  level: "100" | "200" | "300" | "400" | "";
  semester: 1 | 2 | 0;
  index_number: number;
  reference_no: number;
  program_id: number;
  course_ids: number[];
  image: string;
}
export interface Program {
  id: number;
  name: string;
  created_on: string;
  updated_at: string;
}

export interface Course {
  id: number;
  name: string;
  code: string;
  level: string;
  semster: number;
  credit: number;
  type: "Compulsory" | "Elective";
  program: Program;
  created_on: string;
  updated_At: string;
}
export interface CourseQuery {
  level: string;
  semester: number;
  program_id: number;
}

export interface SelectOption {
  readonly value: number | string;
  readonly label: string;
  readonly isDisabled?: boolean;
}
