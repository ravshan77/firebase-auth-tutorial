import React,{ Component } from "react" 
import './App.css';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from "firebase"

firebase.initializeApp({
  apiKey : "AIzaSyCANSSjdi5KaXENRuTvaLcORHxD2FCeazA",
  authDomain:"fir-auth-tutorial-66538.web.app"
})

class App extends React.Component {
state = { isSingnedIn: false}
uiConfig = {
  signInFlow : "popup",
  signInOptions:[
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
  ],
  callbacks : {
    signInSuccess : () => false,
  }
}

componentDidMount = () => {
  firebase.auth().onAuthStateChanged(user => {
    this.setState({isSingnedIn : !! user})
    console.log("user ", user)
  })
}

  render() {

    return (
      <div className="App">
      {this.state.isSingnedIn ? (
        <>
        <div>Singned in</div>
        <button onClick={()=> firebase.auth().signOut()}>go back</button>
        <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
        <img src={firebase.auth().currentUser.photoURL} />
        <p>{firebase.auth().currentUser.metadata.creationTime}</p>
        <h3>Your email: {firebase.auth().currentUser.email}</h3>
        <h3>P hone Number: {firebase.auth().currentUser.phoneNumber}</h3>
        
        </>
        ) : (
          <StyledFirebaseAuth
          uiConfig={this.uiConfig}
          firebaseAuth= {firebase.auth()} />
          )}
    </div>
  );
}
}

export default App;
