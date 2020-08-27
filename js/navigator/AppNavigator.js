import {
    createSwitchNavigator,
    createAppContainer
} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator, createMaterialTopTabNavigator} from 'react-navigation-tabs'
import {connect} from 'react-redux'
import {createReactNavigationReduxMiddleware, createReduxContainer} from 'react-navigation-redux-helpers'
import WelcomePage from '../page/WelcomePage'
import HomePage from '../page/HomePage'
import DetailPage from '../page/DetailPage'
import DataStoreDemoPage from '../page/DataStoreDemoPage'
export const rootCom = 'Init' // 根路由

const InitNavigator = createStackNavigator({
    WelcomePage: {
        screen: WelcomePage,
        navigationOptions: {
            headerShown: false
        }
    }
})

const MainNavigator = createStackNavigator({
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            headerShown: false
        }
    },
    DetailPage: DetailPage,
    DataStoreDemoPage
})

export const RootNavigator = createAppContainer(createSwitchNavigator({
    Init: InitNavigator,
    Main: MainNavigator,
}))

// 1.初始化react-navigation 与 redux 中间件
// 该方法的一个很大的作用就是为 createReduxContainer 的key 设置 actionSubscribers（行为订阅者）
export const middleware = createReactNavigationReduxMiddleware(state => state.nav, 'root')

// 2.将根导航器组件传递给 createReduxContainer
const AppWithNavigationState = createReduxContainer(RootNavigator, 'root')

const mapStateToProps = state => ({
    state: state.nav,//v2
});

// 3.连接 React 组件与 Redux store
export default connect(mapStateToProps)(AppWithNavigationState);