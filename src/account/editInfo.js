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
    BackAndroid,
    Modal
} from 'react-native';
import Lists from './lists';
import Icon from 'react-native-vector-icons/Ionicons';
const width = Dimensions.get('window').width;

export default class EditInfo extends Component {
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
            modalVisible: false,
        }
    }

    _backToList() {
        this.props.navigator.pop();
    }
    _toListInfo() {

    }
    _onRequestClose() {

    }
    _renderHeaderA() {
        return (
            <View>
                <Text>常规设置</Text>
            </View>
        )
    }
    render() {
        var title = this.props.title;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backBox} onPress={this._backToList.bind(this)}>
                        <Icon name={'ios-arrow-back'}  style={styles.backIcon} />
                        <Text style={styles.backText}>返回</Text>
                    </TouchableOpacity>
                    <Text numberOfLines={1} style={styles.headerTitle}>{title}</Text>
                </View>
                <Lists rederHeaderFn = {this._renderHeaderA.bind(this)} rows = {this.state.oneLists} user = {this.state.user} toListInfo = {this._toListInfo.bind(this)}/>


                <Modal
                    visible = {this.state.modalVisible}
                    transparent = {true}
                    onRequestClose = {this._onRequestClose.bind(this)}
                    animationType = {'slide'}>
                   <Text>111</Text>
                </Modal>
            </View>


        )
    }
}
const styles = {
    container: {
        flex: 1,
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
}