import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Main from '../pages/Main'
import NotFound from '../pages/Error/NotFound'
import Admin from '../pages/Admin'
import User from '../pages/User'
import CreateProduct from '../pages/Product/create'
import GroupProducts from '../pages/GroupProducts'
import ListProducts from '../pages/Product'
import LayoutStore from '../pages/AdminData/layout'
import StoreAddress from '../pages/AdminData/address'
import StoreTime from '../pages/AdminData/time'
import StoreDelivery from '../pages/AdminData/delivery'
import Login from "../pages/Login"
import Register from "../pages/Login/register"
import Payment from '../pages/User/payment'
import { isAuthenticated } from "../Utils/JWT";

const isAdmin = localStorage.getItem('isAdm');

const Routes = () => (

  <BrowserRouter>
    {
      (isAuthenticated()) ? (isAdmin) ? (
          <Switch>

            <Route exact path={'/'} component={Main}/>
            <Route path={'/Admin'} component={Admin}/>
            <Route path={'/CreateProductGroup'} component={GroupProducts}/>
            <Route path={'/CreateProduct/:id'} component={CreateProduct}/>
            <Route path={'/StoreInfo/:id'} component={LayoutStore}/>
            <Route path={'/ListProduct'} component={ListProducts}/>
            <Route path={'/StoreAddress'} component={StoreAddress}/>
            <Route path={'/StoreDelivery'} component={StoreDelivery}/>
            <Route path={'/StoreTime'} component={StoreTime}/>
            <Route path="*" component={NotFound}/>
          </Switch>
        ) :
        (
          <Switch>
            <Route exact path={'/'} component={Main}/>
            <Route path={'/User'} component={User}/>
            <Route path={'/Payment'} component={Payment}/>
            <Route path="*" component={NotFound}/>
          </Switch>
        ) :
        (
          <Switch>
            <Route exact path={'/login'} component={Login}/>
            <Route exact path={'/register'} component={Register}/>
            
            <Route exact path={'/Home'} component={Main}/>
            <Route exact path={'/'} component={Main}/>
            <Route path="*" component={NotFound}/>
          </Switch>
        )
    }

  </BrowserRouter>
);

export default Routes
