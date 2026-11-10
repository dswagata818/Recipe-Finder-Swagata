export default function FormInput({
  label,
  id,
  error,
  rightElement,
  ...inputProps
}) {
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      <div className={rightElement ? "input-wrap has-action" : "input-wrap"}>
        <input id={id} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} {...inputProps} />
        {rightElement}
      </div>
      {error && <span className="field-error" id={`${id}-error`}>{error}</span>}
    </div>
  );
}
