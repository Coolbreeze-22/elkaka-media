import React, { useEffect, useRef } from "react";

const ClickAwayListener = ({ children, onClickAway }) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isChildElement = ref?.current?.contains(event.target);
      if (!isChildElement) {
        onClickAway();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClickAway]);

  return <div ref={ref}>{children}</div>;
};

export default ClickAwayListener;
