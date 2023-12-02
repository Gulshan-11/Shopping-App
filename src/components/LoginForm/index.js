import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {Link} from 'react-router-dom/cjs/react-router-dom.min'
import {auth} from '../../firebase'

import './index.css'

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({email: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    const {email} = this.state
    const authInfo = auth.currentUser

    localStorage.setItem('authInfo', JSON.stringify(authInfo))
    console.log('onSubmitSuccess function')
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    if (email === 'gchandnani1103@gmail.com') {
      console.log('if condition')
      history.replace('/admin')
    } else {
      history.replace('/')
    }
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {email, password} = this.state

    if (email === '' || password === '') {
      this.onSubmitFailure('Please enter all the fields')
      return
    }

    try {
      // Sign in the user using Firebase Authentication
      signInWithEmailAndPassword(auth, email, password)
        .then(res => {
          this.onSubmitSuccess(res.user.uid)
        })
        .catch(error => {
          this.onSubmitFailure(error.message)
        })
    } catch (error) {
      this.onSubmitFailure(error.message)
    }
  }

  renderPasswordField = () => {
    const {password} = this.state

    return (
      <>
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
      </>
    )
  }

  renderUsernameField = () => {
    const {email} = this.state

    return (
      <>
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
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-form-container">
        <img
          src="https://res.cloudinary.com/dhsesp3bq/image/upload/v1690130873/images/Shop-logo_juxcnv.png"
          className="login-website-logo-mobile-img"
          alt="website logo"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          className="login-img"
          alt="website login"
        />
        <form className="form-container" onSubmit={this.submitForm}>
          <img
            src="https://res.cloudinary.com/dhsesp3bq/image/upload/v1690130873/images/Shop-logo_juxcnv.png"
            className="login-website-logo-desktop-img"
            alt="website logo"
          />
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
          <Link to="/signup">Sign Up</Link>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
