import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import IonIcons from 'react-native-vector-icons/Ionicons'
import NavigationBar from '../common/NavigationBar'

const THEME_COLOR = '#678'

const MyPage = () => {

    const getRightButton = () => {
        return (
                <TouchableOpacity style={{padding: 5, marginRight: 8}}>
                    <Feather name="search" size={24} style={{color: 'white'}} />
                </TouchableOpacity>
        )
    }

    const getLeftButton = () => {
        return (
            <TouchableOpacity style={{padding: 8, marginLeft: 12}}>
                <IonIcons name="ios-arrow-back" size={26} style={{color: 'white'}} />
            </TouchableOpacity>
        )
    }


    return (
        <View >
            <NavigationBar
                title="我的"
                statusBar={{backgroundColor: THEME_COLOR}}
                style={{backgroundColor: THEME_COLOR}}
                leftButton={getLeftButton()}
                rightButton={getRightButton()}
            />
            <Text>MyPage</Text>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default MyPage