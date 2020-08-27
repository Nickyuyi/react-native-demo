import {AsyncStorage} from 'react-native'

export default class DataStore {

    // 获取数据，优先获取本地数据，如果无本地数据 或本地数据过期 则获取网络数据
    fetchData(url) {
        return new Promise((resolve, reject) => {
            this.fetchLocalData(url).then(wrapData => {
                if (wrapData && DataStore.checkTimestampValid(wrapData.timestamp)) {
                    resolve(wrapData)
                } else {
                    this.fetchNetData(url).then(data => {
                        resolve(this._wrapData(data))
                    }).catch(error => {
                        reject(error)
                    })
                }
            }).catch(error => {
                // 获取本地数据出现任何问题，则获取网络数据
                this.fetchNetData(url).then(data => {
                    resolve(this._wrapData(data))
                }).catch(error => {
                    reject(error)
                })
            })
        })
    }

    // 保存数据
    saveData(url, data, callback) {
        if (!data || !url) return
        AsyncStorage.setItem(url, JSON.stringify(this._wrapData(data)), callback)
    }

    // 读取本地数据
    fetchLocalData(url) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(url, (error, result) => {
                if (!error) {
                    try { // 获取出的数据 不能解析为 json对象 处理
                        resolve(JSON.parse(result))
                    } catch(e) {
                        reject(e)
                        console.error(e)
                    }
                } else {
                    reject(error)
                    console.error(error)
                }
            })
        })
    }

    // 获取网络数据
    fetchNetData(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw new Error('Network response was not ok')
                })
                .then(responseData => {
                    this.saveData(url, responseData)
                    resolve(responseData)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    _wrapData(data) {
        return {data, timestamp: Date.now()}
    }

    // 检查timestamp 是否在有效期内
    static checkTimestampValid(timestamp) {
        const currentDate = new Date()
        const targetDate = new Date(timestamp)

        if (currentDate.getMonth() !== targetDate.getMonth()) return false
        if (currentDate.getDate() !== targetDate.getDate()) return false
        if (currentDate.getHours() - targetDate.getHours() > 4) return false // 有效期4小时
        return true
    }
}