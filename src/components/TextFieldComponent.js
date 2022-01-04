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

class TextFieldComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }
    componentDidMount() {

    }
    render() {
        return (
            <View>
                {this.props.type != "mobile" ?
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: '#F1F6FC',
                        borderRadius: wp(12),
                        alignItems: 'center',
                        paddingLeft: wp(5),
                        marginTop: wp(5),
                    }}
                    >
                        <TextInput
                            value={this.state.text}
                            onChangeText={text => this.setState({ text: text })}
                            placeholder={this.props.placeHolder}
                            placeholderTextColor={Colors.subTextColor}
                            style={{
                                flex: 1,
                                color: Colors.mainTextColor,
                                fontFamily: fontSelector('regular'),

                            }}
                        />
                        {this.props.rightIcon ?
                            <TouchableOpacity>
                                <Image
                                    source={this.props.type == "cross" ? require('../images/text_field_cross_icon.png') : this.props.type == "calender" ? require('../images/calender_icon.png') : null}
                                    style={{ height: wp(5), width: wp(5), resizeMode: 'contain', marginRight: wp(5) }}
                                />
                            </TouchableOpacity>
                            :
                            null
                        }
                    </View>
                    :
                    <View
                        style={{
                            flexDirection: 'row',
                            backgroundColor: '#F1F6FC',
                            borderRadius: wp(12),
                            alignItems: 'center',
                            marginVertical: wp(7)
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => this.setState({ isModalVisible: true })}
                            style={{ flexDirection: 'row', alignItems: 'center', marginLeft: wp(5) }}
                        >
                            <Text style={{ fontFamily: fontSelector('regular'), fontSize: wp(3.5), color: Colors.mainTextColor, marginRight: wp(2) }}>+91</Text>
                            <Image source={require('../images/down_arrow.png')} style={{ height: wp(2.5), width: wp(2), resizeMode: 'contain' }} />
                        </TouchableOpacity>
                        <View style={{ height: wp(7), backgroundColor: Colors.subTextColor, width: wp(0.3), marginHorizontal: wp(3) }} />
                        <TextInput
                            value={this.state.mobile}
                            onChangeText={text => this.setState({ mobile: text })}
                            placeholder='Mobile Number'
                            placeholderTextColor={Colors.subTextColor}
                            keyboardType='phone-pad'
                            style={{
                                flex: 1,
                                color: Colors.mainTextColor,
                                fontFamily: fontSelector('regular')
                            }}
                        />
                    </View>
                }
            </View>
        )
    }
}

export default TextFieldComponent;