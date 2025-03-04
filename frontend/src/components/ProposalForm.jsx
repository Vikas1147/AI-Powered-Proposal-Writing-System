import PropTypes from "prop-types";
import { useState } from 'react';
import Card from "./ui/Card";
import Alert from "./ui/Alert";
import { proposalService } from '../services/api';

// A reusable form input component with label and error handling
const FormField = ({ 
  id, 
  label, 
  type = "text", 
  value, 
  onChange, 
  error, 
  autoFocus = false,
  ...props 
}) => {
  const isTextarea = type === "textarea";
  const Component = isTextarea ? "textarea" : "input";
  
  return (
    <div className="space-y-2">
      <label 
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 select-none"
      >
        {label}
      </label>
      <Component
        id={id}
        type={type !== "textarea" ? type : undefined}
        value={value}
        onChange={onChange}
        className={`
          w-full p-2 border rounded-lg bg-white
          transition duration-200 ease-in-out
          ${isTextarea ? 'min-h-[100px] resize-y' : ''}
          ${error ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500 focus:border-blue-500'}
          hover:border-gray-400 focus:ring-2
        `}
        autoFocus={autoFocus}
        aria-label={label}
        aria-invalid={error ? "true" : "false"}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
};

FormField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  autoFocus: PropTypes.bool
};

const ProposalForm = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await proposalService.createProposal(formData);
      setFormData({ title: '', description: '' });
      if (onSubmitSuccess) onSubmitSuccess(result);
    } catch (err) {
      setError(err.message || 'Failed to create proposal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Create New Proposal
      </h3>

      {error && (
        <Alert type="error" className="mb-4">
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          id="title"
          name="title"
          label="Title"
          value={formData.title}
          onChange={handleChange}
          error={error}
          required
          autoFocus
          placeholder="Enter a descriptive title"
        />

        <FormField
          id="description"
          name="description"
          label="Description"
          type="textarea"
          value={formData.description}
          onChange={handleChange}
          error={error}
          required
          placeholder="Describe your proposal in detail..."
        />

        <button
          type="submit"
          disabled={loading}
          className={`
            w-full px-4 py-2 rounded-lg font-medium
            transition duration-200 ease-in-out
            ${loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
            }
            text-white shadow-sm hover:shadow
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          `}
        >
          {loading ? 'Generating...' : 'Generate Proposal'}
        </button>
      </form>
    </Card>
  );
};

ProposalForm.propTypes = {
  onSubmitSuccess: PropTypes.func.isRequired,
};

export default ProposalForm;
