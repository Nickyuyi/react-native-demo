import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

const FavoritePage = () => {
    return (
        <View style={styles.container}>
            <Text>FavoritePage</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 16
    }
})

export default FavoritePage