import React from "react";

export const Button = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 ${className}`}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button"; 