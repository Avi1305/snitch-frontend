import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Register from '../features/auth/pages/Register.jsx'
import Login from "../features/auth/pages/Login.jsx";
import CreateProduct from "../features/products/pages/CreateProduct.jsx";


const router = createBrowserRouter([  
    {
        path: "/",
        element:<h1>Hello World</h1>
    },
    {
        path: "/register",
        element: <Register/>
    },
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/create-product",
        element:<CreateProduct/>
    }
]) 

export default router;