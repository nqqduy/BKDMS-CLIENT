import React from 'react';
import Select from 'react-select';

function FormRowSelect({
    field,

    form,
    labelText,
    valueState,
    options,
    handleChange,
    placeholder,
    notLabel,
    isDisabled,
}) {
    let selectedOption;
    const { name } = field;

    if (valueState) {
        // value of state
        selectedOption = options.find((option) => option.value === valueState);

        if (!selectedOption) {
            selectedOption = null;
        }
    } else {
        const { value } = field;
        selectedOption = options.find((option) => option.value === value);
    }
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];

    const handleSelectedOptionChange = (selectedOption) => {
        const selectedValue = selectedOption ? selectedOption.value : selectedOption;

        const changeEvent = {
            target: {
                name: name,
                value: selectedValue,
            },
        };
        field.onChange(changeEvent);
        if (handleChange) handleChange(changeEvent);
    };

    return (
        <div className="form-row">
            {notLabel || (
                <label htmlFor={name} className="form-label">
                    {labelText || name}
                </label>
            )}
            <Select
                id={name}
                {...field}
                // - ghi đè giá trị field
                value={selectedOption}
                onChange={handleSelectedOptionChange}
                // --
                options={options}
                placeholder={placeholder}
                isDisabled={isDisabled}
            />
            {showError && <span className="error-field">{errors[name]}</span>}
        </div>
    );
}

export default FormRowSelect;
