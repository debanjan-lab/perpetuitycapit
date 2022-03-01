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
class AboutUs extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <View style={{ flex: 1 }}>
                    <AppHeaderInner
                        headerText="About Us"
                        navigation={this.props.navigation}
                    />
                    <View style={{ padding: 20 }}>

                        <Image
                            source={require('../../images/logo.png')}
                            style={{ height: 200, alignSelf: 'center', resizeMode: 'contain' }}
                        />


                        <View style={{ margin: 20 }} />

                        <Text style={styles.heading}>About Us</Text>
                        <View style={{ margin: 10 }} />
                        <Text style={styles.description}>
                            Perpetuity Capital is Non-Banking Finance
                            Company (NBFC) that enable asset ownership
                            for single operatots and underserved
                            enterpreneurs in auto sector who usually
                            do not have access to capital from organized lenders
                            and banks.
                        </Text>
                        <View style={{ margin: 20 }} />
                        <Text style={styles.heading}>Our Products</Text>
                        <View style={{ margin: 10 }} />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.dots} />
                            <View style={{ margin: 10 }} />
                            <Text style={styles.description}>Car Loan</Text>
                        </View>
                        <View style={{ margin: 2 }} />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.dots} />
                            <View style={{ margin: 10 }} />
                            <Text style={styles.description}>2-Wheeler Loan</Text>
                        </View>
                        <View style={{ margin: 2 }} />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.dots} />
                            <View style={{ margin: 10 }} />
                            <Text style={styles.description}>Used vehicle Loan</Text>
                        </View>
                        <View style={{ margin: 2 }} />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.dots} />
                            <View style={{ margin: 10 }} />
                            <Text style={styles.description}>Personal Loan</Text>
                        </View>

                    </View>

                </View>

            </ScrollView>
        )
    }
}




export default AboutUs;


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
        paddingRight: 20,
        lineHeight: 30
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
