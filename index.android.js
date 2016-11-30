import React, { Component } from 'react';
import {
    AppRegistry,
    View,
    Text
} from 'react-native';
import App from './src/app/app';

class ImagePicker2 extends Component {
    render() {
        return(
            <App/>
        )
    }
}
AppRegistry.registerComponent('ImagePicker2', () => ImagePicker2);