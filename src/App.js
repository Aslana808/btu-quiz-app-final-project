import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import HomePage from './components/HomePage';
import QuizMainPage from './components/QuizMainPage';
import History from './components/HistoryPage/History';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/quiz" element={<QuizMainPage/>}/>
        <Route path="/history" element={<History/>}/>
      </Routes>
      </Router>
  );
}

export default App;
