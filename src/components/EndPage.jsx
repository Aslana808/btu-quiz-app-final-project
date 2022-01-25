import React, { useState} from "react";
import {  useNavigate } from "react-router-dom";
import {Button} from "reactstrap";

const EndPage = ({ score, question }) => {
  const navigate = useNavigate();
  const [popUp, setPopup] = useState(false);

  const changePopup = () => {
    setPopup(!popUp);
  }

  const saveData = () => {
    if (JSON.parse(localStorage.getItem("data"))){
      var data = JSON.parse(localStorage.getItem("data"));
    }
    else {
      var data = [];
    }
    var date = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var formatedDate = date.toLocaleTimeString([],options);
    data.push({
      time: formatedDate,
      // time: options,
      score: score,
      question_length: question.length
    });
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
  };
  const changeRoute = (url) => {
    navigate(url);
  }

  return (
    <div className="main">
      <div className="try-again">
        <div className="score">
          <h1>Final score: </h1>
          <h2>{score}/{question.length}</h2>
        </div>
        <div className="option">
          <Button 
          className="btn" 
          onClick={() => {
            changePopup();
            }}>TRY AGAIN
          </Button>
          <Button
            className="btn"
            onClick={() => {
              saveData();
              changeRoute("/history");
            }}>
            SEE ATTEMPTS HISTORY
          </Button>
          {popUp && (
            <div className="cover" onClick={changePopup}>
              <div className="popup-body">
                <h5> Do you want to save this attempt?</h5>
                <div>
                <Button
                    onClick={() => {
                      saveData();
                      changeRoute("/");
                    }}>YES
                  </Button>
                  <Button
                    onClick={() => { 
                    changeRoute("/")
                  }}
                  >NO
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
        <div className='progress'>
              <div className='inner-div-final'>
                <p>100%</p>
              </div>
            </div>
    </div>
  );
};
export default EndPage;