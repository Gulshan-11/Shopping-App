import {Component} from 'react'
import emailjs from 'emailjs-com'
import {withRouter} from 'react-router-dom'
import {auth} from '../../firebase'
import './index.css'

class SummaryPage extends Component {
  state = {
    isOrderPlaced: false,
    shippingAddress: {
      name: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
    },
  }

  componentDidMount() {
    emailjs.init('RCt2qZO52k0nwVov') // Initialize EmailJS with your user ID
  }

  orderPlaced = async () => {
    const {shippingAddress} = this.state
    const orderData = JSON.parse(localStorage.getItem('cartItems'))
    console.log(orderData)
    const user = auth.currentUser
    try {
      if (user) {
        const templateParams = {
          userName: shippingAddress.name,
          userEmail: user.email,
          orderDetails: JSON.stringify(orderData, null, 2),
        }

        await emailjs.send(
          'service_rs7hmv8',
          'template_tvywhmr',
          templateParams,
        )
      }
      console.log('Order placed successfully')

      this.setState({isOrderPlaced: true})
      const existingOrderData =
        JSON.parse(localStorage.getItem('orderItems')) || []
      existingOrderData.push(orderData)
      localStorage.setItem('orderItems', JSON.stringify(existingOrderData))

      const {history} = this.props // Destructuring props
      history.push('/myorders')
    } catch (error) {
      console.error('Error placing order:', error)
    }
  }

  handleInputChange = event => {
    const {name, value} = event.target
    this.setState(prevState => ({
      shippingAddress: {
        ...prevState.shippingAddress,
        [name]: value,
      },
    }))
  }

  render() {
    const {total, items} = this.props
    const {isOrderPlaced, shippingAddress} = this.state

    return (
      <div className="summary-page">
        <h1>Shopping Cart</h1>
        <div className="container">
          <div className="payment-container">
            <div className="shipping-details">
              <h3>Shipping Address</h3>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={shippingAddress.name}
                onChange={this.handleInputChange}
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={shippingAddress.address}
                onChange={this.handleInputChange}
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={shippingAddress.city}
                onChange={this.handleInputChange}
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={shippingAddress.state}
                onChange={this.handleInputChange}
              />
              <input
                type="text"
                name="zipCode"
                placeholder="Zip Code"
                value={shippingAddress.zipCode}
                onChange={this.handleInputChange}
              />
            </div>
            <p className="payment-heading">Payment Method</p>
            <div className="payment-container">
              <label className="payment-option">
                <input type="radio" name="payment-option" disabled />
                <span className="text">Debit/Credit Card</span>
              </label>
              <label className="payment-option">
                <input type="radio" name="payment-option" disabled />
                <span className="text">Wallet</span>
              </label>
              <label className="payment-option">
                <input type="radio" name="payment-option" disabled />
                <span className="text">UPI Payment</span>
              </label>
              <label className="payment-option">
                <input type="radio" name="payment-option" disabled />
                <span className="text">Net Banking</span>
              </label>
              <label className="payment-option">
                <input type="radio" name="payment-option" />
                <span className="text available">Cash on Delivery</span>
              </label>
            </div>
          </div>
          <div className="summary-container">
            <p>Summary</p>
            <hr />
            <div className="details">
              <p>Number of Items:</p>
              <p>{items}</p>
            </div>
            <div className="details">
              <p>Price:</p>
              <p>{total}/-</p>
            </div>
            <div className="details">
              <p>Delivery Charges:</p>
              <span className="green">Free</span>
            </div>
            <hr />
            <div className="details total">
              <p>Total Amount:</p>
              <p>{total}/-</p>
            </div>
          </div>
        </div>
        <div className="submit-container">
          <button
            type="submit"
            className="submit-button"
            onClick={this.orderPlaced}
          >
            Confirm Order
          </button>
        </div>
        {isOrderPlaced && (
          <p className="green italic">
            Your order has been placed successfully
          </p>
        )}
      </div>
    )
  }
}

export default withRouter(SummaryPage)
