import React, { useState } from "react";
import { changeUserPassword } from "../services/userApiServices";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/common/input";
import Joi from "joi";
import FormikUsingJoi from "../utils/formikUsingJoi";
import { useFormik } from "formik";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangePassword = () => {
  const location = useLocation();
  const user = location.state?.user || null;
  console.log(user);
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
          `${process.env.REACT_APP_RENDER_API_URL}/users/change-password/${id}`,
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

        if (response.status == 401 || !response.ok) {
          const data = await response;
          console.log(data);
          // setErrorApiRequest(data.statusText);
          setErrorApiRequest("not correct old password");
          return;
        }
      } catch (error) {
        console.error(error);
        setErrorApiRequest("Internal server error");
      }
      toast.success(`password changed`, {
        autoClose: 2000,
        style: {
          background: "black",
          color: "white",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
        },
      });
      navigate("/calendar");
    },
  });

  return (
    <div>
      <h2 style={{ paddingTop: "70px" }}>Change Password</h2>

      <form onSubmit={form.handleSubmit}>
        {" "}
        {errorApiRequest && (
          <div className="alert alert-danger">{errorApiRequest}</div>
        )}
        <Input
          example={"strong password"}
          isTouched={form.touched.oldPassword}

          {...form.getFieldProps("oldPassword")}
          type="password"
          names="old password"
          id="oldPassword"
          error={form.touched.oldPassword && form.errors.oldPassword}
        />
        <Input
          example={"strong password"}
          isTouched={form.touched.newPassword}

          {...form.getFieldProps("newPassword")}
          type="password"
          names="new password"
          id="newPassword"
          error={form.touched.newPassword && form.errors.newPassword}
        />
        <Input
          example={"strong password"}
          isTouched={form.touched.confirmNewPassword}

          {...form.getFieldProps("confirmNewPassword")}
          type="password"
          name="confirm new password"
          id="confirmNewPassword"
          error={
            form.touched.confirmNewPassword && form.errors.confirmNewPassword
          }
          {...form.getFieldProps("confirmNewPassword")}
        />{" "}
        <button type="submit" className="btn btn-primary">
          confirm
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
