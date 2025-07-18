import { IoSearchOutline } from "react-icons/io5"

const SearchBar = ({data,setData}) => {
    return (
        <form className="flex relative">
            <input type="text" className="text-[#a3abb2] bg-[#2c3135] text-lg grow-1 rounded-md px-2 py-2.5 pl-12 focus:outline-none focus:inset-ring-2 " placeholder="Search for a Recipe" value={data} onChange={(e)=>setData(e.target.value)}/>
            <IoSearchOutline className="text-[#a3abb2] absolute top-2.5 left-3 text-2xl font-bold" />
        </form>
    )
}

export default SearchBar