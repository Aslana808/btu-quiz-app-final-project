import React, {useState} from 'react';
import '../home.scss'
import {Button} from "reactstrap";
// import ProgressBar from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

// რატომღაც props რომ ვუთითებდი ვერ აღიქვამდა და სათითაოდ მომიწია მშობლის პარამეტრების გადაცემა
const Single = ({question,questionId,score,setScore,click,length,answer}) => {
    const [questionSelected, setQuestionSelected] = useState();
    const [checkCorrect, setCheckCorrect] = useState();
    const [changeQuestion, setChangeQuestion] = useState(false);


    const userScore = () => {
      if (checkCorrect === "correct"){
        setScore(score + 1);
      }
      else {
        setScore(score);
      }
}
    const selectedQuestionCheck = () => {
        if (questionSelected){
            setChangeQuestion(!changeQuestion);
            if (questionSelected === answer.answer) {
                setCheckCorrect('correct')
            }
            else {
                setCheckCorrect('incorrect')
            }
        }
    }

  return (
    <div className='main'>
      {/* using formatting to check answer if it's correct use different classname for different div style and if not use different */}
        <div className={`quiz ${checkCorrect}`}>
            <div>
            <h1 className="question">{question.question}</h1>
            </div>
            <div className="options">
            {question.options.map((quest, quest_id) => (
                <Button
                className="opt-btn"
                key={quest_id}
                onClick={() => {
                    setQuestionSelected(quest_id + 1);
                }}
                >
                {quest}
                </Button>
            ))}
            </div>
        </div>
        <h2 className='selected'>Your Answer: სავარაუდო პასუხი {questionSelected}</h2>      
      {!changeQuestion ? (
        <Button
          onClick={() => {
            selectedQuestionCheck();
          }}>
          Confirm
        </Button>
      ) : (
        <Button
          onClick={() => {
            userScore();
            click();
            // console.log(questionSelected)
          }}>
          {/* Check whether it's last question or not */}
          {questionId === length ? (
            <span>Done</span>
            ) : (
            <span>Next Question</span>
            )}
        </Button>
        )}
            <div className='progress'>
              <div className='inner-div-q1'>
                <p>0%</p>
              </div>
            </div>
    </div>
  )
};

export default Single;
