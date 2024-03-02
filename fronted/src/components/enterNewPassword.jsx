import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/common/input";
import Joi from "joi";
import FormikUsingJoi from "../utils/formikUsingJoi";
import { useFormik } from "formik";
import { useAuth } from "../context/auth.context";

const EnterNewPassword = () => {
  const user = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [errorApiRequest, setErrorApiRequest] = useState("");

  const form = useFormik({
    initialValues: { newPassword: "", confirmNewPassword: "" },
    validateOnMount: true,
    validate: FormikUsingJoi({
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
        const response = await fetch(
          `${process.env.REACT_APP_RENDER_API_URL}/users/change-password/via-email-code/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": localStorage.token,
            },
            body: JSON.stringify(formData),
          }
        );
      
        if (!response.ok) {
          const data = await response.json();
          console.log(data.message);
          setErrorApiRequest(data.message);
        }
      } catch (error) {
        console.error(error);

        setErrorApiRequest("Internal server error");
      }
      navigate("/calendar");
    },
  });

  return (
    <div className="p-5">
      <h2>Change Password</h2>

      <form onSubmit={form.handleSubmit}>
        {" "}
        {errorApiRequest && (
          <div className="alert alert-danger">{errorApiRequest}</div>
        )}
        <Input
        example={"creative strong password"}
        isTouched={form.touched.newPassword}

          {...form.getFieldProps("newPassword")}
          type="password"
          names="new password"
          id="newPassword"
          error={form.touched.newPassword && form.errors.newPassword}
        />
        <Input
        example={"creative strong password"}
        isTouched={form.touched.confirmNewPassword}

        {...form.getFieldProps("confirmNewPassword")}
          type="password"
          names="confirm new password"
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

export default EnterNewPassword;
