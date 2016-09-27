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
    AsyncStorage,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';

const width = Dimensions.get('window').width;

const CLOUDINARY = {
    'cloud_name': 'dikcmipba',
    'api_key': '858444152876838',
    'api_secret': '_mfJM5RV81DFjqJlJQBOzt5PaCs',
    'base': 'http://res.cloudinary.com/dikcmipba',
    image: 'https://api.cloudinary.com/v1_1/dikcmipba/image/upload',
    video: 'https://api.cloudinary.com/v1_1/dikcmipba/video/upload',
    audio: 'https://api.cloudinary.com/v1_1/dikcmipba/audio/upload',
}

export default class Account extends Component {
    constructor(props) {
        super(props);
        var user = this.props.user || {};
        this.state = {
            user: user,
        }
    }
    //读取user
    componentDidMount() {
        var that = this;
        AsyncStorage.getItem('user')
            .then((data) => {

                var user;
                if(data) {
                    user = JSON.parse(data)
                }
                console.log(user)
                if(user && user.accessToken) {
                    that.setState({
                        user: user
                    })
                }
            })
    }

    _changeAvatar() {
        var that = this;
        var options ={
            title: '选择图片',
            takePhotoButtonTitle: '点击拍摄',
            chooseFromLibraryButtonTitle: '本地选择',
            cancelButtonTitle: '取消',
            noData: false,
        }
        ImagePicker.showImagePicker(options, (res)  => {
            if(res.didCancel) {
                return;
            }

            var avartarData = 'data:image/png;base64,' + res.data;
            var user = that.state.user;
            user.avatar = avartarData;
            that.setState({
                user: user
            })


        });
    }

    render() {
        var user = this.state.user
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>我的账户</Text>
                </View>
                <TouchableOpacity onPress={this._changeAvatar.bind(this)} style = {styles.avatarContainer}>
                    <Image source = {{uri: user.avatar}} style = {styles.avatarContainer}>
                        <View style = {styles.avatarBox}>
                            <Image
                                source = {{uri: user.avatar}}
                                style = {styles.avatar}
                            />
                        </View>
                        <Text style = {styles.avatarTip}>更换头像</Text>
                    </Image>
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

    },
    avatarBox: {
        width: width,
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',

    },
    plusIcon: {
        color: '#999',
        fontSize: 60,
    },
    avatar: {
        width: 60,
        height: 60,
        resizeMode: 'cover',
        borderRadius: 30
    },
    avatarTip: {
        color: '#aaa',
        backgroundColor: 'transparent',
        fontSize: 14,
    }
});


