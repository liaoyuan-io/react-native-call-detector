//
//  RCTCallDetector.h
//  RCTCallDetector
//
//  Created by WeiGuangcheng on 2/28/17.
//  Copyright © 2017 Liaoyuan. All rights reserved.
//

#if __has_include("RCTBridgeModule.h")
    #import "RCTBridgeModule.h"
    #import "RCTEventDispatcher.h"
#else
    #import <React/RCTBridgeModule.h>
    #import <React/RCTEventDispatcher.h>
#endif
#import <Foundation/Foundation.h>
#import <CoreTelephony/CTCallCenter.h>
#import <CoreTelephony/CTCall.h>

@interface RCTCallDetector : NSObject <RCTBridgeModule>

@property(nonatomic, strong) CTCallCenter *callCenter;

@end
