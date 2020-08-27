import React from 'react';
import { View, Text, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

class HomeScreen extends React.Component {
  // static navigationOptions = {
  //   title: 'Home',
  //   headerStyle: { // 定制home 页面的 header样式
  //     backgroundColor: '#f4511e',
  //   },
  //   headerTintColor: '#fff',
  //   headerTitleStyle: {
  //     fontWeight: 'bold',
  //     color: 'blue'
  //   },
  // };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button title="go detail" onPress={() => this.props.navigation.navigate('Detail', {id:111})} />
        <Button title="go about" onPress={() => this.props.navigation.navigate('About')} />
      </View>
    );
  }
}

class DetailScreen extends React.Component {
  state = {
    count: 1
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: () => <Button title="title"/>,  // 自定义头
      headerRight: () => <Button title="count++" onPress={navigation.getParam('increaseCount')}/>
    }
  }

  increaseCount = () => {
    this.setState({count: this.state.count+1})
  }

  componentDidMount() {
    this.props.navigation.setParams({'increaseCount': this.increaseCount})
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>count --- {this.state.count}</Text>
        <Text>Detail Screen ---{this.props.navigation.getParam('id')}</Text>
        <Button color="red" title="go back" onPress={() => this.props.navigation.goBack()} />
      </View>
    );
  }
}

const AboutScreen = props => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>About Screen</Text>
      <Button title="back home" onPress={() => props.navigation.popTopTop()} />
    </View>
  )
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerShown: true,
    }
  },
  Detail: DetailScreen,
  About: AboutScreen
}, {
  // initialRouteName: 'Detail',  
  defaultNavigationOptions: {  // 定制导航器内所有页面的 header样式
    headerStyle: { 
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  },
});

export default createAppContainer(AppNavigator);