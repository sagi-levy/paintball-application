const Input = ({ error, name, type, ...rest }) => {
  return (
    <div>
      <div className="form-group m-5 my-2">
        <label htmlFor={`${name}`}>{name}</label>
        <input
          {...rest}
          placeholder={`enter your ${name}`}
          type={type}
          id={rest.id}
          name={name}
          className={`form-control ${error ? "is-invalid" : ""}`}
        />
        <span className="invalid-feedback">{error}</span>
      </div>
    </div>
  );
};
export default Input;
