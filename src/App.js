import React, { Component } from 'react'
import { View } from 'react-native'
import { Header, Button, Spinner } from './components/common'
import LoginForm from './components/LoginForm'
import firebase from 'firebase'

class App extends Component {
  state = { loggedIn: null }

  componentWillMount() {
    var config = {
      apiKey: 'xxxxxxxxxxxxxx',
      authDomain: 'reactnativeauth-95c98.firebaseapp.com',
      databaseURL: 'https://reactnativeauth-95c98.firebaseio.com',
      projectId: 'reactnativeauth-95c98',
      storageBucket: '',
      messagingSenderId: 'xxxxxxx'
    };
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged((user)=>{
      if(user) {
        this.setState({loggedIn: true})
      }else{
        this.setState({loggedIn: false})
      }
    })
  }

  renderContent() {
    switch(this.state.loggedIn) {
      case true:
        return(
          <Button onPress={()=>firebase.auth().signOut()}>
            Log Out
          </Button>
        )
      case false:
        return <LoginForm />
      default:
        return <Spinner size={"large"}/>
    }
  }

  render() {
    return(
      <View>
        <Header headerText="Authentication"/>
        {this.renderContent()}
      </View>
    )
  }
}

export default App
