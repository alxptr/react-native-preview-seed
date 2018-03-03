import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  TextInput,
  View,
  Button,
} from 'react-native';
import {
  NotificationsAndroid,
  PendingNotifications,
} from 'react-native-notifications';
import { TextMask, TextInputAdapter } from 'react-text-mask-hoc/ReactNative';

const phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.onSendNotification = this.onSendNotification.bind(this);
    this.onCancelNotification = this.onCancelNotification.bind(this);
    this.onPressClick = this.onPressClick.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <TextInput
            style={styles.fieldInput}
            placeholder='Login'
            onChangeText={(login) => this.setState({login: login})}/>
          <TextInput
            style={styles.fieldInput}
            placeholder='Password'
            secureTextEntry={true}
            onChangeText={(password) => this.setState({password: password})}/>
          <TextMask
            Component={TextInputAdapter}
            value={this.state.phoneValue}
            mask={phoneMask}
            placeholder={'Phone'}
            guide={false}
            onChange={(event) => this.setState({phoneValue: event.text})}
            style={styles.fieldInput}
            maxLength={phoneMask.length}/>
          <Button
            onPress={this.onPressClick}
            title="Send a local notification"
            color="#78ff9b"
          />
        </View>
      </View>
    );
  }

  onPressClick() {
    this.onSendNotification(`Login: ${this.state.login}, password: ${this.state.password}`);
  }

  onSendNotification(text) {
    this.notificationId = NotificationsAndroid.localNotification({ title: 'Test notification', body: text });
  }

  onCancelNotification() {
    if (this.notificationId) {
      NotificationsAndroid.cancelLocalNotification(this.notificationId);
      this.notificationId = null;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    width: '50%',
  },
  fieldInput: {
    width: '100%',
    height: 48,
    fontSize: 24,
    lineHeight: 24,
  },
});

AppRegistry.registerComponent('WixRNNotifications', () => App);
