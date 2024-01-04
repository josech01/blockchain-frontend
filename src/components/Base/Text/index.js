import "./index.scss";

export const PText = ({ children, className }) => {
  return <p className={`text-base ${className}`}>{children}</p>;
};
