import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    StatusBar,
} from 'react-native';
import ImagePicker from '../imagePicker/imagePicker';
import List from '../list/list';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';

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
            <ImagePicker tabLabel='上传'/>
            <List tabLabel='列表'/>
            <Text tabLabel='Tab #3'>project</Text>
        </ScrollableTabView>
    }
}

const styles = {
    tab: {
        height: 0,
    }
}