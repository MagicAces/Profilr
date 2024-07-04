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

const year4 = [
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

const year1sem2 = [
  {
    name: "Mathematics",
    code: "MATH 152",
    level: "100",
    semester: 2,
    program_id: 1,
    credit: 4,
    type: CourseType.Compulsory,
  },
  {
    name: "Communication Skills",
    code: "ENGL 158",
    level: "100",
    semester: 2,
    program_id: 1,
    credit: 2,
    type: CourseType.Compulsory,
  },
  {
    name: "Applied Thermodynamics",
    code: "ME 166",
    level: "100",
    semester: 2,
    program_id: 1,
    credit: 2,
    type: CourseType.Compulsory,
  },
  {
    name: "Basic Electronics",
    code: "EE 152",
    level: "100",
    semester: 2,
    program_id: 1,
    credit: 3,
    type: CourseType.Compulsory,
  },
  {
    name: "Electrical Eng. Drawing",
    code: "EE 156",
    level: "100",
    semester: 2,
    program_id: 1,
    credit: 2,
    type: CourseType.Compulsory,
  },
  {
    name: "Electrical Machines",
    code: "EE 172",
    level: "100",
    semester: 2,
    program_id: 1,
    credit: 3,
    type: CourseType.Compulsory,
  },
  {
    name: "Introduction to Information Technology (IT)",
    code: "COE 158",
    level: "100",
    semester: 2,
    program_id: 1,
    credit: 2,
    type: CourseType.Compulsory,
  },
];

const prisma = new PrismaClient();

async function main() {
  // const res = await prisma.program.createMany({
  //   data: programs,
  // });
  const res = await prisma.course.createMany({
    data: year1sem2,
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
