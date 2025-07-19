import { Link, useParams } from "react-router-dom"
import api from '../instances/instance'
import { useEffect, useMemo, useState } from "react"
import FeatureCard from "../components/FeatureCard";
import { BsFillSuitHeartFill } from "react-icons/bs";
import { GiCheckMark } from "react-icons/gi";
import { PiMapPinAreaFill } from "react-icons/pi";
import { DiOpensource } from "react-icons/di";
import { MdCategory } from "react-icons/md";
import useDataContext from "../context/DataContext";
import FavouriteBtn from "../components/FavouriteBtn";

const Recipe = () => {
    const { id } = useParams()
    const { recipe, setRecipe, ingredient, setIngredient, instruction, setInstruction,favourite} = useDataContext()
    const description = [{ logo: MdCategory, title: "Category", value: recipe.strCategory }, { logo: BsFillSuitHeartFill, title: "Favourite",value:(favourite['favouriteRecipes'].filter((item)=>item.idMeal === id).length === 0 ? FavouriteBtn : GiCheckMark)  }, { logo: PiMapPinAreaFill, title: "Area", value: recipe.strArea }, { logo: DiOpensource, title: "Source", value: recipe.strSource }]

    const fetchRecipeDetails = async (mealId) => {
        try {
            const recipe = await api.get(`/lookup.php?i=${mealId}`)
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

            if (ingredient && ingredient.trim() !== "") {
                ingredients.push({ ingredient: ingredient.trim(), measure: (measure || "").trim() });
            }
        }
        return setIngredient(ingredients)
    }

    const instructions = (strInstructions) => {
        setInstruction(strInstructions.trim().split("."))
    }

    useEffect(() => {
        if (Object.keys(recipe).length !== 0) {
            ingredients(recipe);
            instructions(recipe['strInstructions']);
        }

    }, [recipe])

    return (
        <>
            <div className="relative max-w-[1000px] mx-auto mt-0 sm:py-3">
                <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    className="w-full object-center -z-0 max-w-[1000px] mx-auto h-[300px] sm:object-top sm:h-[400px] md:rounded-lg"
                />

                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
                    <p className="font-extrabold text-3xl text-white font-[poppins] sm:text-5xl mb-4">
                        {recipe.strMeal}
                    </p>
                    <Link
                        to={recipe.strYoutube}
                        className=" bg-orange-600 text-white font-[poppins] dark:border dark:border-orange-600 rounded-md px-4 py-2 dark:text-white text-sm hover:bg-orange-600 transition"
                    >
                        Watch Video
                    </Link>
                </div>


            </div>
            <div className="max-w-[1000px] mx-auto w-[90%] gap-3 grid grid-cols-1 my-3 sm:grid-cols-2 md:grid-cols-4">
                {description.map((detail, index) => <FeatureCard key={index} detail={detail} recipe={recipe} />)}
            </div>

            <div className="max-w-[1000px] mx-auto w-[90%] border border-gray-300 rounded-md p-3 my-3 dark:text-white">
                <p className="text-xl font-extrabold font-[poppins] border-b p-3 border-b-gray-300 dark:text-orange-600">Ingredients</p>
                {ingredient.map((item, index) => (
                    <div key={index} className="flex justify-between text-lg font-[poppins] border-b p-3 border-b-gray-300">
                        <p>{item.ingredient}</p>
                        <p>{item.measure}</p>
                    </div>
                ))}

            </div>

            <div className="max-w-[1000px] mx-auto w-[90%] border border-gray-300 rounded-md p-3 dark:text-white ">
                <p className="text-xl font-extrabold font-[poppins] border-b p-3 border-b-gray-300 dark:text-orange-600">Instructions</p>

                <ol className="list-decimal p-3">
                    {instruction.map((step, index) => step !== "" && <li key={index} className="text-lg font-[poppins] ml-2 p-2">{step}</li>)}
                </ol>
            </div>
        </>


    )
}

export default Recipe