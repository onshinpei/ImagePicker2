/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Dimensions,
    ActivityIndicator,
    ProgressBarAndroid,
    TouchableOpacity,
    ScrollView,
    Image,
    ListView,
    Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';
import * as Progress from 'react-native-progress';
import request from '../common/request';
import config from '../common/config';
import Button from 'react-native-button';

const width = Dimensions.get('window').width;
export default class Detail extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            data: this.props.row,
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
            paused: true,
            dataSource: ds.cloneWithRows([]),
            modalVisible: false,
            isSending: false,
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

    _play() {
        this.setState({
            paused: false,
        })
    }

    _paused() {
        this.setState({
            paused: true,
        })
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
            function(data) {
                var comments = data.data;
                if(comments && comments.length>0) {
                    that.setState({
                        comments: comments,
                        dataSource: that.state.dataSource.cloneWithRows(comments)
                    })
                }
            }
        ).catch((error) => {
            console.log(error)
        })
    }

    _renderRow(row) {
        var data = row;
        return(
            <View key={row._id} style={styles.replyBox}>
                <View style={styles.replyAvatarBox}>
                    <Image
                        style={styles.replyAvatar}
                        source={{uri: data.replyBy.avatar}}
                    />
                </View>

                <View style={styles.reply}>
                    <Text style={styles.replyNickname}>{data.replyBy.nickname}</Text>
                    <Text style={styles.replyContent}>{data.content}</Text>
                </View>
            </View>
        )
    }

    _focus() {
        this._setModalVisible(true)
    }

    _setModalVisible(isVisible) {
        this.setState({
            modalVisible: isVisible
        })
    }


    _blur() {

    }

    _closeModal() {
        this.setState({
            modalVisible: false
        })
    }

    _submit() {
        if(!this.state.content) {
            return
        }
        if(this.state.isSending) {
            alert('正在评论')
        }
        this.setState({
            isSending: true
        },function() {
            var body = {
                accessToken: 'abc',
                creation: '1323',
                content: this.state.content
            }
            var url = config.api.base + config.api.comment;
            request.post(url,body)
                .then(function(data) {
                    if(data && data.success) {

                    }
                })
        })
    }

    _renderHeader() {

        var data = this.state.data;
        return (
            <View style={styles.listHeader}>
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
                <View style={styles.commentBox}>
                    <View style={styles.contentOut}>
                        <TextInput
                            placeholder="点击评论啊"
                            style={styles.content}
                            multiline={true}
                            onFocus={this._focus.bind(this)}
                        />
                    </View>
                </View>
                <View style={styles.commentArea}>
                    <Text style={styles.commentTitle}>精彩评论</Text>
                </View>
            </View>

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
                           paused={this.state.paused}
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

                    {
                        this.state.videoReady && this.state.paused?
                            <TouchableOpacity style={styles.playBtn} activeOpacity={0.3}  onPress={this._play.bind(this)}>
                                <View style={styles.play}>
                                    <Icon name={'ios-play'} size={40} color="#900"/>
                                </View>
                            </TouchableOpacity>:null
                    }

                    {
                        this.state.videoReady && !this.state.paused?
                            <TouchableOpacity style={[styles.playBtn, styles.pausedBtn]} onPress={this._paused.bind(this)}>

                            </TouchableOpacity>:null
                    }

                    <Progress.Bar
                        borderRadius={0}
                        progress={this.state.videoProgress}
                        borderWidth={0}
                        unfilledColor="#666"
                        width={width}
                    />
                </View>


                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow.bind(this)}
                    enableEmptySections={true}
                    renderHeader={this._renderHeader.bind(this)}

                />

                <Modal
                    animationType={'fade'}
                    visible={this.state.modalVisible}
                    onRequestClose={()=>{
                        this._setModalVisible(false)
                    }}>
                    <View style={styles.modalContainer}>
                        <Icon onPress={this._closeModal.bind(this)}
                        	size={50}
                        	name={'ios-close'}
                            style={styles.closeIcon}
                        />
                        <View style={styles.commentBox}>
                            <View style={styles.contentOut}>
                                <TextInput
                                    placeholder="点击评论啊"
                                    style={styles.content}
                                    multiline={true}
                                    onFocus={this._focus.bind(this)}
                                    onBlur={this._blur.bind(this)}
                                    defaultValue={this.state.content}
                                    onChangeText={(text)=>{
                                        this.setState({
                                            content: text,
                                        })
                                    }}
                                />
                            </View>
                        </View>
                        <Button
                            onPress={this._submit.bind(this)}
                            style={styles.submitBtn}>
                            评论
                        </Button>
                    </View>
                </Modal>

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
    },


    replyBox: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 10,
    },

    replyAvatarBox: {
        width: 40,
        height: 40,
        marginRight:10,
        marginLeft: 10,
        borderRadius: 40,
        backgroundColor: '#eee'
    },
    replyAvatar: {
        width: 40,
        height: 40,
        borderRadius: 40,
    },

    replyNickname: {
        fontSize: 14,
        color: '#666'
    },
    replyContent: {
        fontSize: 12,
        color: '#666',
        marginTop: 4
    },
    playBtn: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: width,
        height: width/16*9,
        justifyContent: 'center',
        alignItems: 'center'
    },

    pausedBtn: {

    },


    listHeader: {
        width: width,
        marginTop: 10,
    },
    commentBox: {
        marginTop: 10,
        marginBottom: 10,
        padding: 8,
        width: width
    },
    contentOut: {

    },
    content: {
        color: '#333',
        borderWidth: 1,
        borderRadius: 4,
        fontSize: 14,
        borderColor: '#000',
        backgroundColor: '#eee',
        height: 60,
        padding: 2,
        textAlignVertical: 'top'
    },
    commentArea: {
        paddingBottom: 6,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop:10,
        borderBottomWidth: 1,
        borderBottomColor: '#aaa',
    },
    commentTitle: {
        fontSize: 16,
        color: 'blue'
    },

    modalContainer: {
        flex: 1,
        paddingTop: 45,
        backgroundColor: '#fff',
    },

    closeIcon: {
        alignSelf: 'center',
        color: '#ee753c'
    },

    submitBtn: {
        marginLeft: 10,
        width: width -20,
        padding: 10,
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: '#f77',
        color: 'white',
        borderWidth: 1,
        borderColor: '#ee753c',
        borderRadius: 4,
        fontSize: 18
    }


});

