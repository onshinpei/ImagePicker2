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
    Dimensions,
    Platform,
    BackAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from 'react-native-button';
import commonStyle from './commonStyle';
import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';
import EditInfo from './editInfo';

const width = Dimensions.get('window').width;
//detail页
export default class MyDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    _backToList() {
        this.props.navigator.pop();
    }
    _editInfo(user) {
        this.props.navigator.push({
            name: 'EditInfo',
            component: EditInfo,
            params: {
                user: user,
                title: '编辑个人资料'
            }
        })
    }
    render() {
        var user = this.props.user;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backBox} onPress={this._backToList.bind(this)}>
                        <Icon name={'ios-arrow-back'}  style={styles.backIcon} />
                        <Text style={styles.backText}>返回</Text>
                    </TouchableOpacity>
                    <Text numberOfLines={1} style={styles.headerTitle}>{user.nickname}</Text>
                </View>
                <View style = {[styles.primaryInfo,commonStyle.borderBottom]}>
                    <Image style = {styles.avatar} source = {{uri: user.avatar}} />
                    <Text style = {styles.nickname}>{user.nickname}</Text>
                    <Text style = {styles.hasLoveNum}>写了0个字   获得0个喜欢</Text>
                    <Button onPress = {this._editInfo.bind(this, user)} containerStyle = {styles.editInfoBtnCon}  style = {styles.editInfoBtn}>
                        编辑个人资料
                    </Button>
                </View>
                <View style = {styles.myStates}>
                    <ScrollableTabView
                        renderTabBar={() => <DefaultTabBar />}>
                        <Text tabLabel='动态'>动态</Text>
                        <Text tabLabel='文章'>文章</Text>
                        <Text tabLabel='更多'>更多</Text>
                    </ScrollableTabView>
                </View>
            </View>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 12,
        textAlign: 'left',
        margin: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width,
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomWidth:1,
        borderColor: 'rgba(0,0,0,.1)',
        paddingVertical: 12,
        backgroundColor: '#ee735c',
    },
    backBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    headerTitle: {
        width: width-150,
        color: '#fff',
        fontSize: 20,
    },
    backIcon: {
        marginRight: 5,
        fontSize: 24,
        color: '#fff'
    },

    backText: {
        fontSize: 18,
        color: '#fff'
    },
    primaryInfo: {
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'rgb(251,251,251)',
        width: width,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 80,
        marginVertical: 5,
    },
    nickname: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 5,
        color: '#555'
    },
    hasLoveNum: {
        marginVertical: 5,
        fontSize: 14,
        color: '#888'
    },
    editInfoBtn: {
        color: 'rgb(95,200,80)',
        fontWeight: 'normal'
    },
    editInfoBtnCon: {
        borderWidth: 1,
        borderColor: 'rgb(95,200,80)',
        borderRadius: 3,
        paddingVertical: 3,
        paddingHorizontal: 6,
        marginVertical: 5,
    },
    myStates: {
        flex: 1,
        width: width,

    }
}