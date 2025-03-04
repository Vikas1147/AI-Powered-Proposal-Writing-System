import PropTypes from "prop-types";

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-md ${className}`}>
    {children}
  </div>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Card;
