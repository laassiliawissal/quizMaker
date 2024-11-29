import { useContext } from "react"
import { AppContext } from "../App"

export default function DisplayQuiz({ handleSelectedAnswer }) {
    const { question, selectedAnswers } = useContext(AppContext);
    return (<>
        {question && question.length > 0 ?
            
            question.map((q, qIndex) => {
                return (
                    <div key={qIndex}>
                        <p>{q.decodedQuestion}</p>
                        {q.shuffledAnswers.map((answer, index) => {
                            const isSelected = selectedAnswers[qIndex] === answer

                            return <button
                                key={index}
                                style={{ backgroundColor: isSelected ? "blue" : "" }}
                                onClick={() => handleSelectedAnswer(qIndex, answer)}
                            >{answer}
                            </button>
                        })}
                    </div>
                )
            })
            : <p>No questions available.</p>}
    </>)
}