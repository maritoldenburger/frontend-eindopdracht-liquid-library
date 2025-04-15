import React from "react";

function InputField({label, type, id, name, register, placeholder, validation, errors}) {
    return (
        <div className="input-field">
            <label htmlFor={id}>
                {label}
            </label>
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                className="input-field-input"
                {...register(name, validation)}
            />
            {errors && errors[name] && (
                <p className="form-error-message">{errors[name].message}</p>)}
        </div>
    );
}

export default InputField;