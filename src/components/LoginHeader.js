import React, { Component } from 'react';
import {
    Image,
    Text,
    View
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import fontSelector from '../constants/FontSelectors';
import AppStatusBar from '../components/Statusbar';
import Colors from '../constants/Colors';

class LoginHeader extends Component {
    componentDidMount() {
        //console.log(this.props);
    }
    render() {
        return (
            <View>
                <AppStatusBar />
                <View style={{ flexDirection: 'column', paddingTop: wp(25), alignItems: 'center', marginHorizontal: wp(10) }}>
                    <Image
                        source={require('../images/logo.png')}
                        style={{
                            height: wp(36),
                            width: wp(36),
                            resizeMode: 'contain'
                        }}
                    />
                    <Text style={{ fontFamily: fontSelector('medium'), fontSize: this.props.headerText == 'Welcome' ? wp(6.5) : wp(5.5), color: Colors.greenColor, marginTop: wp(2) }}>{this.props.headerText}</Text>
                    <Text style={{ fontFamily: fontSelector('regular'), fontSize: wp(3.5), color: Colors.subTextColor, marginTop: wp(2), textAlign: 'center' }}>{this.props.subHeaderText}</Text>
                </View>
            </View>
        )
    }
}

export default LoginHeader;