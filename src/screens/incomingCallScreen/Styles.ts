import {StyleSheet} from 'react-native';

const Styles = StyleSheet.create({
    page:{
        height: '100%',
        // backgroundColor: '#0739',
        // flex: 1,
    },
    cameraPreview:{
        flex: 1,
        // backgroundColor: '#0739',
        alignItems: 'center',
        padding: 10,
    },
    name:{
        fontSize: 35,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 50,
        marginBottom: 15,
    },
    phoneNumber:{
        fontSize: 20,
        fontWeight: 'normal',
        color: '#fff',
    },
    buttonsContainer:{
        width: '100%',
        marginTop: 'auto',
        padding: 20,
    },
    buttonRows:{
        padding: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginBottom: 20,
    },
    iconButton:{
        // backgroundColor: '#4a4a4a',
        width: 60,
        height: 60,
        borderRadius: 60/2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text:{
        fontSize: 15,
        color: '#fff'
    },
});

export default Styles;
