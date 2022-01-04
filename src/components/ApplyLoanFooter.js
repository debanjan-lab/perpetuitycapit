import React, { Component } from 'react';
import {
    Image,
    TextInput,
    View,
    TouchableOpacity,
    Text
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import fontSelector from '../constants/FontSelectors';
import Colors from '../constants/Colors';

class ApplyLoanFooter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            dotArray: []
        }
    }
    componentDidMount() {
        var dotArr = []
        for (var i = 1; i <= 9; i++) {
            dotArr.push({
                'id': i,
            })
        }

        this.setState({
            dotArray: dotArr
        })
    }
    render() {
        return (
            <View style={{ height: wp(35), marginHorizontal: wp(4), justifyContent: 'space-between', paddingVertical: wp(5) }}>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        backgroundColor: Colors.greenColor,
                        width: wp(35),
                        paddingHorizontal: wp(12),
                        paddingVertical: wp(4),
                        alignSelf: 'flex-end',
                        borderRadius: wp(10),
                        alignItems: 'center',
                    }}
                >
                    <Text
                        style={{
                            color: Colors.whiteColor,
                            fontSize: wp(3.8),
                            fontFamily: fontSelector('regular'),
                            marginRight: wp(2)
                        }}
                    >
                        Next
                    </Text>
                    <Image
                        source={require('../images/next_icon.png')}
                        style={{
                            height: wp(4.5),
                            width: wp(4.5),
                            resizeMode: 'contain',
                            marginRight: wp(5),
                        }}
                    />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    {this.state.dotArray.map((data) => {
                        return (
                            <View style={{ height: wp(2), width: wp(2), backgroundColor: Colors.greyColor, marginRight: wp(1), borderRadius: wp(5) }} />
                        )
                    })}
                </View>
            </View>
        )
    }
}

export default ApplyLoanFooter;