import Select from 'react-select';

function SelectNotFormik({
    labelText,
    valueState,
    options,
    handleChange,
    placeholder,
    notLabel,
    name,
    className = '',
    isDisabled = false,
}) {
    // value of state
    let selectedOption;
    // if (valueState instanceof Object) {
    //     selectedOption = options.find((option) => JSON.stringify(option.value) === JSON.stringify(valueState));
    // } else
    if (valueState) selectedOption = options.find((option) => option.value === valueState);

    if (!selectedOption) {
        selectedOption = null;
    }
    return (
        <div className={`form-row ${className}`}>
            {notLabel || (
                <label htmlFor={name} className="form-label">
                    {labelText || name}
                </label>
            )}

            <Select
                id={name}
                value={selectedOption}
                onChange={handleChange}
                options={options}
                placeholder={placeholder}
                isDisabled={isDisabled}
                // menuPlacement="top"
            />
        </div>
    );
}

export default SelectNotFormik;
