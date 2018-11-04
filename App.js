/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TextInput,TouchableHighlight,Dimensions} from 'react-native';
import {Root} from "./src/Root";
import {Provider} from'react-redux';
import {index} from "./src/store/index";
import {Fonts} from "./src/utils/Fonts";


const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
    render() {
        return (
           <Provider store={index}>
                <Root/>
           </Provider>
        );
    }
}
