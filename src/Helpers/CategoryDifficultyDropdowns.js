import { useContext } from 'react';
import { AppContext } from '../App';

export default function CategoryDifficultyDropdowns() {
    const { category, selectedCategory, setSelectedCategory, selectDifficulty, setselectDifficulty } = useContext(AppContext);
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