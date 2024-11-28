import { useEffect, useState } from "react";

import CategoryDifficultyDropdowns from '../Helpers/CategoryDifficultyDropdowns'; 

export default function StartQuiz() {
    const [category, setCategory] = useState([]);
    const [question, setQuestion] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectDifficulty, setselectDifficulty] = useState("");

    const [selectedAnswers, setSelectedAnswers] = useState({});

    const [showSubmit, setShowSubmit] = useState(false);
    

    useEffect(() => {
        getCategory();
    }, []);

    async function getCategory() {
        try {
            const data = await fetch("https://opentdb.com/api_category.php")
            const result = await data.json()
            setCategory(result.trivia_categories || [])
        } catch (error) {
            console.log(`ERROR ${error}`)
        }
    }

    async function getQuestions(category, difficulty) {
        try {
            const data = await fetch(`https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`)
            const result = await data.json()
            if (data.status === 200) {
                const questions = result.results.map((res) => {
                    const allAnswers = [...res.incorrect_answers, res.correct_answer]
                    const decodedAnswers = allAnswers.map(a => new DOMParser().parseFromString(a, "text/html").body.textContent)
                    const shuffledAnswers = decodedAnswers.sort(() => Math.random() - 0.5)
                    const decodedQuestion = new DOMParser().parseFromString(res.question, "text/html").body.textContent

                    return { ...res, shuffledAnswers, decodedQuestion }
                })
                setQuestion(questions || [])
            } else {
                console.log('Error', data.statusText, data.status)
            }
        } catch (error) {
            console.log(`ERROR ${error}`)
        }
    }

    const handleCreateQuiz = () => {
        getQuestions(selectedCategory, selectDifficulty);
    }

    function handleSelectedAnswer(index, answer) {
        setSelectedAnswers(prev => {
            const updatedAnswers = { ...prev, [index]: answer }
            if (Object.keys(updatedAnswers).length === question.length) {
                setShowSubmit(true); // Show submit button when all questions are answered
            }
            return updatedAnswers
        })

    }

    return (<>
        <h1>Quiz Maker</h1>
        <CategoryDifficultyDropdowns category={category || []} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} selectDifficulty={selectDifficulty} setselectDifficulty={setselectDifficulty} />
    
        <button id="createBtn" onClick={handleCreateQuiz}>Create</button>

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

        <br />

        {
          showSubmit && (<button type="submit">Submit</button>)
        }  
    </>)
    
}

