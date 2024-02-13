const Input = ({ error, name, type, ...rest }) => {
  console.log(rest, type);
  return (
    <div>
      <div className="form-group m-5 my-2">
        <label htmlFor={`${name}`}>{name}</label>
        <input
          className={`form-control ${error ? "is-invalid" : ""}`}
          {...rest}
          placeholder={`enter your ${name}`}
          type={type}
          id={rest.id}
          name={name}
        />
        <span className="invalid-feedback">{error}</span>
      </div>
    </div>
  );
};
export default Input;
