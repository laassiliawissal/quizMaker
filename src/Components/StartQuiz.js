import { useEffect, useContext } from "react";
import {AppContext } from '../App'

import { Link } from 'react-router-dom'

import CategoryDifficultyDropdowns from '../Helpers/CategoryDifficultyDropdowns'; 
import DisplayQuiz from "./DisplayQuiz";
// import EndQuiz from "./EndQuiz";

export default function StartQuiz() {
    //useContext
    const { category, setCategory,
        question, setQuestion,
        selectedCategory, setSelectedCategory,
        selectDifficulty, setselectDifficulty,
        selectedAnswers, setSelectedAnswers,
        score, setScore,
        showSubmit, setShowSubmit,
        startOver, setStartOver
    } = useContext(AppContext);

    useEffect(() => {
        async function getCategory() {
            try {
            const data = await fetch("https://opentdb.com/api_category.php")
            const result = await data.json()
            setCategory(result.trivia_categories || [])
            } catch (error) {
            console.log(`ERROR ${error}`)
            }
        }

        getCategory();
        
        if(startOver) {
            setselectDifficulty("")
            setSelectedCategory("")
            setSelectedAnswers({})
            setQuestion([])
            setCategory([])
            setShowSubmit(false)
            // setShowResult(false)
            setScore(0)
            setStartOver(false)
        }
        
        
    }, [startOver, setselectDifficulty, setSelectedCategory, setSelectedAnswers,setQuestion,setCategory, setShowSubmit, setScore, setStartOver]); // remove the dependencies array, useEffect will run on every render, keep it empty it will run once on component mount, if has dependences will run on every change of those dependencies

    

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
        // here we can set the score or we can store the correct answer
        if (question && answer === question[index].correct_answer) {
            setScore(score + 1)
        }
        
        //if selected answer
        //the goal is to list all questions and answers from StartQuiz 
        //and select set backgroundColor of the correct answer with Green and incorrect with Red

    }

    function handleSubmit() {
        // setShowResult(true)
        //navigate the endquiz with the current state
        // navigate("/endquiz", {
        //     state: {

        //         // setStartOver,
        //         // setShowResult,
        //         score,
        //         question,
        //         selectedAnswers

        //     }
        // })

        
    }
    return (<>
        
        
      
        <CategoryDifficultyDropdowns category={category || []} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} selectDifficulty={selectDifficulty} setselectDifficulty={setselectDifficulty} />
        <button id="createBtn" onClick={handleCreateQuiz}>Create</button>

        <DisplayQuiz question={question} selectedAnswers={selectedAnswers} handleSelectedAnswer={handleSelectedAnswer}/>
        
        <br />
            {/* ROUTER LINK TO ENDQUIZ */}
        <Link to="/endquiz">
            {showSubmit && (<button type="submit" onClick={handleSubmit}>Submit</button>)}
        </Link>
        
       
        
        {/* {showResult && (<EndQuiz setStartOver={setStartOver} setShowResult={setShowResult} score={score} question={question} selectedAnswers={selectedAnswers}/>)} */}
    </>)
    
}

// track the score

