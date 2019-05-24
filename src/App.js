import React from 'react';
import './App.css';
import axios from 'axios';
import qs from 'qs';
import cookie from 'react-cookies';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class App extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      keyword: '',
      data: [],
      byname: true,
      count: 10,
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUserLogin = this.handleUserLogin.bind(this);
    this.handleUserRegister = this.handleUserRegister.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleByName = this.handleByName.bind(this);
    this.handleById = this.handleById.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
  }
    handleTypeChange(event) {
        if (event.target.value == "byname"){
          this.setState({byname:true});
        } else {
          if (event.target.value == "byid") {
            this.setState({byname:false});
          }
        }
        this.setState({data:[]});
    }
    handleByName(event) {

    var self = this;
      axios.get('http://goxcors.appspot.com/cors?method=GET&header=Cookie|token='
          +cookie.load('token')
          +'&url=https://api.stya.net/nim/byname?name='
          + event.target.value + '&count='
          + this.state.count
          + '&page=0')
        .then(function (response) {
            self.setState({data: response.data.payload})
        })
    }
    handleById(event) {
      var self = this;
      axios.get('http://goxcors.appspot.com/cors?method=GET&header=Cookie|token='
          +cookie.load('token')
          +'&url=https://api.stya.net/nim/byid?query='
          + event.target.value + '&count='
          + this.state.count
          + '&page=0')
          .then(function (response) {
            self.setState({data: response.data.payload})
          })
    }
    handleSearch(event) {
    this.setState({keyword: event.target.value});

    if (this.state.byname) {
      this.handleByName(event);
    } else {
      this.handleById(event);
    }
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
    axios.post('http://goxcors.appspot.com/cors?method=POST&url=https://api.stya.net/nim/login', qs.stringify(datadata), config)
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
          const elem = document.getElementById("content");
          elem.innerHTML = "You Already Signed In";

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
    axios.post('http://goxcors.appspot.com/cors?method=POST&url=https://api.stya.net/nim/register', qs.stringify(datadata), config)
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
          <div id="content" >
              <form>
                <div>
                  Data per Page :
                  <input type="text" placeholder="10" value={this.state.count}
                         />
                  Search Type :
                  <select onChange={this.handleTypeChange}>
                  <option value="byname">Search by Name</option>
                  <option value="byid">Search by ID</option>
                  </select>

                </div>
                  <input type="text" placeholder="Search Here" value={this.state.keyword}
                        onChange={this.handleSearch}/>
              </form>
              <table border="1" >
                  <tbody>
                  <tr>
                    <th>Nama</th>
                    <th>NIM TPB</th>
                    <th>NIM Jurusan</th>
                    <th>Program Studi</th>
                  </tr>
                  {this.state.data.map(function(item, key) {
                      return (
                          <tr key = {key} >
                              <td>{item.name}</td>
                              <td>{item.nim_tpb}</td>
                              <td>{item.nim_jur}</td>
                              <td>{item.prodi}</td>
                          </tr>
                      )

                  })}</tbody>
              </table>
          </div>
      )
    } else {
      return (
          <div id = "content">
            <Form.Group >
              <Form.Control size="lg" type="text" placeholder="Username" value={this.state.username}
                     onChange={this.handleUsernameChange}/>
              <Form.Control size="lg" type="password" placeholder="Password" value={this.state.password}
                     onChange={this.handlePasswordChange}/>
              <Button variant="light" size="lg" onClick={this.handleUserLogin}>Login</Button>
              <Button variant="light" size="lg" onClick={this.handleUserRegister}>Register</Button>

            </Form.Group>
          </div>
      )
    }

  }
}

export default App;