import React, {useEffect} from 'react'
import {View, Text, StyleSheet} from 'react-native'

const WelcomePage = props => {

    useEffect(() => {
        const timer = setTimeout(() => {
            props.navigation.navigate('Main')
        }, 200)

        return () => {
            timer && clearTimeout(timer)
        }
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.text}>WelcomePage</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    text: {
        fontSize: 16,
        color: 'red'
    }
})

export default WelcomePage