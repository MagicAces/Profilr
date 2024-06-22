import { Program, SelectOption } from "../types";

export const genderOptions = (): readonly SelectOption[] => {
  return [
    {
      value: "male",
      label: "Male",
    },
    {
      value: "female",
      label: "Female",
    },
  ];
};

export const programOptions = (programs: Program[]): readonly SelectOption[] => {
  return programs.map((program) => ({
    value: program?.id,
    label: program?.name,
  }));
};

export const levelOptions = (): readonly SelectOption[] => {
  return [
    {
      value: "100",
      label: "100",
    },
    {
      value: "200",
      label: "200",
    },
    {
      value: "300",
      label: "300",
    },
    {
      value: "400",
      label: "400",
    },
  ];
};


export const semesterOptions = (): readonly SelectOption[] => {
  return [
    {
      value: 1,
      label: "1",
    },
    {
      value: 2,
      label: "2",
    },
  ];
};

