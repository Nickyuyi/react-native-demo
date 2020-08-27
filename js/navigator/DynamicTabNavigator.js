import React, {useRef, useEffect} from 'react'
import {createAppContainer} from 'react-navigation'
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import IonIcons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import {connect} from 'react-redux'
import PopularPage from '../page/PopularPage'
import FavoritePage from '../page/FavoritePage'
import TrendingPage from '../page/TrendingPage'
import MyPage from '../page/MyPage'

const TABS = {
    PopularPage: {
        screen: PopularPage,
        navigationOptions: {
            tabBarLabel: '最热',
            tabBarIcon: ({tintColor, focused}) => (
                <MaterialIcons name={'whatshot'} size={26} style={{color: tintColor}} />
            )
        }
    },
    TrendingPage: {
        screen: TrendingPage,
        navigationOptions: {
            tabBarLabel: '趋势',
            tabBarIcon: ({tintColor, focused}) => (
                <IonIcons name={'md-trending-up'} size={26} style={{color: tintColor}} />
            )
        }
    },
    FavoritePage: {
        screen: FavoritePage,
        navigationOptions: {
            tabBarLabel: '收藏',
            tabBarIcon: ({tintColor, focused}) => (
                <MaterialIcons name={'favorite'} size={26} style={{color: tintColor}} />
            )
        },
    },
    MyPage: {
        screen: MyPage,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({tintColor, focused}) => (
                <Entypo name={'user'} size={26} style={{color: tintColor}} />
            )
        }
    },
}
const DynamicTabNavigator = props => {
    const {PopularPage, TrendingPage, FavoritePage, MyPage} = TABS
    const tabRef = useRef()
    // 动态配置 tab项
    const tabs = {PopularPage, TrendingPage, FavoritePage, MyPage}

    const genTab = () => {
        // if (tabRef.current) return tabRef.current
        return tabRef.current = createAppContainer(createBottomTabNavigator(tabs, {
            tabBarComponent: tabProp => {
                return <BottomTabBar {...tabProp} activeTintColor={props.theme} />
            }
        }))
    }
    const Tab = genTab()
    return <Tab />
}

const mapStateToProps = state => ({
    theme: state.theme.theme,
})

export default connect(mapStateToProps)(DynamicTabNavigator)