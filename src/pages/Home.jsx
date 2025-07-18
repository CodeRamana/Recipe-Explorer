import { useLoaderData } from 'react-router-dom';
import bg from '../assets/bg.png'
import SearchBar from '../components/SearchBar'
import useDataContext from '../context/DataContext'
import Dropdown from '../components/Dropdown';
import Tabs from '../components/Tabs';
import api from '../instances/instance';
import { act, useEffect, useState } from 'react';
import RecipeGrid from '../components/RecipeGrid';

const Home = () => {
    const data = useLoaderData();
    const { search, handleSearch, searchResult, setSearchResult, categoryResult, setCategoryResult,
        ingredientResult, setIngredientResult, areaResult, setAreaResult, renderResult, setRenderResult,faviourite } = useDataContext();

    const intersectionResults = () => {
        const activeSets = [searchResult, categoryResult, ingredientResult, areaResult]
        if (activeSets.filter((arr) => arr.length !== 0).length > 1) {
            const sets = activeSets.filter((arr) => arr.length !== 0).map((arr) => {
                return arr.map((obj) => obj.idMeal)
            }).reduce((p, c) => {
                return p.filter((id) => c.some((value) => value === id))
            })

            setRenderResult(sets.map((id) => {
                return activeSets.filter((arr) => arr.length !== 0)[0].find((obj) => obj.idMeal === id)
            }
            ))
        }
        else {
            setRenderResult(...activeSets.filter((arr) => arr.length !== 0))
        }
    }

    

    const fetchSearchResults = async (query) => {
        try {
            //https://www.themealdb.com/api/json/v1/1/
            const searchResults = await api.get(`search.php?s=${query}`)
            setSearchResult(searchResults.data.meals === null ? [] : searchResults.data.meals)
        }
        catch (err) {
            console.log(err?.message || err?.response?.message);
        }
    }

    const fetchCategoryResults = async (category) => {
        try {
            //https://www.themealdb.com/api/json/v1/1/filter.php?c={category}
            const categoryResults = await api.get(`filter.php?c=${category}`)
            setCategoryResult(categoryResults.data.meals)

        }
        catch (err) {
            console.log(err?.message || err?.response?.message);
        }
    }

    const fetchIngredientsResults = async (ingredient) => {
        try {
            //https://www.themealdb.com/api/json/v1/1/filter.php?i={ingredient}
            const ingredientResults = await api.get(`filter.php?i=${ingredient}`)
            setIngredientResult(ingredientResults.data.meals)
        }
        catch (err) {
            console.log(err?.message || err?.response?.message);
        }
    }
    const fetchAreaResults = async (area) => {
        try {
            //https://www.themealdb.com/api/json/v1/1/filter.php?a={area}
            const areaResults = await api.get(`filter.php?a=${area}`)
            setAreaResult(areaResults.data.meals)
        }
        catch (err) {
            console.log(err?.message || err?.response?.message);
        }
    }

    useEffect(() => {
        if ((searchResult.length !== 0 || categoryResult.length !== 0 || ingredientResult.length !== 0 || areaResult.length !== 0)) intersectionResults()
            else setRenderResult([])
    }, [searchResult, categoryResult, ingredientResult, areaResult, search])

    // useEffect(()=>{
    //     localStorage.setItem("faviourite",faviourite)
    // },[faviourite])

    useEffect(() => {
        if (search['searchTerm'] !== "") fetchSearchResults(search['searchTerm'])
    }, [search['searchTerm']])
    useEffect(() => {
        if (search['area'] !== "") fetchAreaResults(search['area'])
    }, [search['area']])
    useEffect(() => {
        if (search['ingredients'] !== "") fetchIngredientsResults(search['ingredients'])
    }, [search['ingredients']])

    useEffect(() => {
        if (search['category'] !== "") fetchCategoryResults(search['category'])
    }, [search['category']])

    return (
        <>
            <div className='relative max-w-[1000px] mx-auto mt-0 sm:py-3'>
                <img src={bg} alt="background-theme" className='w-full object-center -z-0 max-w-[1000px] mx-auto h-[350px] sm:object-top sm:h-[400px] md:rounded-lg' />
                <div className='absolute top-[45%] left-[5%] max-w-[1200px] w-[90%] mx-auto'>
                    <SearchBar data={search.searchTerm} setData={handleSearch} />
                </div>
                <p className='absolute top-[20%] left-[5%] font-extrabold text-3xl text-center text-white font-[poppins] sm:text-5xl lg:top-[25%]'> Craving something delicious? Search here...</p>
                <div className='absolute flex gap-3 max-w-[1000px] top-[61%] left-[5%]'>
                    {Object.keys(data).map((item, index) => <Dropdown key={index} obj={data[item]} />)}
                </div>
                {!(search['category'] === "" && search['ingredients'] === "" && search['area'] === "") &&
                    <div className='flex gap-3 my-3'>
                        {Object.keys(search).filter((item) => item !== "searchTerm" && search[item] !== "").map((result, index) => (
                            <Tabs key={index} title={result} result={search[result]} />))}
                    </div>
                }
            </div>
            <div className='max-w-[1000px] w-[90%] mx-auto'>
                <RecipeGrid data={renderResult}/>
            </div>
            {renderResult.length === 0 && (
                <div className='max-w-[1000px] w-[90%] mx-auto border border-gray-300 rounded-md py-5 px-3 flex flex-col justify-center items-center gap-2'>
                    <p className='text-2xl font-extrabold font-[poppins] sm:text-4xl'>Can't find what you're looking for?</p>
                    <p className='text-lg text-gray-300 font-extrabold font-[poppins] '>Refine your search with powerful filters based on ingredients, categories, and meal types to discover your perfect recipe.</p>
                    <button className='bg-orange-600 text-sm text-white px-3 py-2 rounded-md'>Go to Search & Filter</button>
                </div>
            ) }
        </>

    )
}

export default Home