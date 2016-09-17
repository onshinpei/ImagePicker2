import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Alert
} from 'react-native';
import AppIntro from 'react-native-app-intro';

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
        padding: 15,
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    imgStyle: {
        height: 80 * 2.5,
        width: 109 * 2.5,
    }
});

export default class Intro extends Component {
    onSkipBtnHandle = (index) => {
        Alert.alert('Skip');
        console.log(index);
    }
    doneBtnHandle = () => {
        Alert.alert('Done');
    }
    nextBtnHandle = (index) => {
        Alert.alert('Next');
        console.log(index);
    }
    onSlideChangeHandle = (index, total) => {
        console.log(index, total);
    }
    render() {
        return (
            <AppIntro
                onNextBtnClick={this.nextBtnHandle}
                onDoneBtnClick={this.doneBtnHandle}
                onSkipBtnClick={this.onSkipBtnHandle}
                onSlideChange={this.onSlideChangeHandle}
                doneBtnLabel = '进入>>'
            >
                <View style={[styles.slide,{ backgroundColor: '#fa931d' }]}>
                    <View level={10}>
                        <Image source={require('../../images/0.png')} style={styles.imgStyle} />
                    </View>
                    <View level={15}><Text style={styles.text}>Page 1</Text></View>
                    <View level={8}><Text style={styles.text}>Page 1</Text></View>
                </View>
                <View style={[styles.slide, { backgroundColor: '#a4b602' }]}>
                    <View level={-10}>
                        <Image source={require('../../images/1.png')} style={styles.imgStyle} />
                    </View>
                    <View level={5}><Text style={styles.text}>Page 2</Text></View>
                    <View level={20}><Text style={styles.text}>Page 2</Text></View>
                </View>
                <View style={[styles.slide,{ backgroundColor: '#fa931d' }]}>
                    <View level={8}><Text style={styles.text}>Page 3</Text></View>
                    <View level={0}><Text style={styles.text}>Page 3</Text></View>
                    <View level={-10}><Text style={styles.text}>Page 3</Text></View>
                </View>
                <View style={[styles.slide, { backgroundColor: '#a4b602' }]}>
                    <View level={5}><Text style={styles.text}>Page 4</Text></View>
                    <View level={10}><Text style={styles.text}>Page 4</Text></View>
                    <View level={15}><Text style={styles.text}>Page 4</Text></View>
                </View>
            </AppIntro>
        );
    }
}
