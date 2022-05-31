import React from 'react';
// import { CgDanger } from 'react-icons/cg';
const FormRowTextArea = ({
    type,
    classIcon,
    labelText,
    unit,
    placeholder,
    // của formik
    field,
    form,
}) => {
    let name;
    if (field) name = field.name;
    else {
        field = {};
        name = '';
    }
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];
    return (
        <div className="form-row">
            <label htmlFor={name} className="form-label">
                {classIcon && <i className={`${classIcon} icon`}></i>} {labelText || name}
            </label>
            <div className="form-unit">
                <textarea
                    id={name}
                    {...field}
                    placeholder={placeholder}
                    type={type}
                    className={unit ? `form-unit-input` : `form-textarea`}
                ></textarea>
                {unit && <span>{unit}</span>}
            </div>
            {showError && <span className="error-field">{errors[name]}</span>}
        </div>
    );
};
export default FormRowTextArea;
