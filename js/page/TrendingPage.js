import React, {useRef, useState, useEffect} from 'react'
import {View, Text, StyleSheet, Button, TouchableOpacity, DeviceEventEmitter} from 'react-native'
import {connect} from 'react-redux'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import actions from '../action'
import NavigationBar from '../common/NavigationBar'
import TrendingDialog from '../common/TrendingDialog'

const THEME_COLOR = '#678'
const EVENT_TYPE_TIME_SPAN_CHANGE = 'EVENT_TYPE_TIME_SPAN_CHANGE'

const TrendingPage = props => {
    const [curTime, setCurTime] = useState('今天')
    const dialogRef = useRef()

    useEffect(() => {
        const timeSpanChangeListener = DeviceEventEmitter.addListener(EVENT_TYPE_TIME_SPAN_CHANGE, timeSpan => {
            
        })
        return () => {
            timeSpanChangeListener.remove()
        }
    }, [])

    const renderTitleView = () => {
        return (
            <TouchableOpacity underlayColor="transparent" onPress={() => dialogRef.current.show()} >
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>趋势 {curTime}</Text>
                    <MaterialIcons name="arrow-drop-down" size={22} style={{color: '#fff'}} />
                </View>
            </TouchableOpacity>
        )
    }

    const onSelectTimeSpan = tab => {
        dialogRef.current.dismiss()
        setCurTime(tab)

        // 事件发生器
        DeviceEventEmitter.emit(EVENT_TYPE_TIME_SPAN_CHANGE, tab)
    }

    return (
        <View>
            <NavigationBar
                titleView={renderTitleView()}
                statusBar={{backgroundColor: THEME_COLOR}}
                style={{backgroundColor: THEME_COLOR}}
            />
            <Text>TrendingPage</Text>
            <Button title="改变主题颜色" onPress={() => props.onThemeChange('#096')} />
            <TrendingDialog ref={dialogRef} onSelect={onSelectTimeSpan} />
        </View>
    )
}

const styles = StyleSheet.create({
    titleView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 18,
        color: '#fff',
    }
})

const mapDispatchToProps = dispatch => ({
    onThemeChange: theme => dispatch(actions.onThemeChange(theme))
})
export default connect(() => ({}), mapDispatchToProps)(TrendingPage)