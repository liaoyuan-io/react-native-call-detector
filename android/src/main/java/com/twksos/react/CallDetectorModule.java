package com.twksos.react;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.telephony.TelephonyManager;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.ArrayList;

class CallReceiver extends BroadcastReceiver {
    CallDetectorModule detectorModule;

    CallReceiver(CallDetectorModule detectorModule) {
        this.detectorModule = detectorModule;
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        this.detectorModule.notifyCallStateChange(TelephonyManager.EXTRA_STATE);
    }
}

public class CallDetectorModule extends ReactContextBaseJavaModule {

    CallReceiver callReceiver;

    public CallDetectorModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "RCTCallDetector";
    }

    private static ArrayList<CallDetectorModule> modules = new ArrayList<>();

    @Override
    public void initialize() {
        super.initialize();
        modules.add(this);
    }

    @Override
    public void onCatalystInstanceDestroy() {
        super.onCatalystInstanceDestroy();
        modules.remove(this);
    }

    @ReactMethod
    public void startListener() {
        if (this.callReceiver == null) {
            this.callReceiver = new CallReceiver(this);
        }
    }

    void notifyCallStateChange(String state) {
        ReactApplicationContext context = getReactApplicationContext();
        DeviceEventManagerModule.RCTDeviceEventEmitter emitter = context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);

        if (state.equals(TelephonyManager.EXTRA_STATE_IDLE) || state.equals(TelephonyManager.EXTRA_STATE_OFFHOOK)) { 
            emitter.emit("Disconnected", null); 
        }
        if (state.equals(TelephonyManager.EXTRA_STATE_RINGING)) emitter.emit("Disconnected", null);
    }
}