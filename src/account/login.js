
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
} from 'react-native';
import Button from 'react-native-button';
import request from '../common/request';
import config from '../common/config';


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            codeSent: false,
        }
    }

    _submit() {

    }
    _showVerifyCode() {

    }
    _sendVerifyCode() {
        var that = this;
        var phoneNumber = this.state.phoneNumber;
        if(!phoneNumber) {
            alert('手机号不能为空')
        }
        var body = {
            phoneNumber: phoneNumber
        }
        var signupUrl = config.api.base + config.api.signup;
        request.post(signupUrl, body)
            .then((data) => {
                if(data && data.success) {
                    that._showVerifyCode()
                }else{
                    alert('获取验证码失败');
                }
            })
            .catch((err) => {

            })
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.signupBox}>
                    <Text style={styles.title}>快速登录</Text>
                    <TextInput
                        placeholder="输入手机号"
                        autoCaptialize={'none'}
                        autoCorrect={false}
                        keyboardType={'numeric'}
                        style={styles.inputField}
                        onChangeText={(text)=>{
                            this.setState({
                                phoneNumber: text
                            })
                        }}
                    />
                    {
                        this.state.codeSent?
                            <Button
                                style={styles.btn}
                                onPress={this._submit.bind(this)}>登录
                             </Button>:
                            <Button containerStyle={styles.btnContainer} style={styles.btn}
                                onPress={this._sendVerifyCode.bind(this)}>获取验证码</Button>
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f9f9f9'
    },
    signupBox: {
        marginTop: 30,
    },
    title: {
        marginBottom: 20,
        color: '#333',
        fontSize: 20,
        textAlign: 'center'
    },
    inputField: {
        flex: 1,
        height: 40,
        padding: 5,
        color: '#666',
        fontSize: 16,
        backgroundColor: '#fff',
        borderRadius: 4,
    },
    btnContainer: {
        marginTop: 10,
        padding: 10,
        backgroundColor: 'transparent',
        borderRadius: 4,

        borderWidth: 1,
        borderColor: '#ee735c',
    },
    btn: {
        color: '#ee735c',
    }
});


