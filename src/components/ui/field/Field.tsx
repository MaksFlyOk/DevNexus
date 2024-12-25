export const Field = ({
  register,
  name,
  label,
  placeholder,
  error,
  options,
  disabled,
  type,
  ...rest
}) => {
  return (
    <div className='mb-3'>
      <label htmlFor={'validationServer_' + name} className='form-label'>
        {label}
      </label>
      <input
        {...register(name, options)}
        {...rest}
        type={type}
        disabled={disabled}
        className={error ? 'form-control is-invalid' : 'form-control is-valid'}
        id={'validationServer_' + name}
        placeholder={placeholder}
        aria-describedby={'validationServer_' + name}
        required={false}
      />
      <div
        id={'validationServer_' + name + 'FeedBack'}
        className='invalid-feedback'
      >
        {error}
      </div>
    </div>
  )
}
