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
    StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
import request from '../common/request'
import config from '../common/config';
const width = Dimensions.get('window').width;

export default class Account extends Component {
    constructor(props) {
        super(props);
        var user = this.props.user || {};
        this.state = {
            user: user,
            avatarProgress: 0,
            avatarUploading: false,
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
                if(user && user.accessToken) {
                    that.setState({
                        user: user
                    })
                }
            })
    }
    _getQiniuToken(accessToken) {
        var signatureUrl = config.api.baseLocal + config.api.signature

        return request.post(signatureUrl, {
            accessToken: accessToken,
            cloud: 'qiniu'
        }).catch((e)=>{
            console.log(e)
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
            var uri = res.uri;
            var accessToken = this.state.user.accessToken;
            that._getQiniuToken(accessToken)
                .then((data) => {
                    //console.log(data)
                    var token = data.data.token;
                    var key = data.data.key;
                    var body = new FormData();

                    body.append('token', token);
                    body.append('key', key);
                    body.append('file', {
                        type: 'image/jpg',
                        uri: uri,
                        name: key
                    });
                    that._upload(body)
                })
            var avartarData = 'data:image/png;base64,' + res.data;
            var user = that.state.user;
            user.avatar = avartarData;
            that.setState({
                user: user
            })

        });
    }
    _upload(body) {
        var that = this;
        var xhr = new XMLHttpRequest;
        var url = config.qiniu.uploadUrl;
        this.setState({
            avatarUploading: true,
            avatarProgress: 0,
        })
        xhr.open('POST', url);
        xhr.onload = ()=>{
            if(xhr.status != 200) {
                alert('请求失败')
            }
            if(!xhr.responseText) {
                alert('responseText错误')
            }
            var response;
            try{
                response= JSON.parse(xhr.response)
            }catch (e) {
                console.log('JSON.parse出错')
            }
            if(response) {
                var user = this.state.user;
                user.avatar = config.qiniu.myhost + '/'+ response.key;
                var updateUri = config.api.baseLocal + config.api.update
                request.post(updateUri, {
                    accessToken: user.accessToken,
                    avatar: user.avatar
                }).then((data)=>{
                    if(data.success) {
                         AsyncStorage.getItem('user')
                            .then((userStr)=>{
                                var oldUser = JSON.parse(userStr)
                                oldUser.avatar = user.avatar;
                                AsyncStorage.setItem('user', JSON.stringify(oldUser))
                            });
                    }
                })
            }
            this.setState({
                avatarUploading: false,
                avatarProgress: 0,
                user: user
            })
        }
        xhr.upload.onprogress = (event) => {
            if(event.lengthComputable) {
                var percent = Number((event.loaded/event.total).toFixed(2));
                that.setState({
                    avatarProgress: percent
                })
            }
        }
        xhr.send(body)
    }
    render() {
        var user = this.state.user
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>我的账户</Text>
                    <Text onPress = {this.props.logout}>退出</Text>
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


