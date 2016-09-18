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
import Icon from 'react-native-vector-icons/Ionicons';
import request from '../common/request';
import config from '../common/config';

const width = Dimensions.get('window').width;
export default class List extends Component {
    constructor() {
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([]),
        };
    }

    renderRow(row) {
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

    componentDidMount() {
        this._fetchData();
    }

    _fetchData() {
        request.get(config.api.base + config.api.creations,{

        })
            .then((data) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(data.data)
                })
            })
            .catch((error) => {
                console.error(error);
            });
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
    }
}