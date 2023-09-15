import {useEffect, useState} from 'react'
import {getFirestore, collection, doc, getDoc} from 'firebase/firestore'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import EmptyOrderView from '../EmptyOrderView'
import OrderListView from '../OrderListView'
import {auth} from '../../firebase'
import './index.css'

const MyOrders = () => {
  const [orderList, setOrderList] = useState([])
  const [loading, setLoading] = useState()
  const [initialDataFetched, setInitialDataFetched] = useState(false)

  useEffect(() => {
    setLoading(true)

    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        // User is authenticated, fetch orders
        const firestore = getFirestore()
        const orderCollectionRef = collection(firestore, 'orderDetails')
        const orderDocumentRef = doc(orderCollectionRef, user.uid)

        try {
          const orderDocumentSnapshot = await getDoc(orderDocumentRef)

          if (orderDocumentSnapshot.exists()) {
            const orderData = orderDocumentSnapshot.data()
            setOrderList(orderData.orders || [])
          } else {
            setOrderList([])
          }
          setInitialDataFetched(true)
        } catch (error) {
          console.error('Error fetching order details:', error)
        }
      } else {
        // User is not authenticated, reset order list
        setOrderList([])
        setInitialDataFetched(true)
      }

      setLoading(false)
    })

    return () => unsubscribe() // Cleanup on unmount
  }, [])

  const showEmptyView = orderList.length === 0

  if (showEmptyView && !loading) {
    return (
      <>
        <Header />
        <div className="cart-container">
          <EmptyOrderView />
        </div>
      </>
    )
  }

  if (!initialDataFetched) {
    return (
      <>
        <Header />
        <div className="loader">
          <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="order-container">
        <div className="order-content-container">
          <h1 className="order-heading">My Orders</h1>
          {orderList.map(order => (
            <div key={order.id}>
              <div key={order.id} className="orderDetails">
                <h3 key={order.id}>
                  Ordered on{' '}
                  {new Date(order.timestamp.seconds * 1000).toLocaleString()}
                </h3>
                <h3>Total Amount: Rs. {order.totalPrice}</h3>
              </div>
              <OrderListView orderList={order.orderItems} />
              <hr />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default MyOrders
