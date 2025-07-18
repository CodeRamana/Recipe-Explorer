import RecipeGrid from "../components/RecipeGrid"
import useDataContext from "../context/DataContext"

const Faviourites = () => {
     const {faviourite} =  useDataContext()
  return (
    <div className='max-w-[1200px] w-[90%] mx-auto'>
        <p>My Faviourites</p>
         <div className='max-w-[1200px] w-[90%] mx-auto'>
                <RecipeGrid data={faviourite['faviouriteRecipes']} />
            </div>
    </div>
  )
}

export default Faviourites