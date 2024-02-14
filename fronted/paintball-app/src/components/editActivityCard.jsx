import { Formik, useFormik } from "formik";
import Joi from "joi";
import FormikUsingJoi from "../utils/formikUsingJoi";
import { useState } from "react";
import PageHeader from "./common/pageHeader";
import Input from "../components/common/input";
import { updateActivityCard } from "../services/cardsServices";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import queryString from "query-string"; // Import query-string library
import { useAuth } from "../context/auth.context";
import { useAppContext } from "../context/card.context";

import useActivityCard from "../hooks/useActivityCard";
const EditActivityCard = () => {
  const { user } = useAuth();
  const isAdmin = user && user.biz;
  const location = useLocation();
  const {
    setTasksTimesAlreadyCatches,
    tasksTimes,
    isTimeInArray,
    checkTimeValidity,
    tasksTimesAlreadyCatches,
  } = useAppContext();
  console.log("tasks times:", tasksTimes);

  const queryParams = queryString.parse(location.search);
  const { cardId } = queryParams;
  console.log(cardId);
  const navigate = useNavigate();
  console.log(useParams());
  const { id } = useParams();
  console.log(id);
  const ActivityCard = useActivityCard(id, cardId);
  console.log(ActivityCard);

  useEffect(() => {
    if (!ActivityCard) {
      return;
    }

    const {
      _id,
      activityName,
      activityDescription,
      activityAddress,
      activityDate,
      phoneNumber,
      bizUserName,
      activityImage,
      activityTime,
      user_id,
      isPaid,
      inCalendar,
    } = ActivityCard;
    form.setValues({
      _id,
      user_id,
      isPaid,
      inCalendar,
      activityName,
      activityDescription,
      activityAddress,
      activityDate,
      phoneNumber,
      bizUserName,
      activityImage,
      activityTime,
    });
  }, [ActivityCard]);
  const [errorApiRequest, setErrorApiRequest] = useState("");

  const form = useFormik({
    initialValues: {
      _id: "",
      activityName: "",
      activityDescription: "",
      activityAddress: "",
      activityDate: "",
      phoneNumber: "",
      bizUserName: "",
      activityImage: "",
      activityTime: "",
      inCalendar: "",
      isPaid: "",
      user_id: "",
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
      isPaid: Joi.boolean(),
      inCalendar: Joi.boolean(),
      user_id: Joi.string(),
      _id: Joi.string().allow(""),
    }),

    onSubmit: async (values) => {
      console.log("this is values:", values);
      try {
        const { _id, activityImage, ...body } = values;
        console.log(values);
        if (activityImage) {
          body.activityImage = activityImage;
        }

        await updateActivityCard(id, cardId, values);
        navigate("/calendar");
      } catch ({ response }) {
        if (response && response.status === 400) {
          setErrorApiRequest(response.data);
        }
      }
    },
  });
  // if (
  //   checkTimeValidity(
  //     form.values.activityTime,
  //     form.values.activityDate,
  //     tasksTimes
  //   )
  // ) {
  //   form.errors.activityTime = "there is already activity in the time";
  // } 
  

  console.log(Object.keys(form.errors));
  return (
    <>
      <PageHeader title={<h1>edit card page</h1>} />
      <p>you can edit the card by savig the new valus</p>
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
          {...form.getFieldProps("activityDate")}
        />
        <Input
          onChange={form.handleChange}
          error={form.errors.activityImage}
          name="activityImage"
          type="text"
          id="activityImage"
          {...form.getFieldProps("activityImage")}
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
          value={ActivityCard ? ActivityCard.phoneNumber : ""}
          disabled
          {...form.getFieldProps("phoneNumber")}
        />
        <Input
          onChange={form.handleChange}
          error={form.errors.activityTime}
          name="activityTime"
          type="time"
          id="activityTime"
          {...form.getFieldProps("activityTime")}
        />
        {/* Your existing code... */}
        {isAdmin && ( // Conditionally render inputs only if user is an admin
          <>
            <div className="checkbox-group">
              <Input
                style={{ width: "5px", margin: "auto" }}
                onChange={form.handleChange}
                type="checkbox"
                id="isPaid"
                name="isPaid"
                checked={form.values.isPaid}
                {...form.getFieldProps("isPaid")}
                className="form-check-input w-25"
              />

              <Input
                style={{ width: "5px", margin: "auto" }}
                onChange={form.handleChange}
                type="checkbox"
                id="inCalendar"
                name="inCalendar"
                checked={form.values.inCalendar}
                {...form.getFieldProps("inCalendar")}
                className="form-check-input w-25"
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="btn btn-primary"
          disabled={Object.keys(form.errors).length}
        >
          edit card
        </button>
      </form>
    </>
  );
};
export default EditActivityCard;
