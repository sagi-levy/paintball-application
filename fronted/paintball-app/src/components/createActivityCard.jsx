import { Formik, useFormik } from "formik";
import Joi from "joi";
import FormikUsingJoi from "../utils/formikUsingJoi";
import { useState } from "react";
import PageHeader from "./common/pageHeader";
import Input from "../components/common/input";
import { createActivityCard } from "../services/cardsServices";
import { useNavigate } from "react-router-dom";
const CreateActivityCard = () => {
  const navigate = useNavigate();
  const [errorApiRequest, setErrorApiRequest] = useState("");
  const form = useFormik({
    initialValues: {
      activityName: "",
      activityDescription: "",
      activityAddress: "",
      activityDate: "",
      phoneNumber: "",
      bizUserName: "",
      activityImage: "",
      activityTime: "",
    },
    validate: FormikUsingJoi({
      activityName: Joi.string().min(2).max(255).required(),
      bizUserName: Joi.string().min(2).max(255).required(),
      activityDescription: Joi.string().min(2).max(1024).required(),
      activityAddress: Joi.string().min(2).max(400).required(),
      phoneNumber: Joi.string()
        .allow("")
        .min(9)
        .max(10)
        .required()
        .regex(/^0[2-9]\d{7,8}$/),
      activityImage: Joi.string().allow("").min(11).max(1024),
      activityDate: Joi.date().allow(""),
      activityTime: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/),
    }),
    onSubmit: async (values) => {
      try {
        const { activityImage, ...body } = values;
        if (activityImage) {
          body.activityImage = activityImage;
        }
        console.log(body);
        await createActivityCard(body);
        navigate("/");
      } catch ({ response }) {
        if (response && response.status === 400) {
          setErrorApiRequest(response.data);
        }
      }
    },
  });

  return (
    <>
      <PageHeader title={<h1>create paintball activity card page</h1>} />
      <p>fill the form to and it will send to the Admin</p>
      <form onSubmit={form.handleSubmit}>
        {errorApiRequest && (
          <div className="alert alert-danger">{errorApiRequest}</div>
        )}
        <Input
          onChange={form.handleChange}
          error={form.errors.activityName}
          name="activity-name"
          type="text"
          id="activity-name"
          {...form.getFieldProps("activityName")}
        />
        <Input
          onChange={form.handleChange}
          error={form.errors.activityDescription}
          name="activity-Description"
          type="text"
          id="activity-Description"
          {...form.getFieldProps("activityDescription")}
        />
        <Input
          onChange={form.handleChange}
          error={form.errors.activityDate}
          name="activityDate"
          type="date"
          id="activityDate"
          // {...form.getFieldProps("activityDate")}
        />
        <Input
          onChange={form.handleChange}
          error={form.errors.activityTime}
          name="activityTime"
          type="time"
          id="activityTime"
          // {...form.getFieldProps("activityDate")}
        />
        <Input
          onChange={form.handleChange}
          error={form.errors.activityImage}
          name="activityImage"
          type="text"
          id="activityImage"
        />
        <Input
          onChange={form.handleChange}
          error={form.errors.activityAddress}
          name="activity-Address"
          type="text"
          id="activity-Address"
          {...form.getFieldProps("activityAddress")}
        />
        <Input
          onChange={form.handleChange}
          error={form.errors.bizUserName}
          name="bizUserName"
          type="text"
          id="bizUserName"
          {...form.getFieldProps("bizUserName")}
        />
        <Input
          onChange={form.handleChange}
          error={form.errors.phoneNumber}
          name="phoneNumber"
          type="text"
          id="phoneNumber"
        />

        <button
          type="submit"
          className="btn btn-primary"
          disabled={Object.keys(form.errors).length}
        >
          leave your activity details
        </button>
      </form>
    </>
  );
};
export default CreateActivityCard;
