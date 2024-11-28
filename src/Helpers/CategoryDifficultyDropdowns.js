export default function CategoryDifficultyDropdowns({category, selectedCategory, setSelectedCategory, selectDifficulty, setselectDifficulty}) {

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