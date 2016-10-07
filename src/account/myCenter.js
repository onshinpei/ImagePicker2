/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    AsyncStorage,
    ListView,
    Platform,
    BackAndroid
} from 'react-native';
import MyDetail from './myDetail'
import ListDetail from './listDetail'
import Icon from 'react-native-vector-icons/Ionicons';
import Lists from './lists';

export default class MyCenter extends Component {
    constructor(props) {
        super(props);
        var oneLists = [
            {
                icon: 'ios-chatbubbles',
                title: '公开文章',
                num: 3
            },
            {
                icon: 'ios-basket',
                title: '私密文章',
                num: 3
            },
            {
                icon: 'ios-boat',
                title: '我的收藏',
                num: 3
            },
            {
                icon: 'md-heart',
                title: '喜欢的文章',
                num: 3,
                lastOne: true
            },
        ]
        var user = this.props.user;
        this.state = {
            user: user,
            oneLists: oneLists,
        }
    }

    componentDidMount() {
        var that = this;
        AsyncStorage.getItem('user')
            .then((data)=> {
                var user = JSON.parse(data);
                that.setState({
                    user: user
                })
            });
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }
    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    onBackAndroid = () => {
        const navigator = this.props.navigator;
        const routers = navigator.getCurrentRoutes();
        console.log('当前路由长度：'+routers.length);
        if (routers.length > 1) {
            navigator.pop();
            return true;//接管默认行为
        }
        return false;//默认行为

    };
    _toMyInfo(user) {
        this.props.navigator.push({
            name: 'MyDetail',
            component: MyDetail,
            params: {
                user: user,
            }
        })
    }

    _toListInfo(row) {
        this.props.navigator.push({
            name: 'ListDetail',
            component: ListDetail,
            params: {
                row: row,
            }
        })
    }

    render() {
        var that = this
        var avatar = this.state.user.avatar;
        var nickname = this.state.user.nickname;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>我的账户</Text>
                </View>
                <TouchableOpacity onPress = {this._toMyInfo.bind(this,this.state.user)} style={styles.myInfoBox}>
                    <View style={[styles.myInfo, styles.borderBottom]}>
                        <Image style={styles.myAvatar} source={{uri: avatar}}/>
                        <Text style={styles.nickname}>{nickname}</Text>
                        <Icon style={[styles.toMyInfo,styles.forward]} name={'ios-arrow-forward'}/>
                    </View>
                </TouchableOpacity>
                <Lists rows = {this.state.oneLists} user = {this.state.user} toListInfo = {this._toListInfo.bind(this)}/>
                <Lists rows = {this.state.oneLists} toListInfo = {this._toListInfo.bind(this)}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(251,251,251)',
    },
    header: {
        flexDirection: 'row',
        paddingTop: 12,
        paddingBottom: 12,
        backgroundColor: '#ee735c',
    },
    headerTitle: {
        flex: 1,
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '600'
    },
    myInfoBox: {
        padding: 0,
    },
    myInfo: {
        backgroundColor: '#fff',
        padding: 12,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderColor: '#eee'
    },
    borderTop: {
        borderTopWidth: 1,
        borderColor: '#eee'
    },
    myAvatar: {
        width: 60,
        height: 60,
        borderRadius: 60,
    },
    nickname: {
        marginLeft: 20,
        fontSize: 18
    },
    toMyInfo: {
        flex: 1,
        textAlign: 'right',
    },
    forward: {
        fontSize: 20,
        marginRight: 5,
        color: '#888'
    },

});

