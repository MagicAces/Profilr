// backend/types/express.d.ts
// import { User as PrismaUser } from "@prisma/client"; // Adjust the import as necessary

// declare global {
//   namespace Express {
//     interface User extends PrismaUser {}
//   }
// }

export interface StudentInput {
  first_name: string;
  last_name: string;
  other_name?: string;
  email: string;
  program_id: number;
  level: "100" | "200" | "300" | "400";
  index_number: number;
  reference_no: number;
  course_ids: number[];
  image: string;
  gender: string;
  phone_no: string;
}
