import { useNavigate } from "react-router-dom"
import useDataContext from "../context/DataContext"

const RecipeCard = ({ recipe }) => {
    const {faviourite,handlefaviourite} = useDataContext()
    const navigate = useNavigate()
    return (
        <div className="max-w-[350px] w-[90%] max-auto bg-white rounded-md border border-gray-300 flex flex-col" onClick={()=>navigate(`/recipe/${recipe.idMeal}`)}>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} className="max-w-[350px] w-full rounded-t-md" />
            <div className="p-3">
                <p className="text-2xl font-extrabold font-[poppins] leading-[1.5] tracking-wide">{recipe.strMeal}</p>
                <div className="flex gap-4 my-2">
                    <button className="border border-gray-300 p-3 rounded-md text-sm font-bold grow-1"  onClick={()=>navigate(`/recipe/${recipe.idMeal}`)}>View Recipe</button>
                    <button className="border border-gray-300 p-3 rounded-md text-sm font-bold grow-1" onClick={() => handlefaviourite(recipe)}>Faviourite</button>
                </div>
            </div>

        </div>
    )
}

export default RecipeCard