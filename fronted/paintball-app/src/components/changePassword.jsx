import React, { useState } from "react";
import { changeUserPassword } from "../services/userApiServices";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/common/input";
import Joi from "joi";
import FormikUsingJoi from "../utils/formikUsingJoi";
import { useFormik } from "formik";

const ChangePassword = () => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();

  const [errorApiRequest, setErrorApiRequest] = useState("");

  const form = useFormik({
    initialValues: { oldPassword: "", newPassword: "", confirmNewPassword: "" },
    validateOnMount: true,
    validate: FormikUsingJoi({
      oldPassword: Joi.string().min(2).max(255).required(),
      newPassword: Joi.string().max(10).min(4).required(),
      confirmNewPassword: Joi.string()
        .required()
        .min(5)
        .max(1000)
        .valid(Joi.ref("newPassword"))
        .messages({
          "any.only": "Confirm password must match the new password",
        }),
    }),

    async onSubmit(formData) {
      try {
        // Validate form data (e.g., ensure newPassword and confirmNewPassword match)
        const response = await fetch(
          `http://localhost:3003/users/change-password/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": localStorage.token,
              // Add other headers as needed
            },
            body: JSON.stringify(formData),
          }
        );
        if (!response.ok) {
          const data = await response;
          console.log(data);
          setErrorApiRequest(data.statusText);
        }
      } catch (error) {
        console.error(error);
        setErrorApiRequest("Internal server error");
      }
      navigate("/calendar");
    },
  });

  return (
    <div>
      <h2>Change Password</h2>

      <form onSubmit={form.handleSubmit}>
        {" "}
        {errorApiRequest && (
          <div className="alert alert-danger">{errorApiRequest}</div>
        )}
        <Input
          {...form.getFieldProps("oldPassword")}
          type="password"
          name="oldPassword"
          id="oldPassword"
          error={form.touched.oldPassword && form.errors.oldPassword}
        />
        <Input
          {...form.getFieldProps("newPassword")}
          type="password"
          name="newPassword"
          id="newPassword"
          error={form.touched.newPassword && form.errors.newPassword}
        />
        <Input
          {...form.getFieldProps("confirmNewPassword")}
          type="password"
          name="confirmNewPassword"
          id="confirmNewPassword"
          error={
            form.touched.confirmNewPassword && form.errors.confirmNewPassword
          }
        />{" "}
        <button type="submit" className="btn btn-primary">
          confirm
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;