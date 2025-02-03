
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import UpdateUser from './components/UpdateUser';
import ShowRecipes from './components/ShowRecipes';
import Logout from './components/Logout';
import MyMenu from './components/MyMenu';
import AddRecipe from './components/AddRecipe';

const MyRouter = () => {
    return (
        <BrowserRouter>
            <MyMenu />
            <Outlet/>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/update" element={<UpdateUser />} />
                <Route path="/showRecipes" element={< ShowRecipes/>} />
                <Route path="/logout" element={< Logout/>} />
                <Route path="/addRecipe" element={< AddRecipe setIsAddingRecipe={()=>{}}/>} />

            </Routes>
        </BrowserRouter>

    );
};

export default MyRouter;