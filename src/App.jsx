import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router";
import Wrapper from "./layout/Wrapper";
import Home from "./pages/Home";
import fetchDetails from "./actions/combined/fetchDetails";
import Faviourites from "./pages/Faviourites";
import Recipe from "./pages/Recipe";

const App = () => {

    const router = createBrowserRouter( [{
    path: "/",
    element: <Wrapper/>,
    children: [
            {
                path: "/",
                element: <Home/>,
                loader:fetchDetails,
                hydrateFallbackElement:<h1 className="text-center mx-auto my-10">Loading...</h1>
            },
            {
              path:"/recipe/:id",
              element:<Recipe/>
            },
            {
              path:"/favourites",
              element:<Faviourites/>
            }
        ]
  }], {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  })

  return (
    <RouterProvider router={router} future={{
      v7_startTransition: true,
    }} />
  );
}

export default App;