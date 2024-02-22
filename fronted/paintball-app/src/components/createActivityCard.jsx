import { Formik, useFormik } from "formik";
import Joi from "joi";
import FormikUsingJoi from "../utils/formikUsingJoi";
import PageHeader from "./common/pageHeader";
import Input from "../components/common/input";
import { createActivityCard } from "../services/cardsServices";
import { useNavigate } from "react-router-dom";
import PaymentForm from "./common/payment";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useAuth } from "../context/auth.context";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/card.context";

const stripePromise = loadStripe(process.env.REACT_APP_LOAD_STRIPE_STRING);

const CreateActivityCard = () => {
  //const [tasksTimes, setTasksTimesAlreadyCatches] = useState([]); // should get from server
  const { logIn, user } = useAuth();
  const { setTasksTimesAlreadyCatches, tasksTimes } = useAppContext();
  console.log("tasks times:", tasksTimes);

  const isUser = user;
  const fetchTasksTimes = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/api/tasks`,
        user
          ? {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "x-auth-token": localStorage.token,
              },
            }
          : null
      );
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await response.json();

      user
        ? setTasksTimesAlreadyCatches(
            data.tasks
              .filter(
                (activity) => activity.activityTime && activity.activityDate
              )
              .map(({ activityTime, activityDate }) => ({
                activityTime,
                activityDate,
              }))
          )
        : setTasksTimesAlreadyCatches(
            data
              .filter(
                (activity) => activity.activityTime && activity.activityDate
              )
              .map(({ activityTime, activityDate }) => ({
                activityTime,
                activityDate,
              }))
          ); 
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    fetchTasksTimes();
  }, []);

  const { setProp } = useAppContext();

  const navigate = useNavigate();
  const [errorApiRequest, setErrorApiRequest] = useState("");
  const form = useFormik({
    initialValues: {
      activityName: "",
      activityDescription: "",
      activityAddress: "",
      activityDate: "",
      phoneNumber: user ? user._id : "",
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
      activityTime: Joi.string()
        .regex(/^([0-9]{2})\:([0-9]{2})$/)
        .custom(() => checkTimeValidity),
    }),
    onSubmit: async (values) => {
      try {
        const { activityImage, ...body } = values;
        if (activityImage) {
          body.activityImage = activityImage;
        }
        console.log(body);

        const dataServer = await createActivityCard(body);
        console.log("new task is:", dataServer.data.newTask);
        setProp(dataServer.data.newTask);

        navigate(
          `/cards/payment/${values.phoneNumber}?cardId=${dataServer.data.newTask._id}`
        );
      } catch ({ response }) {
        if ((response && response.status === 400) || response.status === 502) {
          setErrorApiRequest(response.data);
        }
      }
    },
  });

  function isTimeInArray(inputTime, inputDate, tasksTimes) {
    return tasksTimes.some(
      (activity) =>
        activity.activityTime === inputTime &&
        activity.activityDate === inputDate
    );
  }
  const checkTimeValidity = (inputTime, inputDate, activitiesArray) => {
    if (isTimeInArray(inputTime, inputDate, activitiesArray)) {
      form.errors.activityTime = "there is already activity in this time";
    }
  };
  try {
    checkTimeValidity(
      form.values.activityTime,
      form.values.activityDate,
      tasksTimes
    );
    console.log("Input time is valid.");
  } catch (error) {
    console.error(error.message);
  }
  return (
    <>
      <PageHeader title={<h1>create paintball activity card page</h1>} />
      <p>fill the form and it will be send to the Admin</p>
      <form
        className="create-form1"
        /*className="w-50 w-sm-100"*/ onSubmit={form.handleSubmit}
        style={{
          background: "rgba(111,111,111,0.3)",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        {errorApiRequest && (
          <div className="alert alert-danger">{errorApiRequest}</div>
        )}
        <Input
        example={"paintball"} 
          onChange={form.handleChange}
          error={form.errors.activityName}
          names="activity name"
          type="text"
          id="activity-name"
          {...form.getFieldProps("activityName")}
        />

        <Input
        example={"birthday party"}
          onChange={form.handleChange}
          error={form.errors.activityDescription}
          names="activity description"
          type="text"
          id="activity-Description"
          {...form.getFieldProps("activityDescription")}
        />
        <Input
        example={"12/12/2023"}
          onChange={form.handleChange}
          error={form.errors.activityDate}
          names="activity date"
          type="date"
          id="activityDate"
          {...form.getFieldProps("activityDate")}
        />
        <Input
        example={"12:00"}
          onChange={form.handleChange}
          error={form.errors.activityTime}
          names="activity time"
          type="time"
          id="activityTime"
          {...form.getFieldProps("activityTime")}
        />
        <Input
        example={"image url"}
          onChange={form.handleChange}
          error={form.errors.activityImage}
          names="activity image"
          type="text"
          id="activityImage"
        />
        <Input
        example={"kfar sava"}
          onChange={form.handleChange}
          error={form.errors.activityAddress}
          names="activity Address"
          type="text"
          id="activity-Address"
          {...form.getFieldProps("activityAddress")}
        />
        <Input
        example={"John Doe"}
          onChange={form.handleChange}
          error={form.errors.bizUserName}
          names="User Name"
          type="text"
          id="bizUserName"
          {...form.getFieldProps("bizUserName")}
        />
        <Input
        example={"0541234567"}
          onChange={form.handleChange}
          error={form.errors.phoneNumber}
          names="phone Number"
          type="text"
          id="phoneNumber"
          value={isUser ? user._id : form.values.phoneNumber}
          disabled={isUser}
        />

        <button
          type="submit"
          className="btn btn-primary mt-4"
          disabled={Object.keys(form.errors).length}
        >
          leave your activity details
        </button>
      </form>
    </>
  );
};
export default CreateActivityCard;
