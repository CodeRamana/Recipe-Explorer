import { Link, useParams } from "react-router-dom"
import api from '../instances/instance'
import { useEffect, useMemo, useState } from "react"
import FeatureCard from "../components/FeatureCard";
import { BsFillSuitHeartFill } from "react-icons/bs";
import { GiCheckMark } from "react-icons/gi";
import { PiMapPinAreaFill } from "react-icons/pi";
import { DiOpensource } from "react-icons/di";
import { MdCategory } from "react-icons/md";

const Recipe = () => {
    const { id } = useParams()
    const [recipe, setRecipe] = useState({})
    const [ingredient, setIngredient] = useState([])
    const [instruction, setInstruction] = useState([])
    const description = [{ logo: MdCategory, title: "Category", value: recipe.strCategory }, { logo: BsFillSuitHeartFill, title: "Faviourite", value: GiCheckMark }, { logo: PiMapPinAreaFill, title: "Area", value: recipe.strArea }, { logo: DiOpensource, title: "Source", value: recipe.strSource }]
    const fetchRecipeDetails = async (mealId) => {
        try {
            //GET https://www.themealdb.com/api/json/v1/1/lookup.php?i={mealId}
            const recipe = await api.get(`/lookup.php?i=${mealId}`)
            console.log(recipe.data.meals[0])
            setRecipe(recipe.data.meals[0])
        }
        catch (err) {
            console.log(err.message || err.response.message)
        }
    }

    useEffect(() => {
        fetchRecipeDetails(id)
    }, [id])

    const ingredients = (meal) => {
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            // Only include when there is a valid ingredient
            if (ingredient && ingredient.trim() !== "") {
                ingredients.push({ ingredient: ingredient.trim(), measure: (measure || "").trim() });
            }
        }
        return setIngredient(ingredients)
    }

    const instructions = (strInstructions) => {
        setInstruction(strInstructions.split("."))
    }

    useEffect(()=>{
        if(Object.keys(recipe).length !==0){
            ingredients(recipe);
         instructions(recipe['strInstructions']);
        }
        
    },[recipe])

    return (
        <>
            <div className="relative max-w-[1000px] mx-auto mt-0 sm:py-3">
                <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    className="w-full object-center -z-0 max-w-[1000px] mx-auto h-[300px] sm:object-top sm:h-[400px] md:rounded-lg"
                />

                {/* Centered content wrapper */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
                    <p className="font-extrabold text-3xl text-white font-[poppins] sm:text-5xl mb-4">
                        {recipe.strMeal}
                    </p>
                    <Link
                        to={recipe.strYoutube}
                        className="border border-orange-600 rounded-md px-4 py-2 text-white text-sm hover:bg-orange-600 transition"
                    >
                        Watch Video
                    </Link>
                </div>


            </div>
            <div className="max-w-[1000px] mx-auto w-[90%] gap-3 grid grid-cols-1 my-3 sm:grid-cols-2 md:grid-cols-4">
                {description.map((detail, index) => <FeatureCard key={index} detail={detail} />)}
            </div>

            <div>
                <p>Ingredients</p>
                {ingredient.map((item,index)=>(
                    <div key={index} className="flex justify-between">
                    <p>{item.ingredient}</p>
                    <p>{item.measure}</p>
                </div>
                ))}
                
            </div>

            <div>
                <ol>
                {instruction.map((step,index)=><li key={index}>{step}</li>)}
                </ol>
            </div>
        </>


    )
}

export default Recipe