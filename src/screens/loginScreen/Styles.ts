import React from "react";
import { Platform, StyleSheet } from "react-native";




const Styles= StyleSheet.create({
    header:{ 
        flex: 1, 
        // backgroundColor: '#2d2d66', 
        justifyContent: 'flex-end',
        paddingHorizontal: 10,
        paddingBottom: 20,
    },
    footer:{
        flex: 5,
        backgroundColor: '#fff',
        paddingHorizontal: 10, 
        flexDirection: 'column', 
        paddingVertical: 30,
        // alignItems: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    inputView:{
        paddingVertical: 4,
        paddingLeft: 5,
    },
    inputType:{
        fontSize: 20, 
        fontWeight: '600', 
        color: '#666666', 
        marginTop: 10
    },
    textInput:{
        display: 'flex',
        width: 300, 
        // height: 40, 
        // borderBottomWidth: 1, 
        // borderRadius: 20, 
        // borderBottomColor: '#666666',
        fontSize: 18,
        paddingLeft: 10,
        color: '#333333',
        // backgroundColor: '#e6e6ff',
    },
    loginButton:{
        width: '100%',
        height: 50,
        backgroundColor: '#3333ff',
        borderRadius: 20,
        alignItems: 'center',
        paddingVertical: 5,
        alignSelf: 'center',
        marginTop: 20,
    },
    loginButtonText:{
        fontSize: 23,
        color: '#fff',
        fontWeight: '900',
    },
    textInputAndIconView:{
        flexDirection: 'row', 
        borderBottomWidth: 1, 
        borderBottomColor: '#c3c6c9',
        paddingBottom: 0,
    },
    title:{
        fontSize: 40, 
        fontWeight: '900', 
        color: '#fff'
    },
    
});

export default Styles;