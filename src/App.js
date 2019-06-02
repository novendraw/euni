import React from 'react';
import axios from 'axios';
import qs from 'qs';
import cookie from 'react-cookies';
import Pagination from 'react-paginating';

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
            page: 0,
            total: 0,
        };
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUserLogin = this.handleUserLogin.bind(this);
        this.handleUserRegister = this.handleUserRegister.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleByName = this.handleByName.bind(this);
        this.handleById = this.handleById.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleCountChange = this.handleCountChange.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
    }

    /* Handle byname state when search type input changed */
    handleTypeChange(event) {
        if (event.target.value === "byname"){
            this.setState({byname:true});
        } else {
            if (event.target.value === "byid") {
                this.setState({byname:false});
            }
        }
        this.setState({data : [], total : 0});
    }

    /* Handle search request when using byname search type */
    handleByName(event) {
        const target = 'https://api.stya.net/nim/byname?name='
            + event.target.value + '&count='
            + this.state.count
            + '&page=0';
        const targettotal = 'https://api.stya.net/nim/byname?name='
            + event.target.value + '&count='
            + '9007199254740991';

        const config = {
            headers: {
                'Auth-Token' : cookie.load('token'),
            },
        };


        const self = this;
        axios.get(target,config)
            .then(function (response) {
                if (response.data.payload == null) {
                    alert("Invalid token. Please revalidate!");
                    cookie.remove('token', { path: '/' });
                    window.location.reload();
                } else {
                    self.setState({data: response.data.payload, page: 0})
                }
            });
        axios.get(targettotal,config)
            .then(function (response) {
                if (response.data.payload != null) {
                    self.setState({total: response.data.code})
                }
            });
    }

    /* Handle search request when using byid search type */
    handleById(event) {
        const target = 'https://api.stya.net/nim/byid?query='
            + event.target.value + '&count='
            + this.state.count
            + '&page=0';
        const targettotal = 'https://api.stya.net/nim/byid?query='
            + event.target.value + '&count='
            + '9007199254740991';
        const config = {
            headers: {
                'Auth-Token' : cookie.load('token'),
            },
        };

        const self = this;
        axios.get(target,config)
            .then(function (response) {
                if (response.data.payload == null) {
                    alert("Invalid token. Please revalidate!");
                    cookie.remove('token', { path: '/' });
                    window.location.reload();
                } else {
                    self.setState({data: response.data.payload, page: 0})
                }
            });
        axios.get(targettotal,config)
            .then(function (response) {
                if (response.data.payload != null) {
                    self.setState({total: response.data.code})
                }
            });
    }

    /* Handle search action when keyword parameter changed */
    handleSearch(event) {
        this.setState({keyword: event.target.value});
        const expires = new Date();
        expires.setDate(Date.now() + 86400);
        cookie.save(
            'token',
            cookie.load('token'),
            {
                path: '/',
                expires
            });
        if (Number.isInteger(Number.parseInt(this.state.count)) && parseInt(this.state.count) > 0) {
            if (this.state.byname) {
                this.handleByName(event);
            } else {
                this.handleById(event);
            }
        } else {
            this.setState({count:1});
            alert("Please provide valid \"Data per Page\" parameter")
        }
    }

    /* Handle username state when username input changed */
    handleUsernameChange(event) {
        this.setState({username: event.target.value});
    }

    /* Handle count state when count parameter changed */
    handleCountChange(event) {
        this.setState({data: [],count: event.target.value, total: 0});
    }

    /* Handle password state when password input changed */
    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    /* Handle login request */
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
                if (response.data.status !== "OK") {
                    alert(response.data.status);
                } else {
                    const expires = new Date();
                    expires.setDate(Date.now() + 86400);

                    cookie.save(
                        'token',
                        response.data.token,
                        {
                            path: '/',
                            expires
                        }
                    );
                    window.location.reload();
                }
            })
    }

    /* Handle register request */
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
        const self = this;
        axios.post('https://api.stya.net/nim/register', qs.stringify(datadata), config)
            .then(function (response) {
                    if (response.data.status !== "OK") {
                        alert(response.data.status);
                    } else {
                        self.handleUserLogin(event);
                    }
                }
                )
    }

    /* Handle search action when change page */
    handleChangePage(pages) {
        const expires = new Date();
        expires.setDate(Date.now() + 86400);
        cookie.save(
            'token',
            cookie.load('token'),
            {
                path: '/',
                expires
            });
        this.setState({
            page: pages-1
        });

        let link = '';
        if (this.state.byname) {
            link = 'https://api.stya.net/nim/byname?name=';
        }  else {
            link = 'https://api.stya.net/nim/byid?query=';
        }

        const target = link
            + this.state.keyword + '&count='
            + this.state.count
            + '&page=' + (pages-1).toString();
        const config={
            headers: {
                'Auth-Token' : cookie.load('token'),
            },
        };
        const self = this;
        axios.get(target,config)
            .then(function (response) {
                if (response.data.payload == null) {
                    alert("Invalid token. Please revalidate!");
                    cookie.remove('token', { path: '/' });
                    window.location.reload();
                } else {
                    self.setState({data: response.data.payload});
                }
            })
    }

    render() {

        /* Check if token already supplied */
        if (cookie.load('token') != null){

            /* Render Searching Page */
            return (
                <div id="content" className="container-fluid mt-5">
                    <div className="form-group typewriter">
                        <h1>Engi’s University Data Finder</h1>
                    </div>
                    <div className="form-row">
                        <div className="form-group col">
                            <label htmlFor="count">Data per Page</label>
                            <input className="form-control" id="count" type="text" placeholder="10" value={this.state.count}
                                   onChange={this.handleCountChange}/>
                        </div>
                        <div className="form-group col">
                            <label htmlFor="searchtype">Search Type</label>
                            <select id="searchtype" className="form-control" onChange={this.handleTypeChange}>
                                <option value="byname">Search by Name</option>
                                <option value="byid">Search by ID</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <input className="form-control form-control-lg" type="text" placeholder="Search Here" value={this.state.keyword}
                               onChange={this.handleSearch}/>
                    </div>
                    <div className="table-responsive-xl">
                        <table className="table table-bordered table-light table-striped">
                            <thead className="thead-light">
                            <tr>
                                <th>Nama</th>
                                <th>NIM TPB</th>
                                <th>NIM Jurusan</th>
                                <th>Program Studi</th>
                            </tr>
                            </thead>
                            <tbody >
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
                    <div className="form-group">
                        <Pagination
                            total={this.state.total}
                            limit={this.state.count}
                            pageCount={3}
                            currentPage={this.state.page+1}
                        >
                            {({
                                  pages,
                                  currentPage,
                                  hasNextPage,
                                  hasPreviousPage,
                                  previousPage,
                                  nextPage,
                                  getPageItemProps
                              }) => (
                                <ul className="pagination justify-content-center">

                                    {hasPreviousPage && (
                                        <li className="page-item"
                                            {...getPageItemProps({
                                                pageValue: previousPage,
                                                onPageChange: this.handleChangePage
                                            })}
                                        >
                                            <button className="page-link">{"Previous"}</button>
                                        </li>
                                    )}

                                    {pages.map(page => {
                                        if (currentPage === page) {
                                            return (
                                                <li className="page-item active"
                                                    {...getPageItemProps({
                                                        pageValue: page,
                                                        key: page,
                                                        onPageChange: this.handleChangePage
                                                    })}
                                                >
                                                    <button className="page-link">{page}</button>
                                                </li>
                                            );
                                        } else {
                                            return (
                                                <li className="page-item"
                                                    {...getPageItemProps({
                                                        pageValue: page,
                                                        key: page,
                                                        onPageChange: this.handleChangePage
                                                    })}
                                                >
                                                    <button className="page-link">{page}</button>
                                                </li>
                                            );
                                        }
                                    })}

                                    {hasNextPage && (
                                        <li className="page-item"
                                            {...getPageItemProps({
                                                pageValue: nextPage,
                                                onPageChange: this.handleChangePage
                                            })}
                                        >
                                            <button className="page-link" >{"Next"}</button>
                                        </li>
                                    )}

                                </ul>
                            )}
                        </Pagination>
                    </div>
                </div>
            )
        } else {

            /* Render Login/Register Page */
            return (
                <div id = "content" className="container-fluid mt-5">
                    <form >
                        <div className="form-group typewriter">
                            <h1>Engi’s University Data Finder</h1>
                        </div>
                        <div className="form-group">
                            <input className="form-control form-control-lg" type="text" placeholder="Username" value={this.state.username}
                                   onChange={this.handleUsernameChange}/>
                        </div>
                        <div className="form-group">
                            <input className="form-control form-control-lg" type="password" placeholder="Password" value={this.state.password}
                                   onChange={this.handlePasswordChange}/>
                        </div>
                        <div className="form-group" >
                            <input className="btn btn-light btn-lg btn-block" type="button" value="Login" onClick={this.handleUserLogin}/>
                            <input className="btn btn-light btn-lg btn-block" type="button" value="Register" onClick={this.handleUserRegister}/>
                        </div>
                    </form>
                </div>
            )
        }

    }
}

export default App;