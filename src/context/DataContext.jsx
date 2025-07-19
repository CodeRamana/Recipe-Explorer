import { createContext, useContext, useReducer, useState } from "react";
import searchReducer from "../reducers/searchReducer";
import favouriteReducer from "../reducers/favouriteReducer";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [theme, setTheme] = useState("light")
    const [open, setOpen] = useState(null);
    const [searchResult, setSearchResult] = useState([]);
    const [categoryResult, setCategoryResult] = useState([]);
    const [ingredientResult, setIngredientResult] = useState([]);
    const [areaResult, setAreaResult] = useState([]);
    const [renderResult, setRenderResult] = useState([]);

function getInitialFavourite() {
  try {
    const fav = localStorage.getItem("favourite");
    return fav ? JSON.parse(fav) : { totalfavouriteRecipes: 0, favouriteRecipes: [] };
  } catch (e) {
    return { totalfavouriteRecipes: 0, favouriteRecipes: [] };
  }
}

// Now use:
const [favourite, favouriteDispatch] = useReducer(
  favouriteReducer,
  undefined,
  getInitialFavourite
)
    const [search, searchDispatch] = useReducer(searchReducer, { searchTerm: "", category: "", ingredients: "", area: "" })

    const [recipe, setRecipe] = useState({})
    const [ingredient, setIngredient] = useState([])
    const [instruction, setInstruction] = useState([])
    const handleSearch = (data) => {
        searchDispatch({ type: "ADD_TERM", payload: data })
        if (data === "") setSearchResult([])
    }

    const handleCategory = (data, title) => {

        switch (title) {
            case "category": {
                searchDispatch({ type: "ADD_CATEGORY", payload: data })
                break;
            }
            case "ingredients": {
                searchDispatch({ type: "ADD_INGREDIENT", payload: data })
                break;
            }
            case "area": {
                searchDispatch({ type: "ADD_AREA", payload: data })
                break;
            }
        }

        setOpen(null)
    }

    const handleType = (data, title) => {

        switch (title) {
            case "category": {
                searchDispatch({ type: "ADD_CATEGORY", payload: data })
                setCategoryResult([])
                break;
            }
            case "ingredients": {
                searchDispatch({ type: "ADD_INGREDIENT", payload: data })
                setIngredientResult([])
                break;
            }
            case "area": {
                searchDispatch({ type: "ADD_AREA", payload: data })
                setAreaResult([])
                break;
            }
        }
    }

    const handleFavourite = (recipe) => {
        if (!favourite['favouriteRecipes'].find((item) => item.idMeal === recipe.idMeal)) {
            favouriteDispatch({ type: "ADD", payload: recipe })
        }
        else {
            alert("This Recipe is Already Added to the Favourite")
        }

    }

    return (
        <DataContext.Provider
            value={{
                theme, setTheme, search, searchDispatch, handleSearch, open, setOpen, handleCategory, searchResult, setSearchResult, categoryResult, setCategoryResult,
                ingredientResult, setIngredientResult, areaResult, setAreaResult, renderResult, setRenderResult, handleType, handleFavourite, favourite, favouriteDispatch
                , recipe, setRecipe, ingredient, setIngredient, instruction, setInstruction
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

const useDataContext = () => useContext(DataContext);

export default useDataContext;