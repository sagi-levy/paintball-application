import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "./common/pageHeader";
import Input from "../components/common/input";
import { useAuth } from "../context/auth.context";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [errorApiRequest, setErrorApiRequest] = useState("");
  const { logIn, user } = useAuth();
  const navigate = useNavigate();
  const form = useFormik({
    initialValues: { phoneNumber: "", password: "" },
    validate(values) {
      const errors = {};
      if (values.phoneNumber === "") {
        errors.phoneNumber = "phoneNumber cant be empty";
      } else if (values.phoneNumber.length < 3) {
        errors.phoneNumber = "phoneNumber cant less then 2 chars";
      }
      if (values.password === "") {
        errors.password = "wrong";
      }
      return errors;
    },
    async onSubmit(values) {
      try {
        await logIn(values);
        console.log(user); // user shown after refresh, supposed to be render, don't know why not

        navigate("/about");
      } catch ({ response }) {
        if (response && response.status === 400) {
          setErrorApiRequest(response.data);
        }
      }
    },
  });

  return (
    <>
      <PageHeader title={<h1>Sign in page</h1>} />
      <p>sign in to enter</p>
      <form className="mb-4" onSubmit={form.handleSubmit}>
        {errorApiRequest && (
          <div className="alert alert-danger">{errorApiRequest}</div>
        )}
        <Input
          {...form.getFieldProps("phoneNumber")}
          error={form.errors.phoneNumber}
          name="phoneNumber"
          type="phoneNumber"
          id="phoneNumber"
        />

        <Input
          {...form.getFieldProps("password")}
          error={form.errors.password}
          name="password"
          type="password"
          id="password"
        />

        <button type="submit" className="btn btn-primary">
          submit
        </button>
      </form>

      <Link
        style={{
          color: "black",
          fontFamily: "cursive",
          justifyContent: "center",
        }}
        to={"/reset-password"}
      >
        forgot password?
      </Link>
    </>
  );
};
export default SignIn;
