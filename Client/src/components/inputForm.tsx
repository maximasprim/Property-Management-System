import React, { useState } from 'react';

interface Field {
  name: string;
  type: string;
  label: string;
  placeholder?: string;
  options?: { value: string; label: string }[]; // For select inputs
}

interface ReusableFormProps {
  fields: Field[];
  initialValues: Record<string, any>;
  onSubmit: (values: Record<string, any>) => void;
  submitButtonLabel?: string;
}

const ReusableForm: React.FC<ReusableFormProps> = ({
  fields,
  initialValues,
  onSubmit,
  submitButtonLabel = "Submit",
}) => {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-lg shadow-md">
      {fields.map((field) => (
        <div key={field.name} className="mb-3">
          <label className="block text-white font-medium">{field.label}</label>
          {field.type === "select" ? (
            <select
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          )}
        </div>
      ))}
      <button type="submit" className="btn btn-primary w-full">
        {submitButtonLabel}
      </button>
    </form>
  );
};

export default ReusableForm;
