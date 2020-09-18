import React, {PureComponent} from 'react'
import {Modal, Text, TouchableOpacity, StyleSheet, View, DeviceInfo} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
const TIME_OPTIONS = ['今天', '本月', '本周']

export default class TrendingDialog extends PureComponent {
    state = {
        visible: false
    }

    dismiss = () => {
        this.setState({visible: false})
    }

    show = () => {
        this.setState({visible: true})
    }

    render() {
        return (
            <Modal
                transparent={true}
                visible={this.state.visible}
                onRequestClose={this.props.onClose}
            >
                <TouchableOpacity style={styles.container} onPress={this.dismiss}>
                    <MaterialIcons name="arrow-drop-up" size={36} style={styles.arrow} />
                    <View style={styles.content}>
                        {
                            TIME_OPTIONS.map((item, index) => (
                                <TouchableOpacity underlayColor='transparent' onPress={() => this.props.onSelect(item)}>
                                    <View style={StyleSheet.text_container}>
                                        <Text style={styles.text}>{item}</Text>
                                        {index !== TIME_OPTIONS.length -1 && <View style={styles.line} />}
                                    </View>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        flex: 1,
        alignItems: 'center',
        paddingTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0
    },
    arrow: {
        marginTop: 40,
        color: 'white',
        padding: 0,
        margin: -15
    },
    content: {
        backgroundColor: 'white',
        borderRadius: 3,
        paddingTop: 3,
        paddingBottom: 3,
        marginRight: 3,
    },
    text_container: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    text: {
        fontSize: 16,
        color: 'black',
        fontWeight: '400',
        padding: 8,
        paddingLeft: 26,
        paddingRight: 26
    },
    line: {
        height: 0.3,
        backgroundColor: 'darkgray',
    },
});