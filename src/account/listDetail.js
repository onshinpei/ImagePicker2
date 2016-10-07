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
    WebView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const width = Dimensions.get('window').width;
//detail页
export default class ListDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    _backToList() {
        this.props.navigator.pop();
    }
    render() {
        var row = this.props.row;
        const DEFAULT_URL= 'm.jd.com';
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backBox} onPress={this._backToList.bind(this)}>
                        <Icon name={'ios-arrow-back'}  style={styles.backIcon} />
                        <Text style={styles.backText}>返回</Text>
                    </TouchableOpacity>
                    <Text numberOfLines={1} style={styles.headerTitle}>{row.title}</Text>
                </View>
                <WebView style={styles.webview_style}
                         source={{uri: 'https://www.jd.com'}}
                         javaScriptEnabled={true}
                         domStorageEnabled={true}
                         decelerationRate="normal"
                         startInLoadingState={true}
                         automaticallyAdjustContentInsets={false}
                >
                </WebView>
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
    webview_style: {
        flex: 1,
        width: width
    }
}
