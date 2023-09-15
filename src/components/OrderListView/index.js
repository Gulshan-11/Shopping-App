import OrderItem from '../OrderItem'
import './index.css'

const OrderListView = ({orderList}) => (
  <ul className="order-list">
    {orderList.map(eachOrderItem => (
      <OrderItem key={eachOrderItem.id} orderItemDetails={eachOrderItem} />
    ))}
  </ul>
)

export default OrderListView
