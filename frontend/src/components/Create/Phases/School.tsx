import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CourseQuery,
  Program,
  SelectOption,
  StudentInput,
} from "../../../types";
import {
  fillStudent,
  setCourseQuery,
  setPhase,
} from "../../../redux/features/profile/profileSlice";
import { toast } from "react-toastify";

import Select, { components, DropdownIndicatorProps } from "react-select";
import { TiArrowUnsorted } from "react-icons/ti";
import {
  levelOptions,
  programOptions,
  semesterOptions,
} from "../../../utils/select";

const DropdownIndicator = (
  props: DropdownIndicatorProps<SelectOption, true>
) => {
  return (
    <components.DropdownIndicator {...props}>
      <TiArrowUnsorted fontSize={15} color="#333333" />
    </components.DropdownIndicator>
  );
};

const School = () => {
  const { student, programs }: { student: StudentInput; programs: Program[] } =
    useSelector((state: any) => state.profile);
  const dispatch = useDispatch();

  const [warning, setWarning] = useState({
    index_number: false,
    reference_no: false,
    level: false,
    program_id: false,
    semester: false,
  });

  const disableWarning = (name: string) => {
    setWarning((prevWarning) => ({
      ...prevWarning,
      [name]: false,
    }));
  };

  const validateInputs = (): boolean => {
    const index_number =
      !isFinite(student.index_number) || isNaN(student.index_number);
    const reference_no =
      !isFinite(student.reference_no) || isNaN(student.reference_no);
    const level = student.level.length <= 0;
    const semester = !isFinite(student.semester) || isNaN(student.semester);
    const program_id =
      !isFinite(student.program_id) || isNaN(student.program_id);

    setWarning({
      index_number,
      reference_no,
      level,
      semester,
      program_id,
    });

    if (index_number || reference_no || level || semester || program_id) {
      toast.error("Fill in the highlighted details");
      return false;
    }

    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "index_number" || name === "reference_no")
      dispatch(fillStudent({ ...student, [name]: Number(value) }));
    else dispatch(fillStudent({ ...student, [name]: value }));
  };

  const handleSelectChange = (name: string, data: any) => {
    if (name === "semester" || name === "program_id") {
      dispatch(fillStudent({ ...student, [name]: Number(data.value) ?? 0 }));
      dispatch(
        setCourseQuery({
          name: name as keyof CourseQuery,
          value: data.value ?? 0,
        })
      );
    } else {
      dispatch(fillStudent({ ...student, [name]: data.value ?? "" }));
      dispatch(
        setCourseQuery({
          name: name as keyof CourseQuery,
          value: data.value ?? "",
        })
      );
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const valid = validateInputs();

    if (!valid) return;

    dispatch(setPhase(3));
  };

  return (
    <>
      <form className="school-details" onSubmit={handleSubmit}>
        <div className="row row-1">
          <div className="index-number-box">
            <label className={warning.index_number ? "error-label" : undefined}>
              Index number
            </label>
            <input
              type="text"
              name="index_number"
              className={
                warning.index_number
                  ? `index-number error-input`
                  : `index-number`
              }
              value={student.index_number || ""}
              onChange={handleInputChange}
              onFocus={() => disableWarning("index_number")}
              required
              placeholder="3034520"
            />
          </div>
          <div className="reference-no-box">
            <label className={warning.reference_no ? "error-label" : undefined}>
              Reference number
            </label>
            <input
              type="text"
              name="reference_no"
              className={
                warning.reference_no
                  ? `reference_no error-input`
                  : `reference_no`
              }
              value={student.reference_no || ""}
              onChange={handleInputChange}
              onFocus={() => disableWarning("reference_no")}
              required
              placeholder="20772340"
            />
          </div>
        </div>
        <div className="row row-2">
          <div className="program-box">
            <label className={warning.program_id ? "error-label" : undefined}>
              Program
            </label>
            <Select
              className={
                warning.program_id ? `program_id error-input}` : `program_id`
              }
              classNamePrefix="profile-create"
              name="program_id"
              menuPlacement={"auto"}
              required={true}
              value={programOptions(programs).filter(
                (program) => program.value === student.program_id
              )}
              components={{ DropdownIndicator }}
              noOptionsMessage={({}) => "No Program Found"}
              isSearchable={true}
              onChange={(data) => handleSelectChange("program_id", data)}
              styles={{
                noOptionsMessage: (base) => ({
                  ...base,
                  color: `#FFFFFF`,
                  backgroundColor: "inherit",
                }),
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
              }}
              onFocus={() => disableWarning("program_id")}
              options={programOptions(programs)}
              placeholder={"Program"}
              menuPortalTarget={document.body}
            />
          </div>
        </div>
        <div className="row row-3">
          <div className="level-box">
            <label className={warning.level ? "error-label" : undefined}>
              Level
            </label>
            <Select
              className={warning.program_id ? `level error-input}` : `level`}
              classNamePrefix="profile-create"
              name="level"
              required={true}
              menuPlacement={"auto"}
              value={levelOptions().filter(
                (level) => level.value === student.level
              )}
              components={{ DropdownIndicator }}
              // noOptionsMessage={({}) => "No Program Found"}
              isSearchable={false}
              onChange={(data) => handleSelectChange("level", data)}
              styles={{
                noOptionsMessage: (base) => ({
                  ...base,
                  color: `#FFFFFF`,
                  backgroundColor: "inherit",
                }),
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
              }}
              onFocus={() => disableWarning("level")}
              options={levelOptions()}
              placeholder={"Level"}
              menuPortalTarget={document.body}
            />
          </div>
          <div className="semester-box">
            <label className={warning.semester ? "error-label" : undefined}>
              Semester
            </label>
            <Select
              className={
                warning.program_id ? `semester error-input}` : `semester`
              }
              classNamePrefix="profile-create"
              name="semester"
              required={true}
              value={semesterOptions().filter(
                (semester) => semester.value === student.semester
              )}
              menuPlacement={"auto"}
              components={{ DropdownIndicator }}
              // noOptionsMessage={({}) => "No Program Found"}
              isSearchable={false}
              onChange={(data) => handleSelectChange("semester", data)}
              styles={{
                noOptionsMessage: (base) => ({
                  ...base,
                  color: `#FFFFFF`,
                  backgroundColor: "inherit",
                }),
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
              }}
              onFocus={() => disableWarning("semester")}
              options={semesterOptions()}
              placeholder={"Semester"}
              menuPortalTarget={document.body}
            />
          </div>
        </div>

        <div className="buttons">
          <button
            type="button"
            className="back-button"
            onClick={() => dispatch(setPhase(1))}
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

export default School;
