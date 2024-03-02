const Input = ({ error,isTouched, names, type,example, ...rest }) => {
  return (
    <div>
    <div className="form-group">
      <label htmlFor={`${names}`}>{names}</label>
      <input
        className={`form-control ${error && isTouched ? "is-invalid" : ""}`}
        {...rest}
        placeholder={window.innerWidth > 768 ? `enter your ${names}` : `${example}`}
        type={type}
        id={rest.id}
        names={names}
      />
      {error && isTouched && <span className="invalid-feedback">{error}</span>}
    </div>
  </div>
  );
};
export default Input;
