import {useEffect, useState} from 'react'
import Header from '../Header'
import EmptyOrderView from '../EmptyOrderView'
import CartListView from '../CartListView'
import CartSummary from '../CartSummary'
import './index.css'

const Cart = () => {
  const [orderList, setOrderList] = useState([])

  useEffect(() => {
    // Fetch cart data from local storage and set it to the state
    const existingOrderData =
      JSON.parse(localStorage.getItem('orderItems')) || []
    setOrderList(existingOrderData)
  }, [])

  const removeAllCartItems = () => {
    // Clear the cart data from local storage and state
    localStorage.removeItem('orderItems')
    setOrderList([])
  }

  const showEmptyView = orderList.length === 0

  return (
    <>
      <Header />
      <div className="cart-container">
        {showEmptyView ? (
          <EmptyOrderView />
        ) : (
          <div className="cart-content-container">
            <h1 className="cart-heading">My Orders</h1>
            <button
              type="button"
              className="remove-all-btn"
              onClick={removeAllCartItems}
            >
              Remove All
            </button>
            <CartListView cartList={orderList} setCartList={setOrderList} />
            <CartSummary cartList={orderList} />
          </div>
        )}
      </div>
    </>
  )
}

export default Cart
