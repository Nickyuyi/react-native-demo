import React from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'
import {connect} from 'react-redux'
import actions from '../action'

const TrendingPage = props => {
    return (
        <View style={styles.container}>
            <Text>TrendingPage</Text>
            <Button title="改变主题颜色" onPress={() => props.onThemeChange('#096')} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 16
    }
})

const mapDispatchToProps = dispatch => ({
    onThemeChange: theme => dispatch(actions.onThemeChange(theme))
})
export default connect(() => ({}), mapDispatchToProps)(TrendingPage)