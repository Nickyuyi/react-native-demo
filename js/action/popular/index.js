import Types from '../types'
import DataStore from '../../expand/dao/DataStore'

// 下拉刷新
export function onRefreshPopular(storeName, url, pageSize) {
    return dispatch => {
        dispatch({type: Types.POPULAR_REFRESH, storeName})
        let dataStore = new DataStore()
        dataStore.fetchData(url)
            .then(data => {
                handleData(dispatch, storeName, data, pageSize)
            })
            .catch(error => {
                console.log(error)
                dispatch({
                    type: Types.POPULAR_REFRESH_FAIL,
                    storeName,
                    error
                })
            })
    }
}

// 加载更多
export function onLoadMorePopular(storeName, pageIndex, pageSize, dataArray = [], callBack) {
    return dispatch => {
        setTimeout(() => { // 模拟网络请求
            if ((pageIndex - 1) * pageSize >= dataArray.length) { // 上次已加载完全部数据
                if (typeof callBack === 'function') {
                    callBack('no more')
                }
                dispatch({
                    type: Types.POPULAR_LOAD_MORE_FAIL,
                    error: 'no more',
                    storeName,
                    pageIndex: --pageIndex,
                    projectModes: dataArray
                })
            } else {
                // 本次载入的最大数量
                let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageIndex * pageSize
                dispatch({
                    type: Types.POPULAR_LOAD_MORE_SUCCESS,
                    storeName,
                    pageIndex,
                    projectModes: dataArray.slice(0, max)
                })
            }
        }, 500)
    }
}

// 处理下拉刷新数据
function handleData(dispatch, storeName, data, pageSize) {
    let fixItems = []
    if (data && data.data && data.data.items) {
        fixItems = data.data.items
    }

    dispatch({
        type: Types.POPULAR_REFRESH_SUCCESS,
        projectModes: pageSize > fixItems.length ? fixItems: fixItems.slice(0, pageSize), // 第一次要加载的数据
        storeName,
        pageIndex: 1,
        items: data.data.items
    })
}