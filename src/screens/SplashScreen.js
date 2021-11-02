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

class SplashScreen extends Component {
    constructor(props) {
        super(props);
    }
    async componentDidMount() {
        setTimeout(() => {
            this.props.navigation.replace('LoginScreen');
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
