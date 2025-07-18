import useDataContext from "../context/DataContext"
import { MdClose } from "react-icons/md";

const Tabs = ({result,title}) => {
  const {handleType} = useDataContext()

  return (
    <div className="text-white text-lg bg-orange-500 inline-block p-3 rounded-full">{result} <span  onClick={()=>handleType("",title)}><MdClose /></span></div>
  )
}

export default Tabs 