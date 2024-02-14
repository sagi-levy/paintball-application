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

const stripePromise = loadStripe(
  "pk_test_51OXTK9FzIkHLxdyfqYLsI9aG4k28P6nhqV0o42t2vVBgD6j0UUBrinpOLAAS4l5tuJ3X9spREb83JyMUIyByhYew00dkMjUQlN"
);

const CreateActivityCard = () => {
  //const [tasksTimes, setTasksTimesAlreadyCatches] = useState([]); // should get from server
  const { logIn, user } = useAuth();
  const {  setTasksTimesAlreadyCatches,tasksTimes} = useAppContext();
  console.log("tasks times:",tasksTimes)

  const isUser = user;
  const fetchTasksTimes = async () => {
    try {
      const response = await fetch(
        "http://localhost:3003/api/tasks",
        user
          ? {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "x-auth-token": localStorage.token,
                // Add other headers as needed
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
          ); // when there is user (token) data gives me also user and also tasks in an object
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

        const x = await createActivityCard(body);
        console.log("new task is:", x.data.newTask);
        setProp(x.data.newTask);

        navigate(
          `/cards/payment/${values.phoneNumber}?cardId=${x.data.newTask._id}`
        );
      } catch ({ response }) {
        if (response && response.status === 400) {
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
      <p>fill the form to and it will send to the Admin</p>
      <form className="w-50 w-md-100" onSubmit={form.handleSubmit}  style={{ background: "rgba(111,111,111,0.3)", padding: "20px", borderRadius: "8px" }}>
        {errorApiRequest && (
          <div className="alert alert-danger" >{errorApiRequest}</div>
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
          {...form.getFieldProps("activityTime")}
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
          value={isUser ? user._id : form.values.phoneNumber}
          disabled={isUser}
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
