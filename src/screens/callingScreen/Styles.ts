import {StyleSheet} from 'react-native';

const Styles = StyleSheet.create({
    page:{
        height: '100%',
        backgroundColor: '#0739',
    },
    cameraPreview:{
        flex: 1,
        alignItems: 'center',
        padding: 10,
        paddingHorizontal: 10,
    },
    remoteVideo:{
        // width: "100%",
        // height: '100%',
        backgroundColor: '#473348',
        // borderRadius: 10,
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        zIndex: 0,
    },
    localVideo:{
        width: 100,
        height: 150,
        backgroundColor: '#234597',
        borderRadius: 10,
        position: 'absolute',
        right: 10,
        top: 80,
        zIndex: 1,
    },
    name:{
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        // marginTop: 10,
        // marginBottom: 10,
    },
    phoneNumber:{
        fontSize: 20,
        fontWeight: 'normal',
        color: '#fff',
    },
    backButton:{
        // width: 30,
        // marginTop: 20,
        // marginLeft: 10,
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1,
    },
});

export default Styles;
