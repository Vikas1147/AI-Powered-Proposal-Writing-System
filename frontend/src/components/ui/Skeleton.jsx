import PropTypes from "prop-types";

const Skeleton = ({ className = "", width = "100%", height = "1rem" }) => {
  return (
    <div
      className={`animate-pulse bg-gray-300 rounded-md ${className}`}
      style={{ width, height }}
      role="status"
      aria-hidden="true"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

// ✅ Add PropTypes Validation
Skeleton.propTypes = {
  className: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

export default Skeleton;
