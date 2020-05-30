import React from 'react';
import { View, Text } from 'react-native';

export default function About(){
    return(
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#1CF2FF",
        }}>
            <Text>
                About Screen
            </Text>
        </View>
    );
}