import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    PixelRatio,
    TouchableOpacity,
    Image,
    Platform
} from 'react-native';

import Intro from '../intro/intro';

import Tab from '../tab/tab'

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Tab />
        )
    }
}







