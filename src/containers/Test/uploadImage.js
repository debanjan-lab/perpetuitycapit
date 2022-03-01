import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Keyboard,
    SafeAreaView,
    KeyboardAvoidingView,
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    PermissionsAndroid,
    Platform
} from 'react-native';
import fontSelector from '../../constants/FontSelectors';
import Colors from '../../constants/Colors';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Picker } from '@react-native-picker/picker';

import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import axios from 'axios';
class LoanApplyScreen7 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screenLoading: false,
            self_photo: null,
        };
        this.myRef = React.createRef();
    }


    _selecImageType = (value) => {
        if (value == 'camera') {
            this._requestCameraPermission()
        } else {
            launchImageLibrary({ noData: true }, (response) => {
                // console.log(response);


                if (response.assets) {
                    console.log("response _selecImageType", response)
                    this.setState({
                        imageResponse: response?.assets[0]
                    }, () => {
                        this._goNext()
                    })
                }
            });
        }
    }

    _requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "App Camera Permission",
                    message: "App needs access to your camera "
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Camera permission given");
                launchCamera({ noData: true }, (response) => {
                    // console.log(response);
                    if (response.assets) {
                        console.log("response requestCameraPermission", response)
                        this.setState({
                            imageResponse: response?.assets[0]
                        }, () => {
                            this._goNext()
                        })
                    }
                });


            } else {
                //  console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    _saveImage = () => {
        if (this.state.image_type == 'selfie') {
            this.setState({
                self_photo: this.state.imageResponse
            })
        }
    }
    _toggleImage = (value) => {
        this.setState({
            image_type: value
        })
        this.myRef.current.focus();
    }

    _goNext = async () => {
        //let self_photo = this.state.self_photo?.uri;
        let bodyFormData = new FormData();
        bodyFormData.append('self_photo', {
            uri: this.state.imageResponse?.uri,
            name: this.state.imageResponse?.fileName,
            type: this.state.imageResponse?.type,
        });
        console.log("bodyFormData", JSON.stringify(bodyFormData))
        let url = 'https://foure.nodejsdapldevelopments.com/perpetuitycapital/public/api/v1/Auth/img-upload'
        try {
            const request = await axios.post(url, bodyFormData, {
                headers: {
                    'Content-type': 'multipart/form-data',
                }
            });
            if (request) {
                console.log("request", request)
            }
        } catch (err) {
            console.log("err", err.response)
        }
    }



    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }}>

                    <ScrollView contentContainerStyle={{ padding: 20 }}>
                        <View style={{ margin: 20 }} />

                        <Text style={styles.heading}>Upload selfie</Text>
                        <TouchableOpacity style={styles.imageWrapper} onPress={() => this._toggleImage('selfie')}>
                            <Image source={{ uri: this.state.self_photo?.uri }} style={styles.image} />
                        </TouchableOpacity>

                        <View style={{ height: 0, width: 0 }}>
                            <Picker
                                ref={this.myRef}
                                selectedValue={this.state.image_type}
                                style={{ flex: 0 }}
                                mode={"dialog"}
                                onValueChange={(itemValue) => this._selecImageType(itemValue)}
                            >
                                <Picker.Item label="Select Image" value="" />
                                <Picker.Item label="From Camera" value="camera" />
                                <Picker.Item label="From Storage" value="storage" />
                            </Picker>
                        </View>

                    </ScrollView>
                </View>

            </View>

        )
    }
}



export default LoanApplyScreen7;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    heading: {
        color: Colors.mainTextColor,
        fontSize: wp(5),
        fontFamily: fontSelector('medium'),
    },
    imageWrapper: {
        marginTop: 10,
        width: wp(50),
        height: wp(50),
        backgroundColor: '#F1F6FC',
        borderRadius: 10
    },
    image: {
        width: wp(50),
        height: wp(50),
        resizeMode: 'contain'
    },
});
