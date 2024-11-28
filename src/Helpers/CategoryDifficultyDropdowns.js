
import { useEffect } from "react";

export default function CategoryDifficultyDropdowns({category, setCategory, selectedCategory, setSelectedCategory, selectDifficulty, setselectDifficulty}) {
    useEffect(() => {
        getCategory()

    });

    async function getCategory() {
        try {
            const data = await fetch("https://opentdb.com/api_category.php")
            const result = await data.json()
            setCategory(result.trivia_categories || [])
        } catch (error) {
            console.log(`ERROR ${error}`)
        }
    }
    return (<>
        <select id="categorySelect" onChange={(event) => setSelectedCategory(event.target.value)} value={selectedCategory}>
            <option value="">Select Category</option>
            {category && category.map(c => {
                return (<option key={c.id} value={c.id}>{c.name}</option>)
            })}
        </select>
        <select id="difficultySelect" onChange={(event) => { setselectDifficulty(event.target.value) }} value={selectDifficulty}>
            <option value="">Select Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
        </select>
    </>)
    
}