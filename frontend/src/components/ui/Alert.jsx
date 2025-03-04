import PropTypes from "prop-types";

const Alert = ({ children, type = "info" }) => {
  const styles = {
    info: "bg-blue-50 text-blue-700",
    error: "bg-red-50 text-red-700",
    success: "bg-green-50 text-green-700",
  };

  return <div className={`${styles[type]} p-4 rounded-lg`}>{children}</div>;
};

Alert.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(["info", "error", "success"]),
};

export default Alert;
