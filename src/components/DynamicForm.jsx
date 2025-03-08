import React, { useState } from "react";
import formSchema from "../formSchema.json";
import FieldRenderer from "./FieldRenderer";

const DynamicForm = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e, name) => {
    const { value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear error for the field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    formSchema.fields.forEach((field) => {
      const value = formData[field.name];

      // Required field validation
      if (field.required && !value) {
        newErrors[field.name] = `${field.label} is required`;
      }

      // Min length validation
      if (field.minLength && value && value.length < field.minLength) {
        newErrors[field.name] = `${field.label} must be at least ${field.minLength} characters`;
      }

      // Max length validation
      if (field.maxLength && value && value.length > field.maxLength) {
        newErrors[field.name] = `${field.label} must be less than ${field.maxLength} characters`;
      }

      // Pattern validation (e.g., for email)
      if (field.pattern && value && !new RegExp(field.pattern).test(value)) {
        newErrors[field.name] = `Invalid ${field.label}`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form Data:", formData);
      alert(JSON.stringify(formData, null, 2));
    } else {
      console.log("Validation Errors:", errors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="dynamic-form">
      <h1>{formSchema.title}</h1>
      {formSchema.fields.map((field, index) => (
        <FieldRenderer
          key={index}
          field={field}
          formData={formData}
          handleChange={handleChange}
          error={errors[field.name]}
        />
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicForm;