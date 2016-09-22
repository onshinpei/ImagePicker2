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
    Dimensions,
    ActivityIndicator
} from 'react-native';
import Video from 'react-native-video';


const width = Dimensions.get('window').width;
export default class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rate: 1,
            muted: true, //静音
            resizeMode: 'contain', //充满情况
            repeat: false,
            videoReady: false
        }
    }
    _backToList() {
        this.props.navigator.pop();
    }
    _onLoadStart() {

    }

    _onLoad() {

    }

    _onProgress(data) {
        if(!this.state.videoReady) {
            this.setState({
                videoReady: true
            })
        }
    }

    _onEnd() {

    }

    _onError(e) {
        console.log(e)
    }

    render() {
        var data = this.props.row;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome} onPress={this._backToList.bind(this)}>
                    {data.title}
                </Text>
                <View style={styles.videoBox}>
                    <Video ref="VideoPlayer"
                           source={{uri: data.video}}
                           style={styles.video}
                           volume={1}
                           paused={false}
                           rate={this.state.rate}
                           muted={this.state.muted}
                           resizeMode={this.state.resizeMode}
                           repeat={this.state.repeat}

                           onLoadStart={this._onLoadStart.bind(this)}
                           onLoad = {this._onLoad.bind(this)}
                           onProgress = {this._onProgress.bind(this)}
                           onError = {this._onError.bind(this)}
                           onEnd = {this._onEnd.bind(this)}
                    />

                    {
                        !this.state.videoReady && <ActivityIndicator
                            color="#ee735c" style={styles.loading} size={50}
                        />
                    }

                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    videoBox: {
        width: width,
        height: width/16*9,
        backgroundColor: '#000'
    },
    video: {
        width: width,
        height: width/16*9,
    },
    loading: {
        position: 'absolute',
        top: 0,
        width: width,
        height: width/16*9,
        backgroundColor: 'transparent'
    }
});

