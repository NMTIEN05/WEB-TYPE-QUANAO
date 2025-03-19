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

function App() {
const router = useRoutes([
    {path:"/register",element:<Register/>},
    {path:"/login",element:<Login/>},
{path:"dashboard",element:<AdminLayout/>,children:[
    {path:"/dashboard/add",element:<AddProduct/>},
    {path:"/dashboard/list",element:<ListProduct/>},
    {path:"/dashboard/edit/:id",element:<EditProduct/>},
    {path:"/dashboard/category/add",element:<AddCategory/>},
    {path:"/dashboard/category/list",element:<ListCategory/>},
    {path:"/dashboard/edit/category/:id",element:<EditCategory/>},
    {path:"/dashboard/auth/list",element:<ListAuthbyadmin/>},
    {path:"/dashboard/auth/edit/:id",element:<EditAuthbyadmin/>},


]},
{path:"/",element:<Clinet/>,children:[
    

   
]},


])
return router    
}
export default App