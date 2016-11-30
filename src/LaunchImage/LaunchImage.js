import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    Dimensions
} from 'react-native';
import Tab from '../tab/tab'
const width = Dimensions.get('window').width;


export default class LaunchImage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../../images/start.jpg')} style={styles.ig}/>
            </View>
        )
    }
    componentDidMount() {
        var that = this;
        setTimeout(()=>{
            //that.props.navigator.replace({
            //    component: Tab
            //})
        },3000)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
    },
    ig:{
        width: width
    }
})

