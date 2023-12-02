import './index.css'

const InvoiceComponent = ({invoiceDetails, shippingAddress}) => {
  const totalAmount = invoiceDetails.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  )

  return (
    <div
      style={{fontFamily: 'Arial, sans-serif', fontSize: '14px', color: '#333'}}
    >
      <div style={{textAlign: 'center', marginBottom: '20px'}}>
        <h2>Rajesh Garments</h2>
        <p>123 Clothing Street, City, Zip Code</p>
      </div>
      <table style={{width: '100%', borderCollapse: 'collapse'}}>
        <thead>
          <tr style={{borderBottom: '1px solid #ccc'}}>
            <th style={{textAlign: 'left', padding: '8px 0'}}>Title</th>
            <th style={{textAlign: 'left', padding: '8px 0'}}>Brand</th>
            <th style={{textAlign: 'left', padding: '8px 0'}}>Category</th>
            <th style={{textAlign: 'left', padding: '8px 0'}}>Price</th>
            <th style={{textAlign: 'left', padding: '8px 0'}}>Quantity</th>
            <th style={{textAlign: 'left', padding: '8px 0'}}>Rating</th>
            <th style={{textAlign: 'left', padding: '8px 0'}}>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {invoiceDetails.map(item => (
            <tr key={item.id} style={{borderBottom: '1px solid #ccc'}}>
              <td style={{padding: '8px 0'}}>{item.title}</td>
              <td style={{padding: '8px 0'}}>{item.brand}</td>
              <td style={{padding: '8px 0'}}>{item.category}</td>
              <td style={{padding: '8px 0'}}>Rs {item.price}\-</td>
              <td style={{padding: '8px 0'}}>{item.quantity}</td>
              <td style={{padding: '8px 0'}}>{item.rating}</td>
              <td style={{padding: '8px 0'}}>
                Rs {item.price * item.quantity}\-
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="6" style={{padding: '8px 0', textAlign: 'right'}}>
              <strong>Total Amount:</strong>
            </td>
            <td colSpan="6" style={{padding: '8px 0', textAlign: 'left'}}>
              <strong>Rs {totalAmount}\-</strong>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="shipping-">
        <p>Shipping Address:</p>
        <p>{shippingAddress.name}</p>
        <p>{shippingAddress.address}</p>
        <p>{shippingAddress.city}</p>
        <p>{shippingAddress.state}</p>
        <p>{shippingAddress.zipCode}</p>
      </div>
    </div>
  )
}

export default InvoiceComponent
