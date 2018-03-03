import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import {
  NotificationsAndroid,
  PendingNotifications,
} from 'react-native-notifications';

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
        <Button
          onPress={this.onPressClick}
          title="Send a local notification"
          color="#78ff9b"
        />
      </View>
    );
  }

  onPressClick() {
    this.onSendNotification('This is a first notification!');
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
});

AppRegistry.registerComponent('WixRNNotifications', () => App);
