import { useLocation, useNavigate } from "react-router-dom"
import FavouriteBtn from "./FavouriteBtn"

const RecipeCard = ({ recipe }) => {
    const navigate = useNavigate()
    const location = useLocation()
    return (
        <div className="max-w-[350px] w-full max-auto bg-white rounded-md border border-gray-300 flex flex-col justify-between font-[poppins]" onClick={()=>navigate(`/recipe/${recipe.idMeal}`)}>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} className="max-w-[350px] w-full rounded-t-md" />
            <div className="p-3 flex flex-col">
                <p className="text-xl font-extrabold font-[poppins] leading-[1.5] tracking-wide self-start line-clamp-1">{recipe.strMeal}</p>
                <div className="flex gap-4 my-2">
                    <button className="border border-gray-300 p-3 rounded-md text-sm font-bold grow-1"  onClick={(e)=>{ e.stopPropagation(); navigate(`/recipe/${recipe.idMeal}`)}}>View Recipe</button>
                    {location.pathname !== "/favourites" && <FavouriteBtn recipe={recipe}/>}
                </div>
            </div>

        </div>
    )
}

export default RecipeCard