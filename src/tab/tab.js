import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    StatusBar,
    Navigator
} from 'react-native';
import Intro from '../intro/intro';
import ImagePicker from '../imagePicker/imagePicker';
import List from '../list/list';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import Login from '../account/login';
import Account from '../account/acount';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/Ionicons';
import MyCenter from '../account/myCenter';

class Tabbar extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    _onPressTab(tab,i) {
        this.props.changeTip(tab);
        this.props.goToPage(i);
    }
    _renderTab(tab,i) {
        let color = this.props.activeTab == i ? '#ee735c': '#888';
        let icons = this.props.tabIconNames;
        return (
            <TouchableOpacity
                onPress = {this._onPressTab.bind(this,tab,i)}
                style = {styles.tab}>
                <View style = {styles.tabBox}>
                    <View style = {styles.tabIconBox}>
                        <Icon style = {[styles.tabIcon, {color: color}]} name = {icons[tab]} />

                    </View>
                    <Text style = {{color: color,fontSize: 10, textAlign: 'center'}}>{tab}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    render() {
        var that = this;
        return (
            <View style = {styles.tabs}>
                <StatusBar
                    backgroundColor='#ee735c'
                    translucent={false}
                    hidden={false}
                    animated={true}
                    color = '#fff'
                />
                {this.props.tabs.map((tab,i)=>{
                    return this._renderTab(tab,i)
                })}
            </View>
        )
    }
}

export default class Tab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabTip: {'我的':true,'列表':true,'上传':true},
            tabIconNames: {'首页': 'md-home','我的':'md-contact','列表':'md-list-box','上传':'md-cloud-upload'}
        }
    }
    _changeTip(tab) {
        //var tabTip = tabThis.state.tabTip;
        //tabTip[tab] = false;
        //tabThis.setState({
        //    tabTip: tabTip
        //})
    }
    render() {

        return <ScrollableTabView
            tabBarBackgroundColor = '#f1f1f1'
            tabBarPosition = 'bottom'
            tabBarUnderlineStyle = {{borderWidth: 2,borderColor : 'red'}}
            renderTabBar={() => <Tabbar tabIconNames = {this.state.tabIconNames} tabTip = {this.state.tabTip} changeTip = {this._changeTip}/>}>
            <MyCenter tabLabel="首页" user = {this.props.user} navigator={this.props.navigator} />
            <Account user = {this.props.user}  navigator={this.props.navigator} logout = {this.props.logout} tabLabel='我的'/>
            <List tabLabel='列表' navigator={this.props.navigator} />
            <ImagePicker tabLabel='上传'/>
        </ScrollableTabView>
    }
}

const styles = {
    tabs: {
        flexDirection: 'row',
        height: 55,
        borderTopWidth: 1,
        borderColor: '#ddd'
    },
    tab: {
        flex: 1,
    },
    tabBox: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    tabIconBox: {

    },
    tabTip: {
        width: 8,
        height: 8,
        backgroundColor: 'red',
        position: 'absolute',
        top: 0,
        right: 0,
        borderRadius: 8,
    },
    tabIcon: {
        fontSize: 30,
    }
}