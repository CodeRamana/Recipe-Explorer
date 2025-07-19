import useDataContext from '../context/DataContext';

const FavouriteBtn = ({recipe,style}) => {
    const {handleFavourite} = useDataContext()
    console.log(recipe)
  return (
    <button className={style ? "bg-orange-500 px-3 py-2 rounded-md text-white" : "border border-gray-300 p-3" + " rounded-md text-sm font-bold grow-1"} onClick={(e) => {e.stopPropagation(); handleFavourite(recipe)}}>Favourite</button>
  )
}

export default FavouriteBtn