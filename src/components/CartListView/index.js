import CartItem from '../CartItem'
import './index.css'

const CartListView = ({cartList, setCartList}) => (
  <ul className="cart-list">
    {cartList.map(eachCartItem => (
      <CartItem
        key={eachCartItem.id}
        cartItemDetails={eachCartItem}
        cartList={cartList}
        setCartList={setCartList}
      />
    ))}
  </ul>
)

export default CartListView
