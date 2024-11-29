import { useContext } from "react";
import { AppContext } from "../App";

import {Link} from 'react-router-dom'

export default function EndQuiz() {
    const { score, question, selectedAnswers, setStartOver } = useContext(AppContext);
    
    function handleCreateNewQuiz() {
        setStartOver(true);
    }
    return (<>
        <h1>Results</h1>
        {/* display the same questions and answers here */}
        {question && question.length > 0 ?
            
            question.map((q, qIndex) => {
                return (
                    <div key={qIndex}>
                        <p>{q.decodedQuestion}</p>
                        {q.shuffledAnswers.map((answer, index) => {
                            
                            const isCorrectAnswer = answer === q.correct_answer 
                            const isUserSelected = selectedAnswers[qIndex] === answer 

                            return <button
                                key={index}
                                style={{ backgroundColor: isCorrectAnswer ? "green" : (isUserSelected ? "red" : "") }} // in summary: for the current question, for the current iterated over answer, check if this answer equals to answer from the api, if true highlight it in green, then pass to the next answer, then check if this answer equals to the correct_answer from api if false then check if the user Selected answer has this answer if true highlight in red if false no highlight.
                            >{answer}
                            </button>
                        })}
                    </div>
                )
            })
            : <p>No questions available.</p>}

        {/* SCORE */}
        <p style={{ backgroundColor: score <= 1 ? "red" : (score >= 2 && score <= 3 ? "yellow" : "green") }}> You Scored {score} out of 5</p>
        
        <Link to="/startquiz">
            <button onClick={handleCreateNewQuiz}>Create a new Quiz</button>
        </Link>
        
    </>)
}