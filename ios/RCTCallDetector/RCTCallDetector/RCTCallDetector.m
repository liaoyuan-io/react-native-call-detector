//
//  RCTCallDetector.m
//  RCTCallDetector
//
//  Created by WeiGuangcheng on 2/28/17.
//  Copyright © 2017 Liaoyuan. All rights reserved.
//
#import "RCTCallDetector.h"

@implementation RCTCallDetector

@synthesize bridge = _bridge;

- (NSDictionary *)constantsToExport
{
    return @{
             @"Incoming"    : @"Incoming",
             @"Dialing"     : @"Dialing",
             @"Disconnected": @"Disconnected",
             @"Incoming"    : @"Incoming"
             };
}

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(startListener)
{
    
    NSDictionary *eventNameMap = @{
                                   CTCallStateConnected    : @"Connected",
                                   CTCallStateDialing      : @"Dialing",
                                   CTCallStateDisconnected : @"Disconnected",
                                   CTCallStateIncoming     : @"Incoming"
                                   };
    
    _callCenter = [[CTCallCenter alloc] init];
    
    [_callCenter setCallEventHandler:^(CTCall *call) {
        [self.bridge.eventDispatcher sendAppEventWithName:@"EventPhoneCallChange"
                                                     body:[eventNameMap objectForKey: call.callState]];
    }];

}
@end
