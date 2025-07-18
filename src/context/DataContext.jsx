import { createContext, useContext, useReducer, useState } from "react";
import searchReducer from "../reducers/searchReducer";
import faviouriteReducer from "../reducers/faviouriteReducer";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [theme,setTheme] = useState("light")
    const [open, setOpen] = useState(null);
    const [searchResult, setSearchResult] = useState([]);
    const [categoryResult, setCategoryResult] = useState([]);
    const [ingredientResult, setIngredientResult] = useState([]);
    const [areaResult, setAreaResult] = useState([]);
    const [renderResult, setRenderResult] = useState([]);
    const [faviourite,faviouriteDispatch] = useReducer(faviouriteReducer,{totalfaviouriteRecipes:0,faviouriteRecipes:[]})
    const [search,searchDispatch] = useReducer(searchReducer,{searchTerm:"",category:"",ingredients:"",area:""})
     const handleSearch = (data)=>{
        searchDispatch({type:"ADD_TERM",payload:data})
        if(data === "") setSearchResult([])
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

     const handlefaviourite = (recipe) => {

        if (!faviourite['faviouriteRecipes'].find((item) => item.idMeal === recipe.idMeal)) {
            faviouriteDispatch({ type: "ADD", payload: recipe })
        }
        else {
            alert("This Recipe is Already Added to the Faviourite")
        }

    }

  return (
    <DataContext.Provider
      value={{
       theme,setTheme,search,searchDispatch,handleSearch,open, setOpen,handleCategory,searchResult, setSearchResult,categoryResult, setCategoryResult,
       ingredientResult, setIngredientResult,areaResult, setAreaResult,renderResult, setRenderResult,handleType,handlefaviourite,faviourite,faviouriteDispatch
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

const useDataContext = () => useContext(DataContext);

export default useDataContext;