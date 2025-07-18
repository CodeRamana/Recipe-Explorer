import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar"

const Wrapper = () => {
  return (
    <div className="bg-white dark:bg-black">
      <header>
      <NavBar/>
      </header> 
      <main>
        <Outlet/>
      </main>
    </div>
  )
}

export default Wrapper