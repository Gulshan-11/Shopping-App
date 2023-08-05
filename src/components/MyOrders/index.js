import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {FiRefreshCw} from 'react-icons/fi'
import Header from '../Header'
import './index.css'

class MyOrders extends Component {
  state = {
    isLoading: true,
    ordersList: [],
  }

  componentDidMount() {
    this.getOrdersList()
  }

  getOrdersList = async () => {
    try {
      // Your code to fetch the orders list from the API or any other source

      this.setState({isLoading: false})
    } catch (error) {
      console.log(error)
      this.setState({isLoading: false})
    }
  }

  renderLoadingView = () => (
    <div className="my-orders-loader-container">
      <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
    </div>
  )

  renderOrdersList = () => {
    const {ordersList} = this.state

    return (
      <ul className="orders-list">
        {ordersList.map(order => (
          <li key={order.id} className="order-item">
            <p>{order.id}</p>
            {/* Render other order details */}
          </li>
        ))}
      </ul>
    )
  }

  renderEmptyView = () => (
    <div className="empty-view-container">
      <FiRefreshCw className="refresh-icon" />
      <p>No orders found. Please refresh to try again.</p>
    </div>
  )

  render() {
    const {isLoading, ordersList} = this.state

    return (
      <>
        <Header />
        <div className="my-orders-container">
          <h1 className="my-orders-heading">My Orders</h1>
          {!isLoading && ordersList.length > 0
            ? this.renderLoadingView()
            : this.renderEmptyView()}
        </div>
      </>
    )
  }
}

export default MyOrders
