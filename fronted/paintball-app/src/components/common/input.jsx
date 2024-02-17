const Input = ({ error, names, type, ...rest }) => {
  return (
    <div>
      <div className="form-group m-5 my-2">
        <label htmlFor={`${names}`}>{names}</label>
        <input
          className={`form-control ${error ? "is-invalid" : ""}`}
          {...rest}
          placeholder={ `enter your ${names}`}
          type={type}
          id={rest.id}
          names={names}
        />
        <span className="invalid-feedback">{error}</span>
      </div>
    </div>
  );
};
export default Input;
