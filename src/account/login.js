
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
import Unit from '../common/unit'
import {CountDownText} from 'react-native-sk-countdown'
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //验证码发出，显示输入框
            codeSent: false,
            //codeValid  验证码是否有效
            codeValid: false,
            //手机号是否有效
            phoneValid: false,
            verifyCode: null,
            //是否进行倒计时
            countingDone: false,
        }
    }

    _submit() {

    }
    _showVerifyCode() {
        this.setState({
            codeSent: true,
        })
    }

    _onChangeText(text) {
        this.setState({
            phoneNumber: text
        },function() {
            //获取号码后的回调
            var phoneNumber = this.state.phoneNumber;
            if(!Unit.isPhone(phoneNumber)) {
                this.setState({
                    phoneValid: false,
                    codeSent: false,
                    codeValid: false,
                })
            }else{
                this.setState({
                    phoneValid: true,
                })
            }
        })

    }

    _onChangeVerifyCode(verifyCode) {
        this.setState({
            verifyCode: verifyCode,
        }, function() {
            var verifyCode = this.state.verifyCode;
            if(Unit.isVerifyCode(verifyCode)) {
                this.setState({
                    codeValid: true
                })
            }else{
                this.setState({
                    codeValid: false
                })
            }
        })
    }


    //发送获取验证码请求
    _sendVerifyCode() {
        if(!this.state.phoneValid) {
            return;
        }
        var that = this;
        var phoneNumber = this.state.phoneNumber;
        var body = {
            phoneNumber: phoneNumber
        }
        var signupUrl = config.api.baseLocal + config.api.signup;
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

    _submit() {
        if(!this.state.phoneValid || !this.state.codeValid) {
            alert('请输入有效的验证码')
            return;
        }
        var that = this;
        var phoneNumber = this.state.phoneNumber;
        var verifyCode = this.state.verifyCode;
        var body = {
            phoneNumber: phoneNumber,
            verifyCode: verifyCode,
        }

        var signupUrl = config.api.baseLocal + config.api.verify;
        request.post(signupUrl, body)
            .then((data) => {
                if(data && data.success) {
                    that.props.afterLogin(data.data)
                }else{
                    alert('登录失败');
                }
            })
            .catch((err) => {

            })
    }


    _countingDone() {
        this.setState({
            countingDone: true
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
                        onChangeText={this._onChangeText.bind(this)}
                    />
                    {
                        this.state.codeSent?
                            <View style={styles.verifyCodeBox}>
                                 <TextInput
                                    placeholder="输入验证码"
                                    autoCaptialize={'none'}
                                    autoCorrect={false}
                                    keyboardType={'numeric'}
                                    style={styles.inputField}
                                    onChangeText={this._onChangeVerifyCode.bind(this)}
                                />
                                {
                                    <CountDownText
                                    countType='seconds' // 计时类型：seconds / date
                                    auto={false} // 自动开始
                                    afterEnd={() => {this._countingDone.bind(this)}} // 结束回调
                                    timeLeft={60} // 正向计时 时间起点为0秒
                                    step={-1} // 计时步长，以秒为单位，正数则为正计时，负数为倒计时
                                    startText='获取验证码' // 开始的文本
                                    endText='获取验证码' // 结束的文本
                                    intervalText={(sec) => sec + '秒重新获取'} // 定时的文本回调
                                    style={styles.countBtn}
                                    />
                                }

                            </View>
                            :null
                    }

                    {
                        this.state.codeSent?
                            <Button
                                containerStyle={[styles.btnContainer,this.state.codeValid ? styles.validBtnContainer:null]}
                                style={[styles.btn, this.state.codeValid ? styles.validBtn:null ]}
                                onPress={this._submit.bind(this)}>登录
                             </Button>:
                            <Button
                                containerStyle={[styles.btnContainer,this.state.phoneValid ? styles.validBtnContainer:null]}
                                style={[styles.btn, this.state.phoneValid ? styles.validBtn:null ]}
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
        borderColor: '#ccc',
    },
    validBtnContainer: {
        borderColor: '#ee735c',
    },
    btn: {
        color: '#ccc',
    },
    validBtn: {
        color: '#ee735c',
    },
    //验证码框
    verifyCodeBox: {
        marginTop: 10,
        flexDirection: 'row'
    },
    countBtn: {
        width: 110,
        padding: 10,
        marginLeft: 8,
        borderColor: '#ee735c',
        color: 'white',
        backgroundColor: '#ee735c'
    }
});


