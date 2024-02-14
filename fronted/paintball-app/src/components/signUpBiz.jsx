import { useFormik } from "formik";
import PageHeader from "./common/pageHeader";
import Input from "../components/common/input";
import Joi from "joi";
import { useState } from "react";
import FormikUsingJoi from "../utils/formikUsingJoi";
import userServices, {
  createUser,
  logINUser,
} from "../services/userApiServices";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";

const SignUpBiz = () => {
  const [errorApiRequest, setErrorApiRequest] = useState("");
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const form = useFormik({
    initialValues: { phoneNumber: "", name: "", password: "" },
    validateOnMount: true,
    validate: FormikUsingJoi({
      name: Joi.string().min(2).max(255).required(),
      phoneNumber: Joi.string()
        .allow("")
        .min(9)
        .max(10)
        .required()
        .regex(/^0[2-9]\d{7,8}$/),
      password: Joi.string().min(6).max(255).required(),
    }),

    async onSubmit(values) {
      try {
        console.log(values);
        await createUser({ ...values, biz: true });
        await logIn({ phoneNumber: values.phoneNumber, password: values.password });
        navigate(`/cards/my-activity-cards/${values.phoneNumber}`);
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
            <h2> you need to sign up to the page</h2>
            <p>please fill the inputs</p>
          </>
        }
      />
      <form onSubmit={form.handleSubmit} noValidate autoComplete="off">
        {errorApiRequest && (
          <div className="alert alert-danger">{errorApiRequest}</div>
        )}
        <Input
          {...form.getFieldProps("phoneNumber")}
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          error={form.touched.phoneNumber && form.errors.phoneNumber}
        />
        <Input
          {...form.getFieldProps("name")}
          type="text"
          name="name"
          id="name"
          error={form.touched.name && form.errors.name}
        />
        <Input
          {...form.getFieldProps("password")}
          type="password"
          name="password"
          id="password"
          error={form.touched.password && form.errors.password}
        />
        <button type="submit" className="btn btn-primary">
          Sign Up As Admin
        </button>
      </form>
    </>
  );
};

export default SignUpBiz;
