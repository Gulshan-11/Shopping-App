import {Component} from 'react'
import {db} from '../../firebase'
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

  orderPlaced = () => {
    // Shipping address in Firebase Realtime Database
    const {shippingAddress} = this.state
    const shippingAddressesRef = db.ref('shippingAddresses')
    shippingAddressesRef.push(shippingAddress)

    this.setState({isOrderPlaced: true})
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

export default SummaryPage
