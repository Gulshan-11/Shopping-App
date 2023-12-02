import {Component} from 'react'
import emailjs from 'emailjs-com'
import {withRouter} from 'react-router-dom'
import {getFirestore, collection, doc, setDoc, getDoc} from 'firebase/firestore'
import html2pdf from 'html2pdf.js'
import ReactDOMServer from 'react-dom/server'
import InvoiceComponent from '../InvoiceComponent'
import {auth} from '../../firebase'
import './index.css'
import 'dotenv/config'

class SummaryPage extends Component {
  state = {
    isOrderPlaced: false,
    isLoading: false,
    shippingAddress: {
      name: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
    },
  }

  componentDidMount() {
    emailjs.init('RCt2qZO52k0nwVovW') // Initialize EmailJS with your user ID
  }

  generatePDF = async () => {
    try {
      console.log('Generating pdf..........')
      const invoiceDetails = JSON.parse(localStorage.getItem('cartItems'))
      const {shippingAddress} = this.state
      const Invoice = (
        <InvoiceComponent
          invoiceDetails={invoiceDetails}
          shippingAddress={shippingAddress}
        />
      )
      const htmlString = ReactDOMServer.renderToString(Invoice)
      const opt = {
        margin: 0.5,
        filename: 'invoice.pdf',
        image: {type: 'jpeg', quality: 0.98},
        html2canvas: {scale: 2},
        jsPDF: {unit: 'in', format: 'letter', orientation: 'portrait'},
      }
      await html2pdf().set(opt).from(htmlString).save()
      // const pdfBlob = await html2pdf().set(opt).from(htmlString).outputPdf()
      console.log('PDF Generated successfully ')
    } catch (e) {
      console.error(e)
      // return null
    }
  }

  orderPlaced = async () => {
    const {total, items} = this.props
    const {shippingAddress} = this.state
    const orderData = JSON.parse(localStorage.getItem('cartItems'))
    const user = auth.currentUser
    console.log(user)

    try {
      if (user) {
        this.setState({isLoading: true})
        // Store order details in Firestore
        const firestore = getFirestore()
        const orderCollectionRef = collection(firestore, 'orderDetails')
        const orderDocumentRef = doc(orderCollectionRef, user.uid)

        const orderDocumentSnapshot = await getDoc(orderDocumentRef)

        let existingOrderItems = []
        if (orderDocumentSnapshot.exists()) {
          const existingOrderData = orderDocumentSnapshot.data()
          existingOrderItems = existingOrderData.orders || []
        }

        await this.generatePDF()

        const newOrder = {
          id: new Date().getTime(), // Unique ID based on timestamp
          timestamp: new Date(),
          orderItems: orderData,
          totalPrice: total,
          itemsOrdered: items,
          shippingAddress: {...shippingAddress},
          status: 'Order Placed',
          // invoice: pdfBase64, // Store base64 string instead of Blob
        }

        const updatedOrderItems = [newOrder, ...existingOrderItems]

        await setDoc(orderDocumentRef, {
          orders: updatedOrderItems,
        })
        console.log('Order placed successfully')
      }

      this.setState({isOrderPlaced: true})
      localStorage.removeItem('cartItems')

      const {history} = this.props // Destructuring props
      history.push('/myorders')
    } catch (error) {
      console.error('Error placing order:', error)
    } finally {
      this.setState({isLoading: false})
    }
  }

  // blobToBase64 = blob =>
  //   new Promise((resolve, reject) => {
  //     const reader = new FileReader()
  //     reader.onloadend = () => resolve(reader.result.split(',')[1])
  //     reader.onerror = reject
  //     reader.readAsDataURL(blob)
  //   })

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
    const {isOrderPlaced, shippingAddress, isLoading} = this.state

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
            disabled={isLoading}
          >
            {isLoading ? 'Placing Order...' : 'Confirm Order'}
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
