import React, {useState, useRef} from 'react'
import {StyleSheet, Text, Button, View, TextInput} from 'react-native'
import DataStore from '../expand/dao/DataStore'

export default () => {
    const [showText, setShowText] = useState()
    const inputRef = useRef()

    const loadData = () => {
        let url = `https://api.github.com/search/repositories?q=${inputRef.current}`;
        new DataStore().fetchData(url)
            .then(data => {
                let showData = `初次数据加载时间：${new Date(data.timestamp)}\n${JSON.stringify(data.data)}`;
                setShowText(showData)
            })
            .catch(error => {
                error && console.log(error.toString());
            })

    }

    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>离线缓存框架设计</Text>
            <TextInput
                style={styles.input}
                onChangeText={text => inputRef.current = text}
            />
            <Button title="获取" onPress={loadData}/>
            <Text>{showText}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    input: {
        height: 30,
        borderColor: 'black',
        borderWidth: 1
    },
});