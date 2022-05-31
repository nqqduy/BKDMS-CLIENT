const TextareaNotFormik = ({ type, name, labelText, valueState, handleChange, placeholder, notLabel, unit }) => {
    return (
        <div className="form-row">
            {notLabel || (
                <label htmlFor={name} className="form-label">
                    {labelText}
                </label>
            )}
            <div className="form-unit">
                <textarea
                    name={name}
                    value={valueState}
                    onChange={handleChange}
                    placeholder={placeholder}
                    type={type}
                    className={unit ? `form-unit-input` : `form-textarea`}
                ></textarea>
                {unit && <span>{unit}</span>}
            </div>
        </div>
    );
};

export default TextareaNotFormik;
