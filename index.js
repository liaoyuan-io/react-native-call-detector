'use strict';

import { NativeModules } from 'react-native';
import { NativeAppEventEmitter } from 'react-native';

const NativeCallDetector = NativeModules.CallDetector;
NativeCallDetector.startListener();

class CallDetector {
    static listeners = {};

    name;
    subscription;

    constructor(name, callback) {
        if(CallDetector.listeners[name]) CallDetector.listeners[name].dispose();
        CallDetector.listeners[name] = this;
        this.subscription = NativeAppEventEmitter.addListener('EventPhoneCallChange', callback);
    }

    dispose() {
        if(this.subscription) this.subscription.remove();
        delete CallDetector.listeners[this.name];
    }
}

export default module.exports = CallDetector;