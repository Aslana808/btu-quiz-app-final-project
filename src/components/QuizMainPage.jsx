import React, {useState, useEffect} from 'react';
import { TailSpin } from  'react-loader-spinner';
import TryAgain from './EndPage';
import Single from './Questions/Single';
import Multiple from './Questions/Multiple';
import Boolean from './Questions/Boolean';

const QuizMainPage = () => {
  const [questions, setQuestions] = useState(null);
  const [questionId, setQuestionId] = useState(0);
  const [answers, setAnswers] = useState(null);
  const [score, setScore] = useState(0);

  // with that function we check localstorage, if time expired we drop data to send new request
  // otherwise if there is data we return it
  const check = () => {
    const data = localStorage.getItem("questions");
    if (data) {
      const questions = JSON.parse(data);
      // check if time(10min) expired
      const time = new Date();
      if (time.getTime() > data.expiry){
        localStorage.removeItem("questions");
      }
      // console.log(questions.value);
      return questions.value;
    }
    return null;
    // else {
    //   fetchData();
    // }
  }
  // everytime component mounts first we are checking localstorage and if it's empty(check returns null) we run fetchData function to take data
  useEffect( async () => {
    const fetchData = async () => {
      const response = await fetch("http://my-json-server.typicode.com/DanielBarbakadze/Advanced-JS-and-React-Basics/db");
      const data = await response.json();
      const time = new Date();
       localStorage.setItem("questions", JSON.stringify({value: data, expiry: time.getTime() + 600000 }));
      const questions = data.questions;
      const answers = data.answers;
      // console.log(questions);
      // console.log(answers);
      // return data;
      // const logData = localStorage.getItem("questions")
      // const someData = JSON.parse(logData)
      // console.log(someData.value);
    }
  const getData = async () => {
    if (check()){
      setQuestions(check().questions)
      setAnswers(check().answers);
      console.log(questions);
    }
    else {
      await fetchData();
      setQuestions(check().questions)
      setAnswers(check().answers);
      console.log(questions);
      console.log(answers);
    }
  }
  getData();
}, [])
// Using this function to change question by increasing it's ID
  const changeQuestion = () => {
    setQuestionId(questionId + 1)
  }
  
  return answers ? (
    <div className="home-page">
      {/* checking the number of questions by comparing questionId to length of questions(not to exceed the number of questions) */}
    {questionId < questions.length ? (
      // Checking each questions type to render specific question component
      questions[questionId].type === "single" ? (
        <Single
          question={questions[questionId]}
          questionId={questionId}
          length={questions.length}
          answer={answers[questionId]}
          score={score}
          click={changeQuestion}
          setScore={setScore}          
        />
      ) : questions[questionId].type === "multiple" ? (
        <Multiple
          question={questions[questionId]}
          questionId={questionId}
          length={questions.length}
          answer={answers[questionId]}
          score={score}
          click={changeQuestion}
          setScore={setScore}          
        />
      ) : (
        <Boolean
          question={questions[questionId]}
          questionId={questionId}
          length={questions.length}
          answer={answers[questionId]}
          click={changeQuestion}                    
          score={score}
          setScore={setScore}
        />
      )
    ) : (
      <TryAgain question={questions} score={score} />
    )}
  </div>
  ) : (
    <div className='main'>
      <TailSpin color='#282c34' height={80} width={80}/>
    </div>
  )
  
};

export default QuizMainPage;
