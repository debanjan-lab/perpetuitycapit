import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import fontSelector from '../constants/FontSelectors';
import Colors from '../constants/Colors';

class ApplyLoanSubHeader extends Component {
    componentDidMount() {
        //console.log(this.props);
    }
    render() {
        return (
            <View style={{ paddingTop: wp(7), paddingBottom: wp(4), paddingHorizontal: wp(4) }}>
                <Text
                    style={{
                        color: Colors.greenColor,
                        fontSize: wp(5.5),
                        fontFamily: fontSelector('bold'),
                        marginBottom: wp(1),
                        fontWeight: '700'
                    }}
                >
                    Personal Details
                </Text>
                <Text
                    style={{
                        color: Colors.subTextColor,
                        fontSize: wp(3.7),
                        fontFamily: fontSelector('regular'),
                    }}
                >Please fill the details to continue</Text>
            </View>
        )
    }
}

export default ApplyLoanSubHeader;