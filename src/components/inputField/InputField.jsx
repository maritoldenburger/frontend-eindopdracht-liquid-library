import React from "react";

function InputField({label, type, id, name, register, placeholder, validation}) {
    return (
        <div className={"input-field"}>
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
        </div>
    );
}

export default InputField;