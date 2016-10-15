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
      currentUser: "",
      selectedUser: "",

      loggedIn: false 
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
        <div className="create">
          <input type='text' placeholder="Create a profile" onChange={ this.setCurrentUser }/>
          <button onClick={ this.makeProfile  }>Login</button>
        </div>
      </div>

    } else {
      return <div className="theContent">
        <h1>Welcome, { this.state.currentUser }</h1>
        <div className="mainContent">
            <div className="theUsers">
              { Object.keys(this.state.profiles).map((id) => {
                var profile = this.state.profiles[id];
                // console.log(profile)
                // var maps = profile.maps;
                
                return <div key={ id } className="user">
                  <ul>
                    <li>
                    { profile.userName } 
                    { profile.userName === this.state.currentUser ? <a href="/" onClick={ this.addMap }><span className="addMap"> + </span></a> : null  }
                    </li>
                  </ul>
                </div>
              })}
            </div>
            <div className="theMap">
              { Object.keys(this.state.profiles).map((id) => {
                var profile = this.state.profiles[id];
                var maps = profile.maps;



                return <div key={ id } className="user">
                    { profile.userName === this.state.selectedUser ? 
                      
                      <ul>
                        <li>  
                          { 
                            Object.keys(maps).map((id) => {
                              var points = maps[id];
                                Object.keys(points).map((id) => {
                                //
                                var point = points[id];
                                console.log(point)
                               //
                                })
                            })
                          } 
                      </li>
                    </ul>

                      : null } 
                    
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
    this.setState({ loggedIn: true, selectedUser: this.state.currentUser });
  },

  makeProfile: function(event) {
    var newUser = this.state.currentUser;
    var newProfile = {
      userName: newUser,
      maps: ''
    };
    // console.log(event.target.value);
    //
    this.firebaseRef.push(newProfile);

    this.setState({
      loggedIn: true
    })
  },

  getMap: function() {
    
  },

  componentDidMount: function() {
    var component = this;

    this.firebaseRef = firebase.database().ref('profiles');

    this.firebaseRef.on("child_added", (dataSnapshot) => {
      var profiles = this.state.profiles;
      profiles[dataSnapshot.key] = dataSnapshot.val();
      this.setState({profiles: profiles});
      // console.log(profiles)
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
