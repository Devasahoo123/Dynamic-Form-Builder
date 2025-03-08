import React from "react";
import '../styles.css';

const FieldRenderer = ({ field, formData, handleChange, error }) => {
  const { type, label, name, required, options, fields } = field;

  switch (type) {
    case "text":
    case "email":
      return (
        <div className="form-field">
          <label>{label}</label>
          <input
            type={type}
            name={name}
            value={formData[name] || ""}
            onChange={(e) => handleChange(e, name)}
            required={required}
          />
          {error && <span className="error-message">{error}</span>}
        </div>
      );
    case "select":
      return (
        <div className="form-field">
          <label>{label}</label>
          <select
            name={name}
            value={formData[name] || ""}
            onChange={(e) => handleChange(e, name)}
            required={required}
          >
            <option value="">Select</option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          {error && <span className="error-message">{error}</span>}
        </div>
      );
    case "checkbox":
      return (
        <div className="form-field">
          <label>
            <input
              type="checkbox"
              name={name}
              checked={formData[name] || false}
              onChange={(e) => handleChange(e, name)}
            />
            {label}
          </label>
          {error && <span className="error-message">{error}</span>}
        </div>
      );
    case "section":
      return (
        <div className="form-section">
          <h2>{label}</h2>
          {fields.map((nestedField, index) => (
            <FieldRenderer
              key={index}
              field={nestedField}
              formData={formData}
              handleChange={handleChange}
              error={error} // Pass the error prop down to nested fields
            />
          ))}
        </div>
      );
    default:
      return null;
  }
};

export default FieldRenderer;