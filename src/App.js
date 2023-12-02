import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Admin from './components/Admin'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import Signup from './components/SignupForm'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import MyDetails from './components/MyDetails'
// import AdminProtectedRoute from './components/AdminProtectedRoute/AdminProtectedRoute'

import './App.css'
import MyOrders from './components/MyOrders'
// import ForbiddenPage from './components/ForbiddenPage'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/signup" component={Signup} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/admin" component={Admin} />
        <ProtectedRoute exact path="/products" component={Products} />
        <ProtectedRoute
          exact
          path="/products/:id"
          component={ProductItemDetails}
        />
        <ProtectedRoute exact path="/myorders" component={MyOrders} />
        <ProtectedRoute exact path="/cart" component={Cart} />
        <ProtectedRoute exact path="/mydetails" component={MyDetails} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="not-found" />
      </Switch>
    )
  }
}

export default App
