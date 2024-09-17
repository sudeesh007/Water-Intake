import { createBrowserRouter } from "react-router-dom";
import Aboutus from "./components/Aboutus";
import WaterIntake from "./components/WaterIntake"; 
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Home from "./components/Home";


const router = createBrowserRouter([
    { path: '', element: <Register/> },
    { path: 'aboutus', element: <Aboutus/> },
    {path:'add',element:<WaterIntake/>},
    {path: 'login', element:<Login/>},
    {path:'home',element:<Home/>},
]);

export default router;


