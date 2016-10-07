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
import commonStyle from './commonStyle';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Lists extends Component {
    constructor(props) {
        super(props);
        var lists = this.props.rows;
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2)=> r1 != r2});
        this.state = {
            dataSource: ds.cloneWithRows(lists),
        }
    }
    _renderRow(row) {
        var noBorderBottom = null;
        if(row.lastOne) {
            noBorderBottom = {borderBottomWidth: 0}
        }
        return (
            <TouchableOpacity onPress = {()=>this.props.toListInfo(row)} style={[styles.simpleItemBox]}>
                <View style={[styles.simpleItem, styles.borderBottom,noBorderBottom]}>
                    <Icon style={styles.simpleIcon} name={row.icon}/>
                    <Text style={styles.simpleTitle}>{row.title}</Text>
                    <View style={styles.simpleRight}>
                        <Text style={styles.simpleNum}>0</Text>
                        <Icon style={styles.forward} name={'ios-arrow-forward'}/>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    render() {
        //配置listView渲染配置

        var listsRenderOptions = this.props.listsRenderOptions? this.props.listsRenderOptions : {};
        var hasBorderBottom = listsRenderOptions.removeBorderBottom? false: true;
        var hasBorderTop = listsRenderOptions.removeBorderTop? false: true;
        return (
            <View style = {[styles.listsBox,hasBorderBottom?commonStyle.borderBottom:null, hasBorderTop?commonStyle.borderTop:null]}>
                <ListView
                    dataSource={this.state.dataSource}
                    enableEmptySections={true}
                    renderRow={this._renderRow.bind(this)}
                    renderHeader = {listsRenderOptions.rederHeaderFn?listsRenderOptions.rederHeaderFn:null}
                />
            </View>
        )
    }
}

const styles = {
    //列表box
    listsBox: {
        marginTop: 10,
    },
    simpleItemBox: {
        backgroundColor: '#fff'
    },
    simpleItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        marginHorizontal: 12,
    },
    simpleIcon: {
        color: '#ee735c',
        fontSize: 20,
    },
    simpleTitle: {
        fontSize: 15,
        marginLeft: 15,
        color: '#555'
    },
    simpleRight: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    simpleNum: {
        marginRight: 10,
        color: '#888'
    },
}
