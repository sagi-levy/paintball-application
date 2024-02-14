import { useFormik } from "formik";
import PageHeader from "./common/pageHeader";
import Input from "../components/common/input";
import Joi from "joi";
import { useState } from "react";
import FormikUsingJoi from "../utils/formikUsingJoi";
import userServices, { createUser } from "../services/userApiServices";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [errorApiRequest, setErrorApiRequest] = useState("");
  const navigate = useNavigate();
  const form = useFormik({
    initialValues: { name: "", phoneNumber: "", password: "" },
    validateOnMount: true,
    validate: FormikUsingJoi({
      name: Joi.string().min(2).max(255).required(),
      phoneNumber: Joi.string().max(10).min(4).required(),
      password: Joi.string(),
    }),

    async onSubmit(values) {
      try {
        await createUser({ ...values, biz: false });
       navigate("/sign-in");
      } catch ({ response }) {
        if (response && response.status === 400) {
          setErrorApiRequest(response.data);
        }
      }
    },
  });

  return (
    <>
      <PageHeader
        title={
          <>
            <h2 className="pt-5"> you need to sign up to the page</h2>
            <p>please fill the inputs</p>
          </>
        }
      />
      <form onSubmit={form.handleSubmit} noValidate autoComplete="off">
        {errorApiRequest && (
          <div className="alert alert-danger">{errorApiRequest}</div>
        )}

        <Input
          {...form.getFieldProps("name")}
          type="text"
          name="name"
          id="name"
          error={form.touched.name && form.errors.name}
        />
        <Input
          {...form.getFieldProps("phoneNumber")}
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          error={form.touched.phoneNumber && form.errors.phoneNumber}
        />
        <Input
          {...form.getFieldProps("password")}
          type="password"
          name="password"
          id="password"
          error={form.touched.password && form.errors.password}
        />

        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </>
  );
};

export default SignUp;
