import {Text, View} from 'react-native';
import React, {Component} from 'react';
import SplashScreen from 'react-native-splash-screen';

export default class App extends Component {
  componentDidMount(): void {
    SplashScreen.hide();
  }
  render() {
    return (
      <View>
        <Text>App</Text>
      </View>
    );
  }
}
