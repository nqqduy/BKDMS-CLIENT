import { ErrorMessage } from 'formik';
import React from 'react';
// import { CgDanger } from 'react-icons/cg';
const FormRow = ({
    type,
    classIcon,
    labelText,
    unit,
    placeholder,
    icon,
    handleChange,
    notLabel,
    disabled = false,
    // của formik
    field,
    form,
}) => {
    let name = field.name;

    if (handleChange) {
        field.onChange = handleChange;
    }
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];
    return (
        <div className="form-row">
            {notLabel || (
                <label htmlFor={name} className={icon ? 'form-label label-icon' : 'form-label'}>
                    {icon}
                    {labelText || name}
                </label>
            )}
            <div className="form-unit">
                <input
                    id={name}
                    {...field}
                    placeholder={placeholder}
                    type={type}
                    className={unit ? `form-unit-input` : `form-input`}
                    disabled={disabled}
                />
                {unit && <span>{unit}</span>}
            </div>

            {showError && <span className="error-field">{errors[name]}</span>}
        </div>
    );
};
export default FormRow;
