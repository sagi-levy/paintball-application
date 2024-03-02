import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "./common/pageHeader";
import Input from "../components/common/input";
import { useAuth } from "../context/auth.context";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        console.log(user); 
        console.log(values);
        toast.success(`welcome`, {
          autoClose: 2000,
          style: {
            background: "black",
            color: "white",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
          },
        });

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
      <PageHeader title={<h1 className="pt-5 ">Sign in page</h1>} />
      <p>sign in to enter</p>
      <form className="mb-4" onSubmit={form.handleSubmit}>
        {errorApiRequest && (
          <div className="alert alert-danger">{errorApiRequest}</div>
        )}
        <Input
          example={"055..."}
          isTouched={form.touched.phoneNumber}

          {...form.getFieldProps("phoneNumber")}
          error={form.errors.phoneNumber}
          names="phone number"
          type="phoneNumber"
          id="phoneNumber"
        />

        <Input
          example={"strong"}
          isTouched={form.touched.password}

          {...form.getFieldProps("password")}
          error={form.errors.password}
          names="password"
          type="password"
          id="password"
        />

        <button type="submit" className="btn btn-primary">
          submit
        </button>
      </form>

      <Link
        style={{
          color: "#ecd8d8",
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
