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
import AppStatusBar from './Statusbar';
import Colors from '../constants/Colors';

class ApplyLoanHeader extends Component {
    componentDidMount() {
        //console.log(this.props);
    }
    render() {
        return (
            <View>
                <AppStatusBar />
                <View
                    style={{
                        marginTop: wp(8),
                        paddingHorizontal: wp(4),
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottomWidth: 1,
                        borderBottomColor: '#707070',
                        paddingBottom: wp(2)
                    }}
                >
                    <TouchableOpacity
                        onPress={() => this.props.mainProps.navigation.goBack()}
                    >
                        <Image
                            source={require('../images/back_icon.png')}
                            style={{ height: wp(5), width: wp(5), resizeMode: 'contain' }}
                        />
                    </TouchableOpacity>
                    <Text
                        style={{
                            color: Colors.mainTextColor,
                            fontSize: wp(4.8),
                            fontFamily: fontSelector('bold'),
                            textAlign: 'center',
                            fontWeight: '700'
                        }}
                    >
                        Apply For Loan
                    </Text>
                    <View />
                </View>
            </View>
        )
    }
}

export default ApplyLoanHeader;