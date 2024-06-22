// backend/types/express.d.ts
import { User as PrismaUser } from "@prisma/client"; // Adjust the import as necessary

declare global {
  namespace Express {
    interface User extends PrismaUser {}
  }
}

interface StudentInput {
  first_name: string;
  last_name: string;
  other_name?: string;
  email: string;
  program_id: string;
  level: "100" | "200" | "300" | "400";
  index_number: string;
  reference_no: string;
  course_ids: string[];
  image_url: string;
  gender: string;
  phone_no: string;
}
