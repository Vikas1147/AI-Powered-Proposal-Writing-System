import PropTypes from "prop-types";

const Button = ({ children, onClick, className = "", type = "button", disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg bg-blue-600 text-white font-medium transition 
                  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 
                  disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
};

// ✅ Add PropTypes validation
Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  disabled: PropTypes.bool,
};

// ✅ Default Props
Button.defaultProps = {
  onClick: () => {},
  className: "",
  type: "button",
  disabled: false,
};

export default Button;
