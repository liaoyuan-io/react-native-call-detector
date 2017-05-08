#React Native Call Detector

This package is designed to detect whether there is a phone call in background while the app is in foreground.

```
import CallDetector from 'react-native-call-detector';

export class Example extends Component {
    componentWillMount() {
        this.callDetector = new CallDetector('call detector name', (event) => {
            {
                "Connected"   : ()=>{
                    console.log("Connected");
                },
                "Dialing"     : ()=>{
                    console.log("Dialing");
                },
                "Disconnected": ()=>{
                    console.log("Disconnected");
                },
                "Incoming"    : ()=>{
                    console.log("Incoming");
                }
            }[event]();
        });
    }

    componentWillUnmount() {
        this.callDetector && this.callDetector.dispose();
    }
}
```