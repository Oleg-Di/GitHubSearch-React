




export const Input = ({control, onChange}) => {

  return (
    
    <div className="form-floating mb-3" style= {{width: 400}}>
      <input
        onChange={onChange}
        value={control.value}
        type={control.type}
        className="form-control"
        id={control.label}
        placeholder={control.placeHolder}
      />
      <label htmlFor={control.label}>{control.placeHolder}</label>
      {!control.valid?<p style={{color: 'red'}} className="text-center">{control.errorMessage}</p>: null}
    </div>
  );
};
