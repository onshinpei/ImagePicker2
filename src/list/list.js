import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    TouchableHighlight,
    Text,
    StatusBar,
    ListView,
    Image,
    Dimensions,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import request from '../common/request';
import config from '../common/config';

var cachedResults = {
    nextPage: 1,
    items: [],
    total: 0
}

const width = Dimensions.get('window').width;


class Item extends Component {
    constructor(props) {
        super(props)
        this.state = {
            row : props.row
        }
    }
    render() {
        var row = this.state.row;
        return (
            <TouchableHighlight>
                <View style={styles.item}>
                    <Text style={styles.title}>{row.title}</Text>
                    <View style={[styles.imgBox,styles.thumb]}>
                        <Image
                            source={{uri: row.thumb}}
                            style={styles.thumb}
                        />
                    </View>
                    <View style={styles.itemFooter}>
                        <View style={styles.handleBox}>
                            <Icon name={'ios-thumbs-up-outline'} size={22} color="#900"/>
                            <Text style={styles.handleText}>喜欢</Text>
                        </View>

                        <View style={styles.handleBox}>
                            <Icon name={'ios-text-outline'} size={22} color="#900"/>
                            <Text style={styles.handleText}>评论</Text>
                        </View>
                    </View>

                </View>
            </TouchableHighlight>
        )
    }
}



export default class List extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([]),
            isLoadingTail: false,
            isRefreshing: false
        };
    }

    renderRow(row) {
        return <Item row = {row}/>
    }

    componentDidMount() {
        this._fetchData(1);
    }

    _hasMore() {
        return cachedResults.items.length != cachedResults.total
    }
    _fetchData(page) {
        var _this = this;

        if(page == 0) {
            this.setState({
                isRefreshing: true
            })
        }else{
            this.setState({
                isLoadingTail: true
            })
        }


        request.get(config.api.base + config.api.creations,{
            accessToken: 'abc',
            page: page
        })
            .then((data) => {

                setTimeout(function() {
                    if(data.success) {
                        var items = cachedResults.items;
                        if(page == 0) {
                            items = data.data
                        }else{
                            items = items.concat(data.data);
                            cachedResults.nextPage += 1;
                        }
                        cachedResults.items = items;
                        cachedResults.total = data.total;
                        if(page == 0) {
                            _this.setState({
                                isRefreshing: false,
                                dataSource: _this.state.dataSource.cloneWithRows([]) //解决无法刷新
                            })
                            _this.setState({
                                dataSource: _this.state.dataSource.cloneWithRows(cachedResults.items)
                            })
                        }else{
                            _this.setState({
                                isLoadingTail: false,
                                dataSource: _this.state.dataSource.cloneWithRows(cachedResults.items)
                            })
                        }
                    }

                },1000)

            })
            .catch((error) => {
                if(page == 0) {
                    this.setState({
                        isRefreshing: false
                    })
                }else{
                    this.setState({
                        isLoadingTail: false
                    })
                }
                console.error(error);
            });
    }


    _fetchMoreData() {
        if(!this._hasMore()|| this.state.isLoadingTail) {
            return;
        }
        var page = cachedResults.nextPage;
        this._fetchData(page);


    }

    _onRefresh() {
        if(this.state.isRefreshing) {
            return;
        }

        this._fetchData(0);



    }
    _renderFooter() {
        if(!this._hasMore() && cachedResults.total!=0) {
            return(
                <View style={styles.loadingMore}>
                    <Text style={styles.loadingText}>没有更多了</Text>
                </View>
            )
        }
        if(!this.state.isLoadingTail) {
            return(
                <View style={styles.loadingMore}></View>
            )
        }
        return <ActivityIndicator style={styles.loadingMore} size="large"
        />
    }

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>列表页面</Text>
                </View>
                <ListView
                    dataSource={this.state.dataSource}
                    enableEmptySections={true}
                    renderRow={this.renderRow.bind(this)}
                    onEndReached = {this._fetchMoreData.bind(this)}
                    onEndReachedThreshold = {20}
                    renderFooter = {this._renderFooter.bind(this)}
                    refreshControl = {
                        <RefreshControl
                            refreshing = {this.state.isRefreshing}
                            colors = {['red', 'blue']}
                            onRefresh = {this._onRefresh.bind(this)}
                            tintColor='#ff6600'
                            title='拼命加载中'
                         />
                    }
                />
            </View>
        )
    }
}


const styles = {
    container: {
        flex: 1,
        backgroundColor: '#f5fcff'
    },
    header: {
        paddingTop: 12,
        paddingBottom: 12,
        backgroundColor: '#ee735c'
    },
    headerTitle: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '600'
    },
    item: {
        width: width,
        marginBottom: 10,
        backgroundColor: '#fff'
    },
    title: {
        padding: 10,
        fontSize: 18,
        color: '#333'
    },
    thumb: {
        width: width,
        height: width * 0.56,
    },
    itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    handleBox: {
        padding: 10,
        flexDirection: 'row',
        width: (width / 2) - 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    handleText: {
        paddingLeft: 5,
        fontSize: 18,
        width: 60,
        color: '#333'
    },
    loadingMore: {
        marginTop: 10,
        marginBottom: 20,
    },
    loadingText: {
        color: '#777',
        textAlign: 'center'
    }
}