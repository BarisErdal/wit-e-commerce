const ButtonCta = ({
  children,
  onClick,
  variant = "success",
  className = "",
}) => {
  const baseClasses =
    "border rounded-[5px] px-6 py-3 font-semibold transition";

  const variants = {
    success:
      "bg-success text-white border-transparent hover:bg-white hover:text-success hover:border-success",
    primary:
      "bg-header-turkuaz text-white border-transparent hover:bg-white hover:text-header-turkuaz hover:border-primary",
    danger:
      "bg-red-500 text-white border-transparent hover:bg-white hover:text-red-500 hover:border-red-500",
    outline:
      "bg-transparent text-white border-gray-300 hover:bg-gray-100 hover:text-banner-blue",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default ButtonCta;
