import React from 'react';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    stack: {
        flex: 1,
        overflow: "hidden",
        shadowColor: "#FFF",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 5,
    },

    menuButton: {
        backgroundColor: "black",
        padding: 5,
        marginLeft: 10,
        borderRadius: 5,
    },

    profileInfos: {
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        marginLeft: 24,
    },

    profileInfosText: {
        fontWeight: "bold",
        fontSize: 19,
        marginLeft: 17,
        color: "white",
    },
    menuItemList:{
        marginTop:  150,
    },

    menuItem: {
        marginLeft: 16,
        marginTop: 10,
    },

    menuItemText: {
        marginLeft: -13,
        color: "#E6E5E8",
    },

    drawerStyles: { flex: 1,  width:"70%", backgroundColor: "#FF4F5B" },
});