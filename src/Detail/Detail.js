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
    ActivityIndicator,
    ProgressBarAndroid,
    TouchableOpacity,
    ScrollView,
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';
import * as Progress from 'react-native-progress';
import request from '../common/request';
import config from '../common/config';


const width = Dimensions.get('window').width;
export default class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rate: 1,
            muted: true, //静音
            resizeMode: 'contain', //充满情况
            repeat: false,
            videoReady: false,
            videoProgress: 0,
            videoTotal: 0,
            currentTime: 0,
            playing: false,
            playEnd: false,
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



        var duration = data.playableDuration;
        var currentTime = data.currentTime;
        var percenter = Number((currentTime/duration).toFixed(2));
        if(isNaN(percenter)) {
            return;
        }
        this.setState({
            playing: true,
            videoTotal: duration,
            currentTime: Number(currentTime.toFixed(2)),
            videoProgress: percenter,
            playEnd: false
        })
    }

    _onEnd() {
        this.setState({
            videoProgress: 1,
            playEnd: true
        })
    }

    _onError(e) {

    }

    _pop() {

    }

    _replay() {
        this.refs.videoPlayer.seek(0);
        this.setState({
            playEnd: false
        })
    }

    componentDidMount() {
        this._fetchData();
    }

    _fetchData() {
        var that = this;
        var url= config.api.base + config.api.comment;
        request.get(url, {
            id: 123,
            accessToken: '123a'
        }).then(

        )
    }

    render() {
        var data = this.props.row;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backBox} onPress={this._backToList.bind(this)}>
                        <Icon name={'ios-arrow-back'}  style={styles.backIcon} />
                        <Text style={styles.backText}>返回</Text>
                    </TouchableOpacity>
                    <Text numberOfLines={1} style={styles.headerTitle}>{data.title}</Text>
                </View>
                <Text style={styles.title}>
                    {data.title}
                </Text>
                <View style={styles.videoBox}>
                    <Video ref="videoPlayer"
                           source={{uri: data.video}}
                           style={styles.video}
                           volume={1}
                           paused={true}
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
                    {
                        this.state.playEnd ?
                            <View style={styles.replay}>
                                <Icon name={'md-refresh'} onPress={this._replay.bind(this)} size={40} color="#900"/>
                            </View>
                           :null
                    }
                    <Progress.Bar
                        borderRadius={0}
                        progress={this.state.videoProgress}
                        borderWidth={0}
                        unfilledColor="#666"
                        width={width}
                    />
                </View>
                <ScrollView
                    enableEmptySections={true}
                    showsVerticalScrollIndicator={false}
                    style={styles.scrollView}>
                    <View style={styles.infoBox}>
                        <View style={styles.avatarBox}>
                            <Image
                                style={styles.avatar}
                                source={{uri: data.author.avatar}}
                            />
                        </View>

                        <View style={styles.descBox}>
                            <Text style={styles.nickname}>{data.author.nickname}</Text>
                            <Text style={styles.authorTitle}>{data.title}</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
        backgroundColor: '#fff',
        flexDirection: 'row',
        width: width,
        height: 48,
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomWidth:1,
        borderColor: 'rgba(0,0,0,.1)',
        paddingTop:12
    },
    backBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginRight: 10,
    },
    headerTitle: {
        width: width-150,
        color: '#444',
        fontSize: 20,
    },
    backIcon: {
        marginRight: 5,
        fontSize: 24,
    },

    backText: {
        fontSize: 18,
        color: '#999'
    },

    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    videoBox: {
        width: width,
        height: width/16*9+6,
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
    },
    replay: {
        position: 'absolute',
        right: width/2-25,
        top: width/16*9/2-25,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 40,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },

    infoBox: {
        width: width,
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'center',
    },
    avatarBox: {
        width: 60,
        height: 60,
        marginRight:10,
        marginLeft: 10,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 60
    },
    descBox: {
        width: width - 90
    },
    nickname: {
      fontSize: 18,
    },
    authorTitle: {
        marginTop: 8,
        fontSize: 12,
        color:'#666'
    }
});

