import React from 'react';
import {connect} from 'react-redux';
import {
  AppRegistry,
  TextInput,
  StyleSheet,
  View,
  Button,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
} from 'native-base';
import {
  NotificationsAndroid,
  PendingNotifications,
} from 'react-native-notifications';
import TextInputMask from 'react-native-text-input-mask';

import store from './store';

export class ApplicationContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};

    this.onSendNotification = this.onSendNotification.bind(this);
    this.onCancelNotification = this.onCancelNotification.bind(this);
    this.onPressClick = this.onPressClick.bind(this);
  }

  render() {
    const props = this.props;
    const items = ['List item1', 'List item2'];

    return (
      <Container>
        <Header><Text>{props.testValue}</Text></Header>
        <Content>
          <View style={styles.container}>
            <View style={styles.innerContainer}>
              <List dataArray={items}
                    renderRow={(item) =>
                      <ListItem onPress={this.onChangeValue}>
                        <Text>{item}</Text>
                      </ListItem>
                    }>
              </List>
              <TextInput
                style={styles.fieldInput}
                placeholder='Login'
                onChangeText={(login) => this.setState({login: login})}/>
              <TextInput
                style={styles.fieldInput}
                placeholder='Password'
                secureTextEntry={true}
                onChangeText={(password) => this.setState({password: password})}/>
              <TextInputMask
                onChangeText={(formatted, extracted) => this.setState({phoneValue: extracted})}
                style={styles.fieldInput}
                placeholder={'Phone'}
                mask={"+1 ([000]) [000] [00] [00]"}
              />
              <Button
                onPress={this.onPressClick}
                title="Send a local notification"
                color="#78ff9b"
              />
            </View>
          </View>
        </Content>
      </Container>
    );
  }

  onChangeValue() {
    store.dispatch({type: 'increment', data: 100});
  }

  onPressClick() {
    this.onSendNotification(`Login: ${this.state.login}, password: ${this.state.password}, phone: ${this.state.phoneValue}`);
  }

  onSendNotification(text) {
    this.notificationId = NotificationsAndroid.localNotification({title: 'Test notification', body: text});
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
    height: 44,
    fontSize: 22,
    lineHeight: 22,
  },
});

AppRegistry.registerComponent('WixRNNotifications', () => ApplicationContainer);

export const ApplicationContainerWrapper = connect((state) => ({...state.auth}), {})(ApplicationContainer);
