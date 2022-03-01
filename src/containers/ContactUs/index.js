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
    StyleSheet
} from 'react-native';
import fontSelector from '../../constants/FontSelectors';
import Colors from '../../constants/Colors';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppHeader from '../../components/AppHeader';
import AppHeaderInner from '../../components/AppHeaderInner';
class ContactUs extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <View style={{ flex: 1 }}>
                    <AppHeaderInner
                        headerText="Contact Us"
                        navigation={this.props.navigation}
                    />
                    <Image
                        source={require('../../images/map_image.png')}
                        style={{ height: 200, alignSelf: 'center', resizeMode: 'contain' }}
                    />
                    <View style={{ padding: 20 }}>
                        <View style={{ margin: 20 }} />

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={require('../../images/location_icon.png')}
                                style={{ height: 20, width: 20, resizeMode: 'contain' }}
                            />
                            <View style={{ margin: 5 }} />
                            <Text style={styles.heading}>Address</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.description}>
                                A-34, Shyam Enclave
                                NITCO Gali , Chikamberpure
                                Ghaziabad
                                UP 201005
                            </Text>
                            <Image
                                source={require('../../images/location_line.png')}
                                style={{ height: 30, width: 30, resizeMode: 'contain' }}
                            />
                        </View>

                        <View style={{ margin: 5 }} />

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.description}>
                                Chatterjee International center
                                33A, Jawalharlal Neheru Road,
                                20th Floor , Suite A3
                                Kolkata 700071
                            </Text>
                            <Image
                                source={require('../../images/location_line.png')}
                                style={{ height: 30, width: 30, resizeMode: 'contain' }}
                            />
                        </View>




                        <View style={{ margin: 10 }} />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={require('../../images/phone_icon.png')}
                                style={{ height: 20, width: 20, resizeMode: 'contain' }}
                            />
                            <View style={{ margin: 5 }} />
                            <Text style={styles.heading}>Phone</Text>
                        </View>
                        <Text style={styles.description}>
                            +91 33 4603 4963
                        </Text>


                        <View style={{ margin: 10 }} />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={require('../../images/email_icon.png')}
                                style={{ height: 20, width: 20, resizeMode: 'contain' }}
                            />
                            <View style={{ margin: 5 }} />
                            <Text style={styles.heading}>Email</Text>
                        </View>
                        <Text style={styles.description}>
                            contact@perpetuitycapital.in
                        </Text>


                    </View>

                </View>

            </ScrollView>
        )
    }
}




export default ContactUs;


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'white'
    },
    logo: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },

    heading: {
        color: '#1A5632',
        fontSize: 20,
        fontWeight: '500',
    },
    description: {
        color: '#000000',
        fontSize: 20,
        fontWeight: '300',
        marginLeft: 30,
        paddingRight: 20,
        lineHeight: 30,
        flex: 1
    },
    dots: {
        backgroundColor: '#1A5632',
        height: 10,
        width: 10,
        borderRadius: 10,
        alignSelf: 'flex-start',
        marginTop: 10
    }
});
