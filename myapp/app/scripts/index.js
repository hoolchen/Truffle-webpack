import idxcss from '../styles/app.css'
// import picture1 from '../images/picture1.jpg'
// var picture1 = require('../images/picture1.jpg')

import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'

import RestaurantVote_artifacts from '../../build/contracts/RestaurantVote.json'

var RVContract = contract(RestaurantVote_artifacts);
// var fs = require('fs');
var users = [];
var restaurants = [];
var abi;

window.App = {
  init: function() {
    RVContract.setProvider(web3.currentProvider);
    $.getJSON("../datas/data.json", function(datas) {
      $.each(datas, function(index, data) {
        users.push(data);
      });
    });
    console.log(users);
    $.getJSON("../datas/restaurant.json", function(datas) {
      $.each(datas, function(index, data) {
        restaurants.push(data);
      });
    });
    console.log(restaurants);
  },
  Register: function(username, passage, callback) {
    var isValid = true;
    for (var i in users) {
      if (username == users[i].name) {
        callback(null, 2);
        isValid = false;
      }
    }
    if (isValid) {
      users.push({
        "name":username,
        "passage":passage
      });
      console.log(users);
      // fs.writeFile("../datas/data.json", users);
      callback(null, 1);
    }
  },
  Login: function(username, passage, callback) {
    // console.log(users);
    var isExist = false;
    var isJoin = false;
    for (var i in users) {
      if (username == users[i].name) {
        if (passage != users[i].passage) {
          callback(null, 3);
          isJoin = false;
          isExist = true;
        }
        else {
          isExist = true;
          isJoin = true;
          callback(null, 1);
        }
      }
    }
    if (!isExist && !isJoin)
      callback(null, 2);
  },
  load: function() {
    var src = document.getElementById("iframes").src;
    console.log(src);
    if (src != "http://localhost:8080/iframes/start.html") {
      document.getElementById("register").classList.remove("check_register");
      document.getElementById("register").classList.add("uncheck_register");
      document.getElementById("login").classList.remove("check_login");
      document.getElementById("login").classList.add("uncheck_login");
    }
    else {
      document.getElementById("register").classList.add("check_register");
      document.getElementById("register").classList.remove("uncheck_register");
      document.getElementById("login").classList.add("check_login");
      document.getElementById("login").classList.remove("uncheck_login");
    }
    if (src.search("http://localhost:8080/iframes/successful.html") != -1) {
      window.document.getElementById("iframes").contentWindow.showInfo(restaurants);
      window.document.getElementById("iframes").contentWindow.enableInfo();
    }
  },
  toback: function() {
    document.getElementById("iframes").src = "http://localhost:8080/iframes/start.html";
  },
  tosuccess: function(username) {
    document.getElementById("iframes").src = "http://localhost:8080/iframes/successful.html?username=" + username;
  },
  change: function(restaurant, b) {
    console.log(restaurants);
  }
  // test: function(name, callback) {
  //   RVContract.deployed().then(function(instance){
  //     instance.setcustomer.call(name).then(function(result) {
  //       callback(result);
  //     });
  //   }).catch(function(e) {
  //     console.log(e);
  //   });
  // },
  // test: function(username) {
  //   var s;
  //   RVContract.deployed().then(function(instance) {
  //     s = instance;
  //     return s.setcustomer(username, {from:RVContract.web3.eth.accounts[0]});
  //   }).then(function() {
  //     return s.getcustomerNumber.call();
  //   });
  // },
  // test1: function(callback) {
  //   RVContract.deployed().then(function(instance) {
  //     instance.getcustomerNumber.call().then(function(result) {
  //       callback(result);
  //     });
  //   }).catch(function(e) {
  //     console.log(e);
  //   });
  // }
};

window.addEventListener('load', function() {
  // window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
  if (typeof web3 !== 'undefined') {
    window.web3 = new Web3(web3.currentProvider);
  } else {
    // set the provider you want from Web3.providers
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
  }
  
  // var test = window.web3.eth.contract(abi).at(0x546C5bd7a7DCb44b64D5729c992b9EE24c851bE0);
  // for (var i = 0; i < 3; ++i) console.log(test.setcustomer("aa"));
  // var test = RVContract.deployed().then(function(instance) {
  //   return instance.setcustomer.call("hh");
  // });
  App.init();
});