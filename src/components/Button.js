import classnames from "classnames";

const Button = ({ text, onClick, className, selected }) => (
  <button
    className={classnames(`${className}`, { selected: selected })}
    onClick={onClick}
  >
    {text}
  </button>
);

export default Button;
