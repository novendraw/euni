(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{23:function(e,a,t){e.exports=t(51)},29:function(e,a,t){},51:function(e,a,t){"use strict";t.r(a);var n=t(0),l=t.n(n),r=t(16),s=t.n(r),o=(t(29),t(17)),i=t(18),c=t(21),d=t(19),h=t(1),u=t(22),m=t(4),p=t.n(m),g=t(7),y=t.n(g),v=t(3),b=t.n(v),k=t(20),f=function(e){function a(e){var t;return Object(o.a)(this,a),(t=Object(c.a)(this,Object(d.a)(a).call(this,e))).state={username:"",password:"",keyword:"",data:[],byname:!0,count:10,page:0,total:0},t.handleUsernameChange=t.handleUsernameChange.bind(Object(h.a)(t)),t.handlePasswordChange=t.handlePasswordChange.bind(Object(h.a)(t)),t.handleUserLogin=t.handleUserLogin.bind(Object(h.a)(t)),t.handleUserRegister=t.handleUserRegister.bind(Object(h.a)(t)),t.handleSearch=t.handleSearch.bind(Object(h.a)(t)),t.handleByName=t.handleByName.bind(Object(h.a)(t)),t.handleById=t.handleById.bind(Object(h.a)(t)),t.handleTypeChange=t.handleTypeChange.bind(Object(h.a)(t)),t.handleCountChange=t.handleCountChange.bind(Object(h.a)(t)),t.handleChangePage=t.handleChangePage.bind(Object(h.a)(t)),t}return Object(u.a)(a,e),Object(i.a)(a,[{key:"handleTypeChange",value:function(e){"byname"===e.target.value?this.setState({byname:!0}):"byid"===e.target.value&&this.setState({byname:!1}),this.setState({data:[]})}},{key:"handleByName",value:function(e){var a="https://api.stya.net/nim/byname?name="+e.target.value+"&count="+this.state.count+"&page=0",t="https://api.stya.net/nim/byname?name="+e.target.value+"&count=9007199254740991",n={headers:{"Target-URL":a,tokennya:"token="+b.a.load("token")}},l={headers:{"Target-URL":t,tokennya:"token="+b.a.load("token")}},r=this;p.a.get("https://vendra-cors.herokuapp.com/",n).then(function(e){null==e.data.payload?alert("Your token is invalid, please re login"):r.setState({data:e.data.payload,page:0})}),p.a.get("https://vendra-cors.herokuapp.com/",l).then(function(e){null==e.data.payload?alert("Your token is invalid, please re login"):r.setState({total:e.data.code})})}},{key:"handleById",value:function(e){var a="https://api.stya.net/nim/byid?query="+e.target.value+"&count="+this.state.count+"&page=0",t="https://api.stya.net/nim/byid?query="+e.target.value+"&count=9007199254740991",n={headers:{"Target-URL":a,tokennya:"token="+b.a.load("token")}},l={headers:{"Target-URL":t,tokennya:"token="+b.a.load("token")}},r=this;p.a.get("https://vendra-cors.herokuapp.com/",n).then(function(e){null==e.data.payload?alert("Your token is invalid, please re login"):r.setState({data:e.data.payload,page:0})}),p.a.get("https://vendra-cors.herokuapp.com/",l).then(function(e){null==e.data.payload?alert("Your token is invalid, please re login"):r.setState({total:e.data.code})})}},{key:"handleSearch",value:function(e){this.setState({keyword:e.target.value});var a=new Date;a.setDate(Date.now()+86400),b.a.save("token",b.a.load("token"),{path:"/",expires:a}),Number.isInteger(Number.parseInt(this.state.count))&&parseInt(this.state.count)>0?this.state.byname?this.handleByName(e):this.handleById(e):(this.setState({count:1}),alert('Please provide valid "Data per Page" parameter'))}},{key:"handleUsernameChange",value:function(e){this.setState({username:e.target.value})}},{key:"handleCountChange",value:function(e){this.setState({data:[],count:e.target.value})}},{key:"handlePasswordChange",value:function(e){this.setState({password:e.target.value})}},{key:"handleUserLogin",value:function(e){e.preventDefault();var a={username:this.state.username,password:this.state.password};p.a.post("https://cors-vendra.herokuapp.com/",y.a.stringify(a),{headers:{"Content-Type":"application/x-www-form-urlencoded","Target-URL":"https://api.stya.net/nim/login"}}).then(function(e){if(null==e.data.code)alert("Please supply a username and a password!");else if(-2===e.data.code)alert("Wrong username/password!");else{var a=new Date;a.setDate(Date.now()+86400),b.a.save("token",e.data.token,{path:"/",expires:a}),window.location.reload()}})}},{key:"handleUserRegister",value:function(e){e.preventDefault();var a={username:this.state.username,password:this.state.password},t=this;p.a.post("https://cors-vendra.herokuapp.com/",y.a.stringify(a),{headers:{"Content-Type":"application/x-www-form-urlencoded","Target-URL":"https://api.stya.net/nim/register"}}).then(function(a){null==a.data.code?"3"===a.data[11]?alert("Username exceeded 20-character limitation!"):alert("Please supply a username and a password!"):-4===a.data.code?alert("That username is already taken!"):t.handleUserLogin(e)})}},{key:"handleChangePage",value:function(e){var a=new Date;a.setDate(Date.now()+86400),b.a.save("token",b.a.load("token"),{path:"/",expires:a}),this.setState({page:e-1});var t={headers:{"Target-URL":(this.state.byname?"https://api.stya.net/nim/byname?name=":"https://api.stya.net/nim/byid?query=")+this.state.keyword+"&count="+this.state.count+"&page="+(e-1).toString(),tokennya:"token="+b.a.load("token")}},n=this;p.a.get("https://vendra-cors.herokuapp.com/",t).then(function(e){n.setState({data:e.data.payload})})}},{key:"render",value:function(){var e=this;return null!=b.a.load("token")?l.a.createElement("div",{id:"content",className:"container-fluid mt-5"},l.a.createElement("div",{className:"form-group typewriter"},l.a.createElement("h1",null,"Engi\u2019s University Data Finder")),l.a.createElement("div",{className:"form-row"},l.a.createElement("div",{className:"form-group col"},l.a.createElement("label",{htmlFor:"count"},"Data per Page"),l.a.createElement("input",{className:"form-control",id:"count",type:"text",placeholder:"10",value:this.state.count,onChange:this.handleCountChange})),l.a.createElement("div",{className:"form-group col"},l.a.createElement("label",{htmlFor:"searchtype"},"Search Type"),l.a.createElement("select",{id:"searchtype",className:"form-control",onChange:this.handleTypeChange},l.a.createElement("option",{value:"byname"},"Search by Name"),l.a.createElement("option",{value:"byid"},"Search by ID")))),l.a.createElement("div",{className:"form-group"},l.a.createElement("input",{className:"form-control form-control-lg",type:"text",placeholder:"Search Here",value:this.state.keyword,onChange:this.handleSearch})),l.a.createElement("div",{className:"table-responsive-xl"},l.a.createElement("table",{className:"table table-bordered table-light table-striped"},l.a.createElement("thead",{className:"thead-light"},l.a.createElement("tr",null,l.a.createElement("th",null,"Nama"),l.a.createElement("th",null,"NIM TPB"),l.a.createElement("th",null,"NIM Jurusan"),l.a.createElement("th",null,"Program Studi"))),l.a.createElement("tbody",null,this.state.data.map(function(e,a){return l.a.createElement("tr",{key:a},l.a.createElement("td",null,e.name),l.a.createElement("td",null,e.nim_tpb),l.a.createElement("td",null,e.nim_jur),l.a.createElement("td",null,e.prodi))})))),l.a.createElement("div",{className:"form-group"},l.a.createElement(k.a,{total:this.state.total,limit:this.state.count,pageCount:3,currentPage:this.state.page+1},function(a){var t=a.pages,n=a.currentPage,r=a.hasNextPage,s=a.hasPreviousPage,o=a.previousPage,i=a.nextPage,c=a.getPageItemProps;return l.a.createElement("ul",{className:"pagination justify-content-center"},s&&l.a.createElement("li",Object.assign({className:"page-item"},c({pageValue:o,onPageChange:e.handleChangePage})),l.a.createElement("button",{className:"page-link"},"Previous")),t.map(function(a){return n===a?l.a.createElement("li",Object.assign({className:"page-item active"},c({pageValue:a,key:a,onPageChange:e.handleChangePage})),l.a.createElement("button",{className:"page-link"},a)):l.a.createElement("li",Object.assign({className:"page-item"},c({pageValue:a,key:a,onPageChange:e.handleChangePage})),l.a.createElement("button",{className:"page-link"},a))}),r&&l.a.createElement("li",Object.assign({className:"page-item"},c({pageValue:i,onPageChange:e.handleChangePage})),l.a.createElement("button",{className:"page-link"},"Next")))}))):l.a.createElement("div",{id:"content",className:"container-fluid mt-5"},l.a.createElement("form",null,l.a.createElement("div",{className:"form-group typewriter"},l.a.createElement("h1",null,"Engi\u2019s University Data Finder")),l.a.createElement("div",{className:"form-group"},l.a.createElement("input",{className:"form-control form-control-lg",type:"text",placeholder:"Username",value:this.state.username,onChange:this.handleUsernameChange})),l.a.createElement("div",{className:"form-group"},l.a.createElement("input",{className:"form-control form-control-lg",type:"password",placeholder:"Password",value:this.state.password,onChange:this.handlePasswordChange})),l.a.createElement("div",{className:"form-group"},l.a.createElement("input",{className:"btn btn-light btn-lg btn-block",type:"button",value:"Login",onClick:this.handleUserLogin}),l.a.createElement("input",{className:"btn btn-light btn-lg btn-block",type:"button",value:"Register",onClick:this.handleUserRegister}))))}}]),a}(l.a.Component);s.a.render(l.a.createElement(f,null),document.getElementById("root"))}},[[23,1,2]]]);
//# sourceMappingURL=main.fef1d4b8.chunk.js.map