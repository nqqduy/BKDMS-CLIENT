import React from 'react';

const FormRowNotFormik = ({ type, name, labelText, valueState, handleChange, placeholder, notLabel, unit, min = false }) => {
    let date = '';
    if (min) {
        date =
            new Date(`${min}`).getFullYear() +
            '-' +
            (new Date(`${min}`).getMonth() + 1).toString().padStart(2, 0) +
            '-' +
            new Date(`${min}`).getDate().toString().padStart(2, 0);
    }
    return (
        <div className="form-row">
            {notLabel || (
                <label htmlFor={name} className="form-label">
                    {labelText}
                </label>
            )}
            <div className="form-unit">
                {!min ? (
                    <input
                        name={name}
                        value={valueState}
                        onChange={handleChange}
                        placeholder={placeholder}
                        type={type}
                        className={unit ? `form-unit-input` : `form-input`}
                    />
                ) : (
                    <input
                        name={name}
                        value={valueState}
                        onChange={handleChange}
                        placeholder={placeholder}
                        type={type}
                        className={unit ? `form-unit-input` : `form-input`}
                        min={date}
                    />
                )}
                {unit && <span>{unit}</span>}
            </div>
        </div>
    );
};

export default FormRowNotFormik;
