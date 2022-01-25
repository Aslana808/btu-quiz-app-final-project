import React, { useEffect, useState } from "react";
import ContextItem from "./ContextItem";
import {Button} from "reactstrap";
import { useNavigate } from "react-router-dom";
const History = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const delete_data = (item) => {
    var parsed_data = JSON.parse(localStorage.getItem("data"));
    // to delete data first I delete it from array then i clear whole localstorage and then i write updated array in localstorage
    setData(parsed_data.filter((element) => element.time !== item));
    localStorage.removeItem("data");
    localStorage.setItem("data",JSON.stringify(parsed_data.filter((element) => element.time !== item)))
  };

  useEffect(() => {
    var parsed_data = JSON.parse(localStorage.getItem("data"));
    setData(parsed_data);
  }, []);
  const redirect = () => {
    navigate("/")
  };
  return (
    <div className="main">
      <div className="attempts">
        <h1 className="history-header">Attempts History</h1>
        <ul>
          {data && data.map((element) => (
              <ContextItem
                score={element.score}
                time={element.time}                
                length={element.question_length}
                deleteData={delete_data}
              />
            ))}
        </ul>
      </div>
      <Button className="btn" onClick={redirect}>
        Home Page
      </Button>
    </div>
  );
};
export default History;
