import React, { useState } from "react";
import { Button} from "reactstrap";
import '../home.scss'

// რატომღაც props რომ ვუთითებდი ვერ აღიქვამდა და სათითაოდ მომიწია მშობლის პარამეტრების გადაცემა
const Multiple = ({question,questionId,score,setScore,click,length,answer}) => {
  const [checkCorrect, setCheckCorrect] = useState();
  const [changeQuestion, setChangeQuestion] = useState(false);
  // using array as initial value because we have mutliple choice
  const [selectedAnswer, setSelectedAnswer] = useState([]);

  const answer_check = () => {
    if (selectedAnswer.length !== 0) {
      setChangeQuestion(!changeQuestion);
      // using every function to check through answers array elements and their validity
      if (answer.answer.length === selectedAnswer.length &&  selectedAnswer.every((item) => answer.answer.indexOf(item) > -1)){
        setCheckCorrect("correct")
      }
      else {
        setCheckCorrect("incorrect")
      }
    }
  };

  
  const userScore = () => {
    if (checkCorrect === "correct"){
      setScore(score + 1);
    }
    else {
      setScore(score);
    }
}

  const selectedCheck = (answer_selected) => {
    const index = selectedAnswer.indexOf(answer_selected);
    if (index < 0){
      selectedAnswer.push(answer_selected);
    }
    else {
      // using splice to remove element from answers array
      selectedAnswer.splice(index,1)
    }
    setSelectedAnswer([...selectedAnswer]);
  };


  return (
    <div className="main">
      <div className={`quiz ${checkCorrect}`}>
        <div>
          <h1 className="question">{question.question}</h1>
        </div>
        <div className="options">
          {question.options.map((item, idx) => (
            <Button
              className="opt-btn"
              key={idx}  
              onClick={() => selectedCheck(idx + 1)}      
            >
              {item}
            </Button>
          ))}
        </div>
        </div>
        <h2 className="selected">your answer: {selectedAnswer}</h2>
        {!changeQuestion ? (
          <Button
          className="confirm-btn"
            onClick={() => {
              answer_check();
            }}>
            Confirm
          </Button>
        ) : (
          <Button
          className="confirm-btn"
            onClick={() => {
              userScore();
              // console.log(selectedAnswer)
              click();
            }}
          >
            {questionId + 1 === length ?(
              <span>Done</span>
            )  : (
              <span>Next Question</span>
            )}
          </Button>
        )}
            <div className='progress'>
              <div className='inner-div-q2' id="q2">
                <p>33%</p>
              </div>
            </div>
    </div>
  );
};
export default Multiple;
