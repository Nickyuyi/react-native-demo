import React, {PureComponent} from 'react'
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {WebView} from 'react-native-webview'
import NavigationBar from '../common/NavigationBar'
import BackPressComponent from '../common/BackPressComponent'
import NavigationUtil from '../navigator/NavigationUtil'
import ViewUtil from '../util/ViewUtil'

const TRENDING_URL = 'https://github.com/'

const THEME_COLOR = '#678'

export default class DetailPage extends PureComponent {
    constructor(props) {
        super(props)

        const {projectModel} = props.navigation.state.params
        this.state = {
            isFavorite: false,
            canGoBack: false,
            url: projectModel.html_url || TRENDING_URL + projectModel.fullName,
            title: projectModel.full_name || projectModel.fullName
        }
        this.webviewRef = React.createRef()
        this.backPress = new BackPressComponent({backPress: this.onBackPress})
    }

    componentDidMount() {
        this.backPress.componentDidMount()
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount()
    }

    onBackPress = () => {
        this.onBack()
        return true
    }

    onBack = () => {
        if (this.state.canGoBack) {
            this.webviewRef.current.goBack()  // webview 内进入了多层页面，可以goBack
        } else {
            NavigationUtil.goBack(this.props.navigation) // webview 没有页面可以返回了，走导航的返回
        }
    }

    onFavoriteButtonClick = () => {
        this.setState({isFavorite: !this.state.isFavorite})
    }

    onShareButtonClick = () => {
        // let shareApp = share.share_app;
        // ShareUtil.shareboard(shareApp.content, shareApp.imgUrl, this.url, shareApp.title, [0, 1, 2, 3, 4, 5, 6], (code, message) => {
        //     console.log("result:" + code + message);
        // });
    }

    onNavigationStateChange = navState => {
        this.setState({
            canGoBack: navState.canGoBack,
            url: navState.url
        })
    }

    renderRightButton = () => {
        return (
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => this.onFavoriteButtonClick()}>
                    <FontAwesome
                        name={this.state.isFavorite ? 'star' : 'star-o'}
                        size={20}
                        style={{color: 'white', marginRight: 10}}
                    />
                </TouchableOpacity>
                {ViewUtil.getShareButton(this.onShareButtonClick)}
            </View>
        )
    }

    render() {
        const titleLayoutStyle = this.state.title.length > 20 ? {paddingRight: 30} : null
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={this.state.title}
                    leftButton={ViewUtil.getLeftBackButton(this.onBack)}
                    rightButton={this.renderRightButton()}
                    style={{backgroundColor: THEME_COLOR}}
                    titleLayoutStyle={titleLayoutStyle}
                />
                <WebView
                    ref={this.webviewRef}
                    startInLoadingState={true}
                    onNavigationStateChange={this.onNavigationStateChange}  // 导航状态改变时
                    source={{uri: this.state.url}} 
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

