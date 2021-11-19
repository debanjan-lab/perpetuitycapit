import React, { Component } from 'react';
import {
    StatusBar,
    View,
    Image,
    SafeAreaView,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

class SplashScreen extends Component {
    constructor(props) {
        super(props);
    }
    async componentDidMount() {
        var userData = await AsyncStorage.getItem('userData');
        userData = JSON.parse(userData);
        console.log(userData);
        setTimeout(() => {
            if (userData) {
                var userInfo = {
                    userId: userData.userId,
                    userName: userData.userName,
                    userEmail: userData.userEmail,
                    userAPIToken: userData.userAPIToken,
                    userCountryCode: userData.userCountryCode,
                    userMobile: userData.userMobile,
                }
                //this.props.navigation.replace('ApplyLoanScreen');
                this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'DrawerStack', params: null }],
                })
            }
            else {
                //this.props.navigation.replace('LoginScreen');
                this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'LoginScreen', params: null }],
                })

            }
            //this.props.navigation.replace('LoginScreen');
        }, 2000);
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar hidden />
                <Image
                    style={{
                        width: wp(100),
                        height: hp(106),
                    }}
                    source={require('../images/splash_srceen.png')}
                />
            </SafeAreaView>
        );
    }
}

export default SplashScreen;
