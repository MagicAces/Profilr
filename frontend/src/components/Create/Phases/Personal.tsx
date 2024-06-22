import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SelectOption, StudentInput } from "../../../types";
import {
  fillStudent,
  setPhase,
} from "../../../redux/features/profile/profileSlice";
import { toast } from "react-toastify";

import Select, { components, DropdownIndicatorProps, MenuPlacement } from "react-select";
import { TiArrowUnsorted } from "react-icons/ti";
import { genderOptions } from "../../../utils/select";
import { useNavigate } from "react-router";
const DropdownIndicator = (
  props: DropdownIndicatorProps<SelectOption, true>
) => {
  return (
    <components.DropdownIndicator {...props}>
      <TiArrowUnsorted fontSize={15} color="#333333" />
    </components.DropdownIndicator>
  );
};

const Personal = () => {
  const { student }: { student: StudentInput } = useSelector(
    (state: any) => state.profile
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [warning, setWarning] = useState({
    first_name: false,
    last_name: false,
    gender: false,
    email: false,
    phone_no: false,
  });

  const disableWarning = (name: string) => {
    setWarning((prevWarning) => ({
      ...prevWarning,
      [name]: false,
    }));
  };

  const validateInputs = (): boolean => {
    const first_name = student.first_name.length <= 0;
    const last_name = student.last_name.length <= 0;
    const gender = student.gender.length <= 0;
    const email = student.email.length <= 0;
    const phone_no = student.phone_no.length <= 0;

    setWarning({
      first_name,
      last_name,
      gender,
      email,
      phone_no,
    });

    if (first_name || last_name || gender || email || phone_no) {
      toast.error("Fill in the highlighted details");
      return false;
    }

    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    dispatch(fillStudent({ ...student, [name]: value }));
  };

  const handleSelectChange = (data: any) => {
    dispatch(fillStudent({ ...student, gender: data.value ?? "" }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const valid = validateInputs();

    if (!valid) return;

    const phoneRegex = /^\+\d+$/;
    if (!phoneRegex.test(student.phone_no)) {
      setWarning((prevWarning) => ({
        ...prevWarning,
        phone_no: true,
      }));
      toast.error("Phone number is invalid");
      return;
    }
    dispatch(setPhase(2));
  };

  return (
    <>
      <form className="personal-info" onSubmit={handleSubmit}>
        <div className="row row-1">
          <div className="first-name-box">
            <label className={warning.first_name ? "error-label" : undefined}>
              First name
            </label>
            <input
              type="text"
              name="first_name"
              className={
                warning.first_name ? `first-name error-input` : `first-name`
              }
              value={student.first_name}
              onChange={handleInputChange}
              onFocus={() => disableWarning("first_name")}
              required
              placeholder="John"
            />
          </div>
          <div className="last-name-box">
            <label className={warning.last_name ? "error-label" : undefined}>
              Last name
            </label>
            <input
              type="text"
              name="last_name"
              className={
                warning.first_name ? `last-name error-input` : `last-name`
              }
              value={student.last_name}
              onChange={handleInputChange}
              onFocus={() => disableWarning("last_name")}
              required
              placeholder="Doe"
            />
          </div>
        </div>
        <div className="row row-2">
          <div className="other-name-box">
            <label>
              Other name <span className="optional"> - Optional</span>
            </label>
            <input
              type="text"
              name="other_name"
              className={`other-name`}
              value={student.other_name}
              onChange={handleInputChange}
              placeholder="Michelin"
            />
          </div>
          <div className="email-box">
            <label className={warning.email ? "error-label" : undefined}>
              Email
            </label>
            <input
              type="email"
              name="email"
              className={warning.email ? `email error-input` : `email`}
              value={student.email}
              onChange={handleInputChange}
              onFocus={() => disableWarning("email")}
              required
              placeholder="johndoe@gmail.com"
            />
          </div>
        </div>
        <div className="row row-3">
          <div className="gender-box">
            <label>Gender</label>
            <Select
              className={warning.gender ? `gender error-input}` : `gender`}
              classNamePrefix="profile-create"
              name="gender"
              menuPlacement={'auto' as MenuPlacement}
              required={true}
              value={genderOptions().filter(
                (gender) => gender.value === student.gender
              )}
              components={{ DropdownIndicator }}
              // noOptionsMessage={({ inputValue }) => "No Venues Found"}
              isSearchable={false}
              onChange={(data) => handleSelectChange(data)}
              styles={{
                noOptionsMessage: (base) => ({
                  ...base,
                  color: `#FFFFFF`,
                  backgroundColor: "inherit",
                }),
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
              }}
              onFocus={() => disableWarning("gender")}
              options={genderOptions()}
              placeholder={"Gender"}
              menuPortalTarget={document.body}
            />
          </div>
          <div className="phone-no-box">
            <label className={warning.phone_no ? "error-label" : undefined}>
              Phone
            </label>
            <input
              type="text"
              name="phone_no"
              className={warning.phone_no ? `phone_no error-input` : `phone_no`}
              value={student.phone_no}
              onChange={handleInputChange}
              onFocus={() => disableWarning("phone_no")}
              required
              placeholder="+233540393431"
            />
          </div>
        </div>

        <div className="buttons">
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
          <button type="submit" className="submit-button">
            Next
          </button>
        </div>
      </form>
    </>
  );
};

export default Personal;
