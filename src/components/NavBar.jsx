import { FaRegHeart } from "react-icons/fa";
import { MdLightMode,MdDarkMode } from "react-icons/md";
import useDataContext from "../context/DataContext";
import { useEffect } from "react";
const NavBar = () => {
  const {theme,setTheme} = useDataContext()
  
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
    <div className="border-b-2 border-[#f5f2f0] dark:border-black">
      <nav className="max-w-[1200px] mx-auto w-[95%] flex justify-between items-center p-5 text-[#181411]">
        <div className="flex justify-center items-center gap-2">
          <div className="size-4">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <h2 className="font-bold text-lg">Recipe Explorer</h2>
        </div>
        <div className="flex justify-center items-center gap-3 mx-3 sm:gap-5">
          <div className="bg-[#f5f2f0] p-2 rounded-md sm:p-3">
            <FaRegHeart />
          </div>
          <div className="bg-[#f5f2f0] p-2 rounded-md sm:p-3" onClick={()=>setTheme(theme === "light" ? "dark" : "light")}>
           {theme === "light" ? <MdLightMode /> : <MdDarkMode /> } 
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavBar