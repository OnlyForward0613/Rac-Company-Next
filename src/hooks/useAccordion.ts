import { useState } from "react";

const useAccordion = (expanded: boolean) => {
  const [open, setOpen] = useState(expanded);

  const toggle = () => {
    setOpen((prev) => !prev);
  };

  return {
    open,
    toggle,
  };
};

export default useAccordion;
