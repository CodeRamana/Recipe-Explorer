import RecipeGrid from "../components/RecipeGrid"
import useDataContext from "../context/DataContext"

const Faviourites = () => {
     const {favourite} =  useDataContext()
  return (
    <div className='max-w-[1200px] w-[90%] mx-auto my-5 flex flex-col gap-5'>
        <p className="text-black dark:text-white text-2xl sm:text-4xl font-[poppins] font-extrabold italic">My Favourites</p>
         <div className='max-w-[1200px] mx-auto'>
                <RecipeGrid data={favourite['favouriteRecipes']} />
            </div>
    </div>
  )
}

export default Faviourites