(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{23:function(e,a,t){e.exports=t(52)},29:function(e,a,t){},30:function(e,a,t){},52:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),s=t(16),l=t.n(s),o=(t(29),t(17)),i=t(18),c=t(21),h=t(19),d=t(1),m=t(22),u=(t(30),t(4)),p=t.n(u),g=t(7),y=t.n(g),b=t(3),v=t.n(b),f=t(20),k=function(e){function a(e){var t;return Object(o.a)(this,a),(t=Object(c.a)(this,Object(h.a)(a).call(this,e))).state={username:"",password:"",keyword:"",data:[],byname:!0,count:10,page:0,total:0},t.handleUsernameChange=t.handleUsernameChange.bind(Object(d.a)(t)),t.handlePasswordChange=t.handlePasswordChange.bind(Object(d.a)(t)),t.handleUserLogin=t.handleUserLogin.bind(Object(d.a)(t)),t.handleUserRegister=t.handleUserRegister.bind(Object(d.a)(t)),t.handleSearch=t.handleSearch.bind(Object(d.a)(t)),t.handleByName=t.handleByName.bind(Object(d.a)(t)),t.handleById=t.handleById.bind(Object(d.a)(t)),t.handleTypeChange=t.handleTypeChange.bind(Object(d.a)(t)),t.handleCountChange=t.handleCountChange.bind(Object(d.a)(t)),t.handleChangePage=t.handleChangePage.bind(Object(d.a)(t)),t}return Object(m.a)(a,e),Object(i.a)(a,[{key:"handleTypeChange",value:function(e){"byname"===e.target.value?this.setState({byname:!0}):"byid"===e.target.value&&this.setState({byname:!1}),this.setState({data:[]})}},{key:"handleByName",value:function(e){var a="https://api.stya.net/nim/byname?name="+e.target.value+"&count="+this.state.count+"&page=0",t="https://api.stya.net/nim/byname?name="+e.target.value+"&count=9007199254740991",n={headers:{"Target-URL":a,tokennya:"token="+v.a.load("token")}},r={headers:{"Target-URL":t,tokennya:"token="+v.a.load("token")}},s=this;p.a.get("https://vendra-cors.herokuapp.com/",n).then(function(e){s.setState({data:e.data.payload,page:0})}),p.a.get("https://vendra-cors.herokuapp.com/",r).then(function(e){s.setState({total:e.data.code})})}},{key:"handleById",value:function(e){var a="https://api.stya.net/nim/byid?query="+e.target.value+"&count="+this.state.count+"&page=0",t="https://api.stya.net/nim/byid?query="+e.target.value+"&count=9007199254740991",n={headers:{"Target-URL":a,tokennya:"token="+v.a.load("token")}},r={headers:{"Target-URL":t,tokennya:"token="+v.a.load("token")}},s=this;p.a.get("https://vendra-cors.herokuapp.com/",n).then(function(e){s.setState({data:e.data.payload,page:0})}),p.a.get("https://vendra-cors.herokuapp.com/",r).then(function(e){s.setState({total:e.data.code})})}},{key:"handleSearch",value:function(e){this.setState({keyword:e.target.value});var a=new Date;a.setDate(Date.now()+86400),v.a.save("token",v.a.load("token"),{path:"/",expires:a}),Number.isInteger(Number.parseInt(this.state.count))&&parseInt(this.state.count)>0?this.state.byname?this.handleByName(e):this.handleById(e):(this.setState({count:1}),alert('Please provide valid "Data per Page" parameter'))}},{key:"handleUsernameChange",value:function(e){this.setState({username:e.target.value})}},{key:"handleCountChange",value:function(e){this.setState({data:[],count:e.target.value})}},{key:"handlePasswordChange",value:function(e){this.setState({password:e.target.value})}},{key:"handleUserLogin",value:function(e){e.preventDefault();var a={username:this.state.username,password:this.state.password};p.a.post("https://cors-vendra.herokuapp.com/",y.a.stringify(a),{headers:{"Content-Type":"application/x-www-form-urlencoded","Target-URL":"https://api.stya.net/nim/login"}}).then(function(e){if(null==e.data.code)alert("Please supply a username and a password!");else if(-2===e.data.code)alert("Wrong username/password!");else{var a=new Date;a.setDate(Date.now()+86400),v.a.save("token",e.data.token,{path:"/",expires:a})}})}},{key:"handleUserRegister",value:function(e){e.preventDefault();var a={username:this.state.username,password:this.state.password},t=this;p.a.post("https://cors-vendra.herokuapp.com/",y.a.stringify(a),{headers:{"Content-Type":"application/x-www-form-urlencoded","Target-URL":"https://api.stya.net/nim/register"}}).then(function(a){null==a.data.code?"3"===a.data[11]?alert("Username exceeded 20-character limitation!"):alert("Please supply a username and a password!"):-4===a.data.code?alert("That username is already taken!"):t.handleUserLogin(e)})}},{key:"handleChangePage",value:function(e){this.setState({page:e-1});var a={headers:{"Target-URL":(this.state.byname?"https://api.stya.net/nim/byname?name=":"https://api.stya.net/nim/byid?query=")+this.state.keyword+"&count="+this.state.count+"&page="+(e-1).toString(),tokennya:"token="+v.a.load("token")}},t=this;p.a.get("https://vendra-cors.herokuapp.com/",a).then(function(e){t.setState({data:e.data.payload})})}},{key:"render",value:function(){var e=this;return null!=v.a.load("token")?r.a.createElement("div",{id:"content",className:"container-fluid"},r.a.createElement("div",{className:"form-group typewriter"},r.a.createElement("h1",null,"Engi\u2019s University Data Finder")),r.a.createElement("div",{className:"form-row"},r.a.createElement("div",{className:"form-group col"},r.a.createElement("label",{htmlFor:"count"},"Data per Page"),r.a.createElement("input",{className:"form-control",id:"count",type:"text",placeholder:"10",value:this.state.count,onChange:this.handleCountChange})),r.a.createElement("div",{className:"form-group col"},r.a.createElement("label",{htmlFor:"searchtype"},"Search Type"),r.a.createElement("select",{id:"searchtype",className:"form-control",onChange:this.handleTypeChange},r.a.createElement("option",{value:"byname"},"Search by Name"),r.a.createElement("option",{value:"byid"},"Search by ID")))),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{className:"form-control form-control-lg",type:"text",placeholder:"Search Here",value:this.state.keyword,onChange:this.handleSearch})),r.a.createElement("div",{className:"table-responsive-xl"},r.a.createElement("table",{className:"table table-bordered table-light table-striped"},r.a.createElement("thead",{className:"thead-light"},r.a.createElement("tr",null,r.a.createElement("th",null,"Nama"),r.a.createElement("th",null,"NIM TPB"),r.a.createElement("th",null,"NIM Jurusan"),r.a.createElement("th",null,"Program Studi"))),r.a.createElement("tbody",null,this.state.data.map(function(e,a){return r.a.createElement("tr",{key:a},r.a.createElement("td",null,e.name),r.a.createElement("td",null,e.nim_tpb),r.a.createElement("td",null,e.nim_jur),r.a.createElement("td",null,e.prodi))})))),r.a.createElement("div",{className:"form-group"},r.a.createElement(f.a,{total:this.state.total,limit:this.state.count,pageCount:3,currentPage:this.state.page+1},function(a){var t=a.pages,n=a.currentPage,s=a.hasNextPage,l=a.hasPreviousPage,o=a.previousPage,i=a.nextPage,c=a.getPageItemProps;return r.a.createElement("ul",{className:"pagination justify-content-center"},l&&r.a.createElement("li",Object.assign({className:"page-item"},c({pageValue:o,onPageChange:e.handleChangePage})),r.a.createElement("a",{className:"page-link"},"Previous")),t.map(function(a){return n===a?r.a.createElement("li",Object.assign({className:"page-item active"},c({pageValue:a,key:a,onPageChange:e.handleChangePage})),r.a.createElement("a",{className:"page-link"},a)):r.a.createElement("li",Object.assign({className:"page-item"},c({pageValue:a,key:a,onPageChange:e.handleChangePage})),r.a.createElement("a",{className:"page-link"},a))}),s&&r.a.createElement("li",Object.assign({className:"page-item"},c({pageValue:i,onPageChange:e.handleChangePage})),r.a.createElement("a",{className:"page-link"},"Next")))}))):r.a.createElement("div",{id:"content",className:"container-fluid mt-5"},r.a.createElement("form",null,r.a.createElement("div",{className:"form-group typewriter"},r.a.createElement("h1",null,"Engi\u2019s University Data Finder")),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{className:"form-control form-control-lg",type:"text",placeholder:"Username",value:this.state.username,onChange:this.handleUsernameChange})),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{className:"form-control form-control-lg",type:"password",placeholder:"Password",value:this.state.password,onChange:this.handlePasswordChange})),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{className:"btn btn-light btn-lg btn-block",type:"button",value:"Login",onClick:this.handleUserLogin}),r.a.createElement("input",{className:"btn btn-light btn-lg btn-block",type:"button",value:"Register",onClick:this.handleUserRegister}))))}}]),a}(r.a.Component);l.a.render(r.a.createElement(k,null),document.getElementById("root"))}},[[23,1,2]]]);
//# sourceMappingURL=main.612208aa.chunk.js.map