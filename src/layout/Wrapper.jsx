import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar"

const Wrapper = () => {
  return (
    <div className="bg-white min-h-screen dark:bg-black">
      <header>
      <NavBar/>
      </header> 
      <main className="mb-10">
        <Outlet/>
      </main>
    </div>
  )
}

export default Wrapper