import { FaRegHeart } from "react-icons/fa";
import { MdLightMode,MdDarkMode } from "react-icons/md";
import useDataContext from "../context/DataContext";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdHome } from "react-icons/md";
const NavBar = () => {
  const {theme,setTheme,favourite} = useDataContext()
  const navigate = useNavigate()
  const location = useLocation()
  
  const handleTheme = () => {
    if(document.body.classList.contains("light") && theme !== 'light'){
      document.body.classList.remove("light");
    }
    else{
      document.body.classList.remove("dark");
    }
    document.body.classList.toggle(theme)

  }
  useEffect(()=>{
    handleTheme(theme)
  },[theme])
  return (
    <div className="border-b-2 dark:border-[#f5f2f0] border-gray-300">
      <nav className="max-w-[1200px] mx-auto w-[95%] flex justify-between items-center p-5 text-[#181411] dark:text-white">
        <div className="flex justify-center items-center gap-2">
          <div className="size-4 text-orange-600">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <h2 className="font-bold text-lg" onClick={()=>navigate("/")}>Recipe Explorer</h2>
        </div>
        <div className="flex justify-center items-center gap-5 mx-3 sm:gap-5">
          {location.pathname !== "/" &&    <div className="bg-orange-100 text-orange-600 p-2 rounded-md sm:p-3 relative dark:bg-white" onClick={()=>navigate("/")}>
            <MdHome />
            </div>}
        
          <div className="bg-orange-100 text-orange-600 p-2 rounded-md sm:p-3 relative dark:bg-white" onClick={()=>navigate("/favourites")}>
            <FaRegHeart />
            <span className="text-black rounded-full px-2 bg-orange-600 absolute -top-2 left-7">{favourite['totalfavouriteRecipes']}</span>
          </div>
          <div className="bg-orange-100 p-2 rounded-md  text-orange-600 dark:bg-white sm:p-3" onClick={()=>setTheme(theme === "light" ? "dark" : "light")}>
           {theme === "light" ? <MdLightMode /> : <MdDarkMode /> } 
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavBar