import RecipeCard from "./RecipeCard";

const RecipeGrid = ({data}) =>{
    return (
        <div className="grid grid-cols-1 gap-3 py-5 sm:grid-cols-2 md:grid-cols-4">
            {data?.map(((recipe)=> <RecipeCard key={recipe.idMeal} recipe={recipe}/>))}
        </div>
    );
}

export default RecipeGrid;