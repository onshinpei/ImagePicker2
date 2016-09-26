/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const width = Dimensions.get('window').width;



export default class Account extends Component {
    constructor(props) {
        super(props);
        var user = this.props.user || {};
        this.state = {
            user: user,
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>我的账户</Text>
                </View>

                <TouchableOpacity style = {styles.avatarContainer}>
                    <View style = {styles.avatarBox}>
                        <Image
                            source = {{uri: this.state.user.avator}}
                            style = {styles.avator}
                        />
                    </View>
                    <Text style = {styles.avatarTip}>更换头像</Text>
                </TouchableOpacity>

                <View style = {styles.avatarContainer}>
                    <Text style = {styles.avatarTip}>添加头像</Text>
                    <TouchableOpacity style = {styles.avatarBox}>
                        <Icon
                            name = {'md-cloud-upload'}
                            style = {styles.plusIcon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    avatarContainer: {
        width: width,
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eee'
    },
    avatarBox: {
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#aaa'
    },
    plusIcon: {
        color: '#999',
        fontSize: 60,
    },
    avator: {
        width: 60,
        height: 60,
        backgroundColor: '#f00'
    }
});


