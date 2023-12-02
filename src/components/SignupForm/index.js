import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import {createUserWithEmailAndPassword} from 'firebase/auth'
import {Link} from 'react-router-dom/cjs/react-router-dom.min'

import './index.css'
import {collection, doc, setDoc} from 'firebase/firestore'
import {auth, db} from '../../firebase'

class Signup extends Component {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
    showSubmitError: false,
    errorMsg: '',
    redirectToLogin: false,
  }

  onChangeUsername = event => {
    this.setState({email: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeConfirmPassword = event => {
    this.setState({confirmPassword: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    this.setState({redirectToLogin: true})
    const {email} = this.state
    const name = 'Not Available'
    const phone = 'Not Available'
    const authInfo = auth.currentUser
    localStorage.setItem('authInfo', JSON.stringify(authInfo))

    // Store the JWT token in cookies
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    const users = collection(db, 'users')
    const docRef = doc(users, email)
    setDoc(docRef, {name, phone, email}, {merge: true})
    const {history} = this.props
    history.push('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {email, password, confirmPassword} = this.state

    if (password !== confirmPassword) {
      this.onSubmitFailure("Passwords don't match")
      return
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      )
      this.onSubmitSuccess(userCredential.user.uid)
    } catch (error) {
      // You can handle the error here, set an appropriate error message
      this.onSubmitFailure(error.message)
    }
  }

  render() {
    const {
      showSubmitError,
      errorMsg,
      redirectToLogin,
      email,
      password,
      confirmPassword,
    } = this.state

    if (redirectToLogin) {
      return <Redirect to="/login" />
    }

    return (
      <div className="signup-page">
        <div className="signup-form-container">
          <form className="form-container" onSubmit={this.submitForm}>
            <img
              src="https://res.cloudinary.com/dhsesp3bq/image/upload/v1690130873/images/Shop-logo_juxcnv.png"
              className="login-website-logo-desktop-img"
              alt="website logo"
            />
            <div className="input-container">
              <label className="input-label" htmlFor="username">
                EMAIL
              </label>
              <input
                type="text"
                id="username"
                className="username-input-field"
                value={email}
                onChange={this.onChangeUsername}
                placeholder="Email"
              />
            </div>
            <div className="input-container">
              <label className="input-label" htmlFor="password">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                className="password-input-field"
                value={password}
                onChange={this.onChangePassword}
                placeholder="Password"
              />
            </div>
            <div className="input-container">
              <label className="input-label" htmlFor="confirmPassword">
                CONFIRM PASSWORD
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="confirm-password-input-field password-input-field"
                value={confirmPassword}
                onChange={this.onChangeConfirmPassword}
                placeholder="Confirm Password"
              />
            </div>
            <button type="submit" className="signup-button">
              Sign Up
            </button>
            <Link to="/login">Back to Login</Link>
            {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          className="login-img"
          alt="website login"
        />
      </div>
    )
  }
}

export default Signup
