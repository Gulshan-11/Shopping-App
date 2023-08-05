import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
// import Popup from 'reactjs-popup'

import Header from '../Header'

import './index.css'

class ProductItemDetails extends Component {
  state = {
    quantity: 1,
    // showPopup: false,
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="product-details-error-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <Link to="/products">
        <button type="button" className="button">
          Continue Shopping
        </button>
      </Link>
    </div>
  )

  onDecrementQuantity = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    }
  }

  onIncrementQuantity = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  renderProductDetailsView = productData => {
    const {quantity} = this.state
    const {brand, imageUrl, price, rating, title} = productData

    const onClickAddToCart = () => {
      const existingCartData =
        JSON.parse(localStorage.getItem('cartItems')) || []
      const existingProductIndex = existingCartData.findIndex(
        item => item.id === productData.id,
      )

      if (existingProductIndex !== -1) {
        existingCartData[existingProductIndex].quantity += quantity
      } else {
        existingCartData.push({...productData, quantity})
      }
      localStorage.setItem('cartItems', JSON.stringify(existingCartData))

      // this.setState({showPopup: true}) // Set showPopup to true to display the popup

      // // Set a timeout to hide the popup after 3 seconds
      // setTimeout(() => {
      //   this.setState({showPopup: false})
      // }, 3000)
    }

    return (
      <div className="product-details-success-view">
        <div className="product-details-container">
          <img src={imageUrl} alt="product" className="product-image" />
          <div className="product">
            <h1 className="product-name">{title}</h1>
            <p className="price-details">Rs {price}/-</p>
            <div className="rating-and-reviews-count">
              <div className="rating-container">
                <p className="rating">{rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="star"
                />
              </div>
            </div>
            <div className="label-value-container">
              <p className="label">Brand:</p>
              <p className="value">{brand}</p>
            </div>
            <hr className="horizontal-line" />
            <div className="quantity-container">
              <button
                type="button"
                className="quantity-controller-button"
                onClick={this.onDecrementQuantity}
              >
                <BsDashSquare className="quantity-controller-icon" />
              </button>
              <p className="quantity">{quantity}</p>
              <button
                type="button"
                className="quantity-controller-button"
                onClick={this.onIncrementQuantity}
              >
                <BsPlusSquare className="quantity-controller-icon" />
              </button>
            </div>
            <button
              type="button"
              className="button add-to-cart-btn"
              onClick={onClickAddToCart}
            >
              ADD TO CART
            </button>
          </div>
        </div>
        <div className="button-container">
          <Link to="/products">
            <button type="button" className="button">
              CONTINUE SHOPPING
            </button>
          </Link>
        </div>
      </div>
    )
  }

  render() {
    const {location} = this.props
    const {productData} = location.state
    return (
      <>
        <Header />
        <div className="product-item-details-container">
          {this.renderProductDetailsView(productData)}
        </div>
      </>
    )
  }
}

export default ProductItemDetails
