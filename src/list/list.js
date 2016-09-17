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
    Dimensions
} from 'react-native';
const width = Dimensions.get('window').width;


export default class List extends Component {
    constructor() {
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([
                {
                    "_id": "620000200808258939",
                    "bgColor": "#0bf385",
                    "thumb": "http://dummyimage.com/1200x600/355a92",
                    "video": "https://t.alipayobjects.com/images/T1T78eXapfXXXXXXXX.mp4"
                },
                {
                    "_id": "360000201410173397",
                    "bgColor": "#562cfb",
                    "thumb": "http://dummyimage.com/1200x600/899011",
                    "video": "https://t.alipayobjects.com/images/T1T78eXapfXXXXXXXX.mp4"
                },
                {
                    "_id": "520000201003203245",
                    "bgColor": "#c25b80",
                    "thumb": "http://dummyimage.com/1200x600/db8df0",
                    "video": "https://t.alipayobjects.com/images/T1T78eXapfXXXXXXXX.mp4"
                },
            ]),
        };
    }
    renderRow(row) {
        return(
            <TouchableHighlight>
                <View style={styles.item}>
                    <Text style={styles.title}>{row._id}</Text>
                    <View style={[styles.imgBox,styles.thumb,{backgroundColor: row.bgColor}]}>
                        <Image
                            source={{url: 'http://dummyimage.com/1200x600/3907e6'}}
                            style={styles.thumb}
                        />
                    </View>
                    <View style={styles.itemFooter}>
                        <View style={styles.handleBox}>
                            <Text style={styles.handleText}>喜欢</Text>
                        </View>
                        <View style={styles.handleBox}>
                            <Text style={styles.handleText}>评论</Text>
                        </View>
                    </View>

                </View>
            </TouchableHighlight>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>列表页面</Text>
                </View>
                <ListView
                    dataSource={this.state.dataSource}
                    enableEmptySections = {true}
                    renderRow={this.renderRow.bind(this)}
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
        width:width,
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
        height: width*0.5,
    },
    itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    handleBox: {
        padding: 10,
        flexDirection: 'row',
        width: width/2 -0.5,
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    handleText: {
        fontSize: 18,
        color: '#333'
    }
}