import './App.css';
import {createContext, useState} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import StartQuiz from './Components/StartQuiz';
import EndQuiz from './Components/EndQuiz';

export const AppContext = createContext();

function App() {

  const [category, setCategory] = useState([]);
  const [question, setQuestion] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectDifficulty, setselectDifficulty] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [showSubmit, setShowSubmit] = useState(false);
  const [startOver, setStartOver] = useState(false); 

  return (
    <div className="App">
      {/* <StartQuiz /> */}
      <AppContext.Provider value={{
        category, setCategory,
        question, setQuestion,
        selectedCategory, setSelectedCategory,
        selectDifficulty, setselectDifficulty,
        selectedAnswers, setSelectedAnswers,
        score, setScore,
        showSubmit, setShowSubmit,
        startOver, setStartOver

      }}>
        <Router>
          <h1>Quiz Maker</h1>
          <Routes>
            <Route path="/" element={<StartQuiz />} />
            <Route path="/startquiz" element={<StartQuiz />} />
            <Route path="/endquiz" element={<EndQuiz />} />
            <Route path="*" element={<h1>PAGE NOT FOUND</h1>} />
          </Routes>
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
