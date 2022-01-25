import React, { useState } from "react";
import { Button, Progress } from "reactstrap";
import '../home.scss';

// რატომღაც props რომ ვუთითებდი ვერ აღიქვამდა და სათითაოდ მომიწია მშობლის პარამეტრების გადაცემა
const Boolean = ({question,questionId,score,setScore,click,length,answer}) => {
  const [checkCorrect, setCheckCorrect] = useState();
  const [changeQuestion, setChangeQuestion] = useState(false);
  const [SelectedAnswer, setSelectedAnswer] = useState();

  const userScore = () =>{ 
    setScore(checkCorrect === "correct" ? score + 1 : score);
  }
  const answer_check = () => {
    if (SelectedAnswer) {
      setChangeQuestion(!changeQuestion);
      if (SelectedAnswer === `${answer.answer}`)
      {
        setCheckCorrect("correct")
      }
      else {
        setCheckCorrect("incorrect")
      }
    }
  };

  return (
    <div className="main">
      <div className={`quiz ${checkCorrect}`}>
        <h1 className="question">{question.question}</h1>
          <div className="options">
            <Button
              className="opt-btn"
              onClick={() => {
                setSelectedAnswer("true");
              }}>
              True
            </Button>
            <Button
              className="opt-btn"
              onClick={() => {
                setSelectedAnswer("false");
                console.log(localStorage)
              }}>
              False
            </Button>
          </div>
        </div>
        <h2 className="selected">Your Answer: {SelectedAnswer}</h2>
        {!changeQuestion ? (
          <Button
          className="confirm-btn"
            onClick={() => {
              answer_check();
              // console.log(SelectedAnswer)
            }}>
            Confirm
          </Button>
        ) : (
          <Button
          className="confirm-btn"
            onClick={() => {
              userScore();
              // console.log(SelectedAnswer)
              click();
            }}>
            {questionId + 1 === length ? (
              <span>Done</span>
            ) : (
              <span>Next Question</span>
            )}
          </Button>
        )}
            <div className='progress'>
              <div className='inner-div-q3'>
                <p>67%</p>
              </div>
            </div>
    </div>
  );
};
export default Boolean;
