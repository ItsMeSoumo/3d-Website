import React from "react";

export const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={`w-full rounded-md border px-3 py-2 text-sm min-h-[100px] focus:outline-none focus:ring-2 focus:ring-purple-500 ${className}`}
      ref={ref}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea"; 