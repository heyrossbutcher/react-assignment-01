import React from 'react';
import ReactDOM from 'react-dom';
import Mapp from './App';
import './index.css';
var firebase = require('firebase');


 ////////////////////////////////////////////////////////////
// Initialize Firebase
 var config = {
   apiKey: "AIzaSyAq1sbeLgsnx3wQAxLrmvaHDHyeE6ABM14",
   authDomain: "react-map-art.firebaseapp.com",
   databaseURL: "https://react-map-art.firebaseio.com",
   storageBucket: "react-map-art.appspot.com",
   messagingSenderId: "152067164937"
 };
 firebase.initializeApp(config);
 ////////////////////////////////////////////////////////////

ReactDOM.render( <Mapp />, document.getElementById('root'));
