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
import Login from '../account/login'

export default class Tab extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return <ScrollableTabView
            tabBarBackgroundColor = '#f1f1f1'
            tabBarUnderlineStyle = {styles.tab}
            tabBarPosition = 'bottom'
            renderTabBar={() => <DefaultTabBar />}>
            <Login tabLabel="登录页" />
            <ImagePicker tabLabel='上传'/>
            <List tabLabel='列表' navigator={this.props.navigator} />
            <Intro tabLabel='介绍'/>
        </ScrollableTabView>
    }
}

const styles = {
    tab: {
        height: 0,
    }
}