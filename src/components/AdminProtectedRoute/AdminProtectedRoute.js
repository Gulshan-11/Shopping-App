import {useState, useEffect, useRef} from 'react'
import {Redirect, Route} from 'react-router-dom'
import Cookie from 'js-cookie'
import {auth} from '../../firebase'

const AdminProtectedRoute = props => {
  const token = Cookie.get('jwt_token')
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  if (!token || !currentUser) {
    return <Redirect to="/login" />
  }

  if (currentUser && currentUser.email !== 'gchandnani1103@gmail.com') {
    console.log('not 1103')
    return <Redirect to="/unauthorized" />
  }

  return <Route {...props} />
}

export default AdminProtectedRoute
