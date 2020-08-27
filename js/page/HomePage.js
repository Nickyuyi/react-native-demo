import React, {useEffect} from 'react'
import {BackHandler} from 'react-native'
import {connect} from 'react-redux'
import {NavigationActions} from 'react-navigation'
import NavigationUtil from '../navigator/NavigationUtil'
import DynamicTabNavigator from '../navigator/DynamicTabNavigator'


const HomePage = props => {
    NavigationUtil.navigation = props.navigation // 保存外层的 navigation

    // 处理 Android 中的物理返回键（不处理的话 按物理返回 会直接退出程序）
    const onBackPress = () => {
        console.log(props.nav.routes);
        if (props.nav.routes[1].index === 0) return false //如果RootNavigator中的MainNavigator的index为0，则不处理返回事件
        props.dispatch(NavigationActions.back())
        return true // 返回true 安卓就不会处理物理返回，我们自己处理
    }

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', onBackPress)
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', onBackPress)
        }
    }, [])

    return (
        <DynamicTabNavigator />
    )
}

const mapStateToProps = state => ({
    nav: state.nav
})
export default connect(mapStateToProps)(HomePage)