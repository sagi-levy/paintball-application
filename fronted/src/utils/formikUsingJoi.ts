import { FormikErrors } from "formik";
import Joi from "joi";

const FormikUsingJoi: <Values>(values: Values) => void | object | Promise<FormikErrors<Values>> = (schema) => {
  return (values) => {
    const { error } = Joi.object(schema).validate(values, {
      abortEarly: false,
    });
    if (!error) {
      return null;
    }
    const errors = {};

    for (const detail of error.details) {
      const errorKey = detail.path[0];
      errors[errorKey] = detail.message;
    }
    return errors;
  };
};
export default FormikUsingJoi;
