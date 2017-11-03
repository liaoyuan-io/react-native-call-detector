/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import CallDetector from 'react-native-call-detector';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
    state = {
        callState: 'Init'
    };

    componentWillMount() {
        this.callDetector = new CallDetector('call detector name', (event) => {
            const stateMap = {
                "Connected": () => {
                    this.setState({callState: "Connected"});
                    console.log("Connected");
                },
                "Dialing": () => {
                    this.setState({callState: "Dialing"});
                    console.log("Dialing");
                },
                "Disconnected": () => {
                    this.setState({callState: "Disconnected"});
                    console.log("Disconnected");
                },
                "Incoming": () => {
                    this.setState({callState: "Incoming"});
                    console.log("Incoming");
                }
            }
            stateMap[event]();
        });
    }

    componentWillUnmount() {
        this.callDetector && this.callDetector.dispose();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
                <Text style={styles.instructions}>
                    Call state: {this.state.callState}
                </Text>
                <Text style={styles.instructions}>
                    {instructions}
                </Text>
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
});
