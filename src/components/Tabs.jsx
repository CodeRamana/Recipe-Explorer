import useDataContext from "../context/DataContext"
import { MdClose } from "react-icons/md";

const Tabs = ({result,title}) => {
  const {handleType} = useDataContext()

  return (
    <div className="text-white text-md font-[poppins] font-bold bg-orange-500 px-3 py-2 rounded-full flex items-center justify-center gap-3">{result} <span  onClick={()=>handleType("",title)}><MdClose /></span></div>
  )
}

export default Tabs 