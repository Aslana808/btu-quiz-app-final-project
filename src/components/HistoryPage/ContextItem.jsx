import React, { useRef, useState } from "react";
import ContextMenu from "./ContextMenu";
const ContextItem = ({time,score,deleteData,length,}) => {
  const listItem = useRef();
  const [isRightClicked, setIsRightClicked] = useState(false);
  return (
    <li
      ref={listItem}
      onContextMenu={(e) => {
        e.preventDefault();
        setIsRightClicked(e);
      }}>
      <div className="qula">
          <p className="p">point:</p>
          <p>{score}/{length}</p>
          <p className="line">|</p>
          <p className="d">Date: </p>
          <p>{time}</p>
      </div>
      <ContextMenu
        parentRef={listItem}
        time={time}
        isOpened={isRightClicked}
        delete_data={deleteData}
      />
    </li>
  );
};
export default ContextItem;
