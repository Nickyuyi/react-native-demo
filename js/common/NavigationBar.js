import React from 'react'
import {Text, StatusBar, StyleSheet, View, Platform, DeviceInfo} from 'react-native'

const NAV_BAR_HEIGHT_IOS = 44;//导航栏在iOS中的高度
const NAV_BAR_HEIGHT_ANDROID = 50;//导航栏在Android中的高度
const STATUS_BAR_HEIGHT = DeviceInfo.isIPhoneX_deprecated ? 0 : 20;//状态栏的高度

const NavigationBar = props => {
    const {style, title, titleView, titleLayoutStyle, hide, statusBar = {barStyle: 'light-content', hidden: false }, rightButton, leftButton} = props

    const getButtonElement = data => {
        return (
            <View style={styles.navBarButton}>
                {data ? data : null}
            </View>
        )

    }

    let statusBarEle = !statusBar.hidden ?
        <View style={styles.statusBar}>
            <StatusBar {...statusBar} />
        </View> : null;

    let titleViewEle = titleView ? titleView :
        <Text ellipsizeMode="head" numberOfLines={1} style={styles.title}>{title}</Text>;  // head 开头的位置显示省略号   只在一行显示超出省略号

    let contentEle = hide ? null :
        <View style={styles.navBar}>
            {getButtonElement(leftButton)}
            <View style={[styles.navBarTitleContainer, titleLayoutStyle]}>
                {titleViewEle}
            </View>
            {getButtonElement(rightButton)}
        </View>


    return (
        <View style={[styles.container, style]}>
            {statusBarEle}
            {contentEle}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2196f3'
    },
    navBarButton: {
        alignItems: 'center'
    },
    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID,
    },
    navBarTitleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 40,
        right: 40,
        top: 0,
        bottom: 0
    },
    title: {
        fontSize: 20,
        color: 'white',
    },
    statusBar: {
        height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0,
    }
})

export default NavigationBar


