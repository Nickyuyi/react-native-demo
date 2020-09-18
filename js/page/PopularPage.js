import React, {useEffect} from 'react'
import {View, Text, StyleSheet, RefreshControl, FlatList, ActivityIndicator} from 'react-native'
import {createAppContainer, ThemeColors} from 'react-navigation'
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'
import {connect} from 'react-redux'
import NavigationUtil from '../navigator/NavigationUtil'
import NavigationBar from '../common/NavigationBar'
import actions from '../action'
import PopularItem from '../common/PopularItem'

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
const THEME_COLOR = '#678'

// const PopularTab = props => {
//     return (
//         <View style={styles.container}>
//             <Text>PopularPage--{props.tabLabel}</Text>
//             <Button title="go Detail" onPress={() => {
//                 NavigationUtil.goPage({},'DetailPage') // 由于DetailPage 在最外层导航器中，所以只有用外层navigation才可以跳转
//             }}/>
//             <Button title="go DataStoreDemoPage" onPress={() => {
//                 NavigationUtil.goPage({}, 'DataStoreDemoPage')
//             }} />
//         </View>
//     )
// }

let canLoadMore = false // 防止初次进入页面触发 onEndReached 时调用 loadData(true)
const pageSize = 10
const PopularTab = props => {
    const {popular, tabLabel, onRefreshPopular, onLoadMorePopular} = props

    useEffect(() => {
        loadData()
    }, [])

    const _store = () => {
        return popular[tabLabel] || 
        {
            items: [], 
            pageIndex: 1,
            isLoading: false, 
            projectModes: [], // 要显示的数据
            hideLoadingMore: true // 默认隐藏加载更多
        }
    }

    const loadData = (loadMore) => {
        let store = _store()
        const url = genFetchUrl(tabLabel)
        if (loadMore) {
            onLoadMorePopular(tabLabel, ++store.pageIndex, pageSize, store.items, callback => {
                console.log(callback);
            })
        } else {
            onRefreshPopular(tabLabel, url, pageSize)
        }
    }

    const genFetchUrl = key => {
        return URL + key + QUERY_STR
    }

    const renderItem = data => {
        return <PopularItem item={data.item} onSelect={() => NavigationUtil.goPage({projectModel: data.item}, 'DetailPage')} />
    }

    const genIndicator = () => {
        return  _store().hideLoadingMore ? null :
            <View style={styles.indicatorContainer}>
                <ActivityIndicator
                    style={styles.indicator}
                />
                <Text>正在加载更多</Text>
            </View>
    }

    let store = _store()

    return (
        <View style={styles.container}>
            <FlatList
                data={store.projectModes}
                renderItem={data => renderItem(data)} // 这里的data 是store.projectModes 里面的每一个对象 被flatList拼装过后的对象 
                keyExtractor={item => item.id}
                refreshControl={
                    <RefreshControl
                        title="Loading"
                        titleColor={THEME_COLOR}
                        colors={[THEME_COLOR]} // loading 过程中的颜色
                        refreshing={store.isLoading}
                        onRefresh={() => loadData()}
                        tintColor={THEME_COLOR}
                    />
                }
                ListFooterComponent={() => genIndicator()}
                onEndReached={() => {
                    console.log('-----onEndReached-----');
                    if (canLoadMore) {
                        loadData(true) // 下拉加载更多
                        canLoadMore = false
                    }
                }}
                onEndReachedThreshold={0.5}
                onMomentumScrollBegin={() => {
                    console.log('-----onMomentumScrollBegin----');
                    canLoadMore = true // fix 初始化滚动调用 onEndReached的问题
                }}
            />
        </View>
    )
}

const genTabs = props => {
    const tabsEnum = ['Java', 'Android', 'iOS', 'React', 'React Native', 'Javascript', 'Python']
    const tabs = {}

    tabsEnum.forEach((item, index) => {
        tabs[`tab${index}`] = {
            screen: props => <PopularTabPage {...props} tabLabel={item}/>,
            navigationOptions: {
                title: item
            }
        }
    })
    return tabs
}

const PopularPage = () => {

    const TabNavigator = createAppContainer(createMaterialTopTabNavigator(genTabs(), {
        tabBarOptions: {
            tabStyle: styles.tabStyle,
            upperCaseLabel: false,
            scrollEnabled: true,
            style: {
                backgroundColor: '#678'
            },
            indicatorStyle: styles.indicatorStyle,
            labelStyle: styles.labelStyle
        }
    }))

    return (
        <View style={{flex:1}}>
            <NavigationBar
                title="最热"
                statusBar={{backgroundColor: THEME_COLOR}}
                style={{backgroundColor: THEME_COLOR}}
            />
            <TabNavigator />

        </View>
    )
}

export default PopularPage

const mapStoreToProps = state => ({
    popular: state.popular
})
const mapDispatchToProps = dispatch => ({
    onRefreshPopular: (storeName, url, pageSize) => dispatch(actions.onRefreshPopular(storeName, url, pageSize)),
    onLoadMorePopular: (storeName, pageIndex, pageSize, items, callBack) => dispatch(actions.onLoadMorePopular(storeName, pageIndex, pageSize, items, callBack))
})
const PopularTabPage = connect(mapStoreToProps, mapDispatchToProps)(PopularTab)

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 16
    },
    tabStyle: {
    },
    indicatorStyle: {
        height: 2,
        backgroundColor: '#fff'
        
    },
    labelStyle: {
        fontSize: 13,
        marginTop: 6,
        marginBottom: 6
    },
    indicatorContainer: {
        alignItems: "center"
    },
    indicator: {
        color: 'red',
        margin: 10
    }
})

