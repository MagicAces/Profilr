import { CourseType, PrismaClient } from "@prisma/client";

const programs = [
  {
    name: "BSc. Computer Engineering",
  },
  {
    name: "BSc. Electrical Engineering",
  },
  {
    name: "BSc. Biomedical Engineering",
  },
];

// name          String
//   code          String
//   level         String
//   semester      Int
//   program_id    Int
//   credit        Int
//   type          CourseType  @default(Compulsory)

const courses = [
  {
    name: "Computer Networking",
    code: "COE 475",
    level: "400",
    semester: 1,
    program_id: 1,
    credit: 4,
    type: CourseType.Compulsory,
  },
  {
    name: "Computer Architecture",
    code: "COE 485",
    level: "400",
    semester: 1,
    program_id: 1,
    credit: 3,
    type: CourseType.Compulsory,
  },
  {
    name: "Project 1",
    code: "COE 497",
    level: "400",
    semester: 1,
    program_id: 1,
    credit: 3,
    type: CourseType.Compulsory,
  },
  {
    name: "Vacation Training",
    code: "COE 499",
    level: "400",
    semester: 1,
    program_id: 1,
    credit: 2,
    type: CourseType.Compulsory,
  },
  {
    name: "Engineering Economics & Management",
    code: "ME 491",
    level: "400",
    semester: 1,
    program_id: 1,
    credit: 3,
    type: CourseType.Compulsory,
  },
  {
    name: "Computer Graphics",
    code: "COE 451",
    level: "400",
    semester: 1,
    program_id: 1,
    credit: 3,
    type: CourseType.Elective,
  },
  {
    name: "Distributed Computing",
    code: "COE 453",
    level: "400",
    semester: 1,
    program_id: 1,
    credit: 3,
    type: CourseType.Elective,
  },
  {
    name: "Artificial Intelligence",
    code: "COE 457",
    level: "400",
    semester: 1,
    program_id: 1,
    credit: 3,
    type: CourseType.Elective,
  },
  {
    name: "Project II",
    code: "COE 498",
    level: "400",
    semester: 2,
    program_id: 1,
    credit: 5,
    type: CourseType.Compulsory,
  },
  {
    name: "Management & Entreprenuership Development",
    code: "ME 492",
    level: "400",
    semester: 2,
    program_id: 1,
    credit: 2,
    type: CourseType.Compulsory,
  },
  {
    name: "Robotics & Computer Vision",
    code: "COE 458",
    level: "400",
    semester: 2,
    program_id: 1,
    credit: 3,
    type: CourseType.Elective,
  },
  {
    name: "Digital Signal Processing",
    code: "COE 458",
    level: "400",
    semester: 2,
    program_id: 1,
    credit: 3,
    type: CourseType.Elective,
  },
  {
    name: "Software Engineering II",
    code: "COE 454",
    level: "400",
    semester: 2,
    program_id: 1,
    credit: 3,
    type: CourseType.Elective,
  },
  {
    name: "Introduction to VLSI",
    code: "COE 486",
    level: "400",
    semester: 2,
    program_id: 1,
    credit: 3,
    type: CourseType.Elective,
  },
  {
    name: "Secure Network Systems",
    code: "COE 456",
    level: "400",
    semester: 2,
    program_id: 1,
    credit: 3,
    type: CourseType.Elective,
  },
  {
    name: "Fault Diagnosis & Fault Tolerance",
    code: "COE 480",
    level: "400",
    semester: 2,
    program_id: 1,
    credit: 3,
    type: CourseType.Elective,
  },
];

const prisma = new PrismaClient();

async function main() {
  //   const res = await prisma.program.createMany({
  //     data: programs,
  //   });
  const res = await prisma.course.createMany({
    data: courses,
  });

  console.log(res);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
