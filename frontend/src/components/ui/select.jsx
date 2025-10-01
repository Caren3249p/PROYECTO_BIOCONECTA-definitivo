import React, { useState, createContext, useContext } from 'react';
import { cn } from '../../lib/utils';

const SelectContext = createContext();

const Select = ({ value, onValueChange, children, ...props }) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || '');

  const handleValueChange = (newValue) => {
    setSelectedValue(newValue);
    onValueChange?.(newValue);
    setOpen(false);
  };

  return (
    <SelectContext.Provider value={{
      open,
      setOpen,
      selectedValue,
      handleValueChange
    }}>
      <div className="relative" {...props}>
        {children}
      </div>
    </SelectContext.Provider>
  );
};

const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => {
  const { open, setOpen } = useContext(SelectContext);

  return (
    <button
      type="button"
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      onClick={() => setOpen(!open)}
      ref={ref}
      {...props}
    >
      {children}
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 opacity-50"
      >
        <path
          d="m4.5 6 3 3 3-3"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
});

const SelectContent = React.forwardRef(({ className, children, ...props }, ref) => {
  const { open } = useContext(SelectContext);

  if (!open) return null;

  return (
    <div
      className={cn(
        "absolute z-50 w-full mt-1 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white text-gray-950 shadow-md",
        className
      )}
      ref={ref}
      {...props}
    >
      <div className="p-1 max-h-60 overflow-y-auto">
        {children}
      </div>
    </div>
  );
});

const SelectItem = React.forwardRef(({ className, children, value, ...props }, ref) => {
  const { handleValueChange, selectedValue } = useContext(SelectContext);

  return (
    <div
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-2 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100 focus:text-gray-900",
        selectedValue === value && "bg-gray-100",
        className
      )}
      onClick={() => handleValueChange(value)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});

const SelectValue = React.forwardRef(({ className, placeholder, ...props }, ref) => {
  const { selectedValue } = useContext(SelectContext);

  return (
    <span
      className={cn("block truncate", className)}
      ref={ref}
      {...props}
    >
      {selectedValue || placeholder || "Seleccionar..."}
    </span>
  );
});

Select.displayName = "Select";
SelectTrigger.displayName = "SelectTrigger";
SelectContent.displayName = "SelectContent";
SelectItem.displayName = "SelectItem";
SelectValue.displayName = "SelectValue";

export { Select, SelectTrigger, SelectContent, SelectItem, SelectValue };