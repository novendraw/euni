import React from 'react';
import './App.css';
import axios from 'axios';
import qs from 'qs';
import cookie from 'react-cookies';

class App extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUserLogin = this.handleUserLogin.bind(this);
    this.handleUserRegister = this.handleUserRegister.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }
  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleUserLogin(event) {
    event.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    const datadata = {
      username: this.state.username,
      password: this.state.password,
    };
    axios.post('https://api.stya.net/nim/login', qs.stringify(datadata), config)
        .then(function (response) {
          if (response.data.code == null) {
            alert("Please supply a username and a password!");
          } else {
            if (response.data.code === -2) {
              alert("Wrong username/password!");
            } else {
              const expires = new Date();
              expires.setDate(Date.now() + 86400)

              cookie.save(
                  'token',
                  response.data.token,
                  {
                    path: '/',
                    expires
                  }
              )
              const elem = document.getElementById("loginForm");
              elem.innerHTML = "You already Signed In"
            }
          }
        })
  }
  handleUserRegister(event) {
    event.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    const datadata = {
      username: this.state.username,
      password: this.state.password,
    };
    var self = this;
    axios.post('https://api.stya.net/nim/register', qs.stringify(datadata), config)
        .then(function (response) {
          if (response.data.code == null) {
            alert("Please supply a username and a password!");
          } else {
            if (response.data.code === -4) {
              alert("That username is already taken!");
            } else {
              self.handleUserLogin(event);
            }
          }
        })
  }



  render() {
    if (cookie.load('token') != null){
      return (
          <div>
            You Already Signed In
          </div>
      )
    } else {
      return (
          <div>
            <form id="loginForm">
              <input type="text" placeholder="Username" value={this.state.username}
                     onChange={this.handleUsernameChange}/>
              <input type="password" placeholder="Password" value={this.state.password}
                     onChange={this.handlePasswordChange}/>
              <input type="button" value="Login" onClick={this.handleUserLogin}/>
              <input type="button" value="Register" onClick={this.handleUserRegister}/>
            </form>
          </div>
      )
    }

  }
}

export default App;