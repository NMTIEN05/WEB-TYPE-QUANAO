import React from 'react';
import './App.css'
import { Route, Router, useRoutes } from 'react-router-dom';
import AdminLayout from './competdents/layout/admin';
import AddProduct from './competdents/product/AddProduct';
import ListProduct from './competdents/product/ListProduct';
import EditProduct from './competdents/product/EditProduct';
import AddCategory from './competdents/category/AddCategory';
import ListCategory from './competdents/category/ListCategory';
import EditCategory from './competdents/category/EditCategory';
import Clinet from './competdents/layout/clinet';
import Register from './competdents/auth/Register';
import Login from './competdents/auth/Login';
import ListAuthbyadmin from './competdents/admin-auth/ListAuthbyadmin';
import EditAuthbyadmin from './competdents/admin-auth/EditAuthbyadmin';
import MainZin from './competdents/layout/clinet/MainZin';
import DetelProduct from './competdents/layout/clinet/DetelProduct';
import Cart from './competdents/layout/clinet/Cart';
import ProductDetail from './competdents/layout/clinet/DetelProduct';
import ProductByCategory from './competdents/layout/clinet/ProductById';
import Account from './competdents/layout/clinet/User/accout';
import EditAccount from './competdents/layout/clinet/User/EditAcount';
import AdminComments from './competdents/commets/commentList';
// import Account from './competdents/layout/clinet/User/accout';

function App() {
const router = useRoutes([
    {path:"/register",element:<Register/>},
    {path:"/login",element:<Login/>},

    
{path:"dashboard",element:<AdminLayout/>,children:[
    {path:"/dashboard/add",element:<AddProduct/>},
    {path:"/dashboard/commets",element:<AdminComments/>},

    {path:"/dashboard/list",element:<ListProduct/>},
    {path:"/dashboard/edit/:id",element:<EditProduct/>},
    {path:"/dashboard/category/add",element:<AddCategory/>},
    {path:"/dashboard/category/list",element:<ListCategory/>},
    {path:"/dashboard/edit/category/:id",element:<EditCategory/>},
    {path:"/dashboard/auth/list",element:<ListAuthbyadmin/>},
    {path:"/dashboard/auth/edit/:id",element:<EditAuthbyadmin/>},


]},
{path:"/",element:<Clinet/>,children:[
    
    {path:"/",element:<MainZin/>},
    {path:"/product/:id",element:<ProductDetail />},
    {path:"/category/:id",element:<ProductByCategory />},
    {path:"/category/product/:id",element:<ProductDetail />},
    {path:"/accout",element:<Account />},
    {path:"/edit-account",element:<EditAccount />},




    {path:"/cart",element:<Cart/>},


    
]},


])
return router    
}
export default App