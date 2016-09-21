import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    PixelRatio,
    TouchableOpacity,
    Image,
    Platform,
    Navigator
} from 'react-native';

import Tab from '../tab/tab'

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
             <Navigator
             initialRoute = {{name: 'list',component: Tab,}}
             configureScene={(route, routeStack) =>Navigator.SceneConfigs.FloatFromRight}
             renderScene={(route, navigator)=>{
                     var Compenent = route.component;
                     return <Compenent {...route.params} navigator={navigator}/>
                 }
             }
             />
        )
    }
}







