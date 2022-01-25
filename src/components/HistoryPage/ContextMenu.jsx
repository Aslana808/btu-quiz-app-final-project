import React, { useState, useEffect } from "react";

const ContextMenu = ({ parentRef, isOpened, delete_data, time }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    delete_data(time);
    setIsOpen(false);
  };
  useEffect(() => {
    isOpened && setIsOpen(true);
  }, [isOpened]);
  useEffect(() => {
    const hideMenu = (e) => {
      const parent = parentRef.current;
      if (parent.contains(e.target)){
        e.preventDefault();
      }
      if (!parent.contains(e.target)){
        setIsOpen(false);
      }
    };
    document.addEventListener("click", hideMenu);
    return () => {
      document.removeEventListener("click", hideMenu);
    };
  });

  return isOpen ? (
    <div className="menu">
      <div className="delete" onClick={() => handleDelete()}>
        <span>delete</span>
      </div>
    </div>
  ) : null;
};
export default ContextMenu;
