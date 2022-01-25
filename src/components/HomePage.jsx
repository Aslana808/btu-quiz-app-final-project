import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import {Button} from "reactstrap";
import './home.scss';

const HomePage = (props) => {
  const [data, setData] = useState();
  const [dataExists, setDataExists] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("data");
    const parsed_data = JSON.parse(data);
    if (parsed_data){
      // sorting our array by date in order to get the last attempt as the first element in array
    parsed_data.sort( (element1, element2) => {
      return new Date(element2.time) - new Date(element1.time);
    })
    setData(parsed_data);
    setDataExists(true);
    console.log(parsed_data);
  }
  }, [])

  return (
    <div className='main'>
        <div className='button-container'>
          <Button className='btn' onClick={() => {
            navigate("/quiz")
            console.log(localStorage);
            }}>
            Start Quiz
          </Button>
          <Button className='btn' onClick={() => {
            navigate("/history")
            }}>
            Check Your History
          </Button>
        </div>
        {(dataExists && data.length !== 0) && (
          <div>
            <h2 className='history-header'>Last Attempt:</h2>
            <p className='main-page-score'>{data[0].score} out of {data[0].question_length}, Time: {data[0].time}</p>
          </div>
        )}
    </div>
    )
};

export default HomePage;
