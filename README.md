# React Native Call Detector

This package is designed to detect whether there is a phone call in background while the app is in foreground.

## Install

```
yarn add react-native-call-detector
```
or
```
npm install react-native-call-detector --save
```

### Link
```
react-native link react-native-call-detector
```

## Example
```
import CallDetector from 'react-native-call-detector';

export class Example extends Component {
    componentWillMount() {
        this.callDetector = new CallDetector('call detector name', (event) => {
            const stateMap = {
                "Connected": () => {
                    console.log("Connected");
                },
                "Dialing": () => {
                    console.log("Dialing");
                },
                "Disconnected": () => {
                    console.log("Disconnected");
                },
                "Incoming": () => {
                    console.log("Incoming");
                }
            }
            stateMap[event]();
        });
    }

    componentWillUnmount() {
        this.callDetector && this.callDetector.dispose();
    }
}
```