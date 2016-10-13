var React = require('react');
var $ = require('jquery');
var firebase = require('firebase');
var fetch = require('isomorphic-fetch');
import './App.css';

var Mapp = React.createClass({

  getInitialState: function() {
    return {
      // currentUser: "",
      // loggedIn: false 
      profiles: {},
      currentUser: "Ross",
      loggedIn: true 
    }
  },

  render: function() {
     if (!this.state.loggedIn) { 

      return <div className="intro">
        <h1>Welcome, login to see the Mart</h1>
        <div className="login">
          <input type='text' placeholder="Enter your name to start chatting!" onChange={ this.setCurrentUser }/>
          <button onClick={ this.login }>Login</button>
        </div>
      </div>

    } else {
      return <div className="theContent">
        <h1>Welcome, { this.state.currentUser }</h1>
        <div className="mainContent">
            <div className="theMap">

            </div>
            <div className="theUsers">
              { Object.keys(this.state.profiles).map((id) => {
                var profile = this.state.profiles[id];
                var maps = profile.maps;
                return <div key={ id } className="user">
                  <ul>
                    <li>
                    { profile.userName }
                    </li>
                  </ul>
                </div>
              })}


            </div>
        </div>
      </div>
    }

  },

  setCurrentUser: function(event) {
    this.setState({ currentUser: event.target.value });
  },

  login: function() {
    this.setState({ loggedIn: true });
  },

  componentDidMount: function() {
    var component = this;

    this.firebaseRef = firebase.database().ref('profiles');

    this.firebaseRef.on("child_added", (dataSnapshot) => {
      var profiles = this.state.profiles;
      profiles[dataSnapshot.key] = dataSnapshot.val();
      this.setState({profiles: profiles});
    });

    // console.table(this.state.users);
    // this.firebaseRef.on("child_removed", (dataSnapshot) => {
    //   var messages = this.state.messages;
    //   delete messages[dataSnapshot.key];
    //   this.setState({messages: messages});
    // });
    
  }

})

export default Mapp;
