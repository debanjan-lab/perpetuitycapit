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
class HowItWorks extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <View style={{ flex: 1 }}>
                    <AppHeaderInner
                        headerText="How It Works"
                        navigation={this.props.navigation}
                    />
                    <View style={{ padding: 20 }}>

                        <Image
                            source={require('../../images/how_it_works_graphics.png')}
                            style={{ height: 200, alignSelf: 'center', resizeMode: 'contain' }}
                        />

                        <View style={{ margin: 20 }} />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.dots} />
                            <View style={{ margin: 10 }} />
                            <Text style={styles.description}>Apply Online or Via the Mobile Application</Text>
                        </View>
                        <View style={{ margin: 5 }} />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.dots} />
                            <View style={{ margin: 10 }} />
                            <Text style={styles.description}>Minimal Documentation KYC , Bank Statement , Salary Slips</Text>
                        </View>
                        <View style={{ margin: 5 }} />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.dots} />
                            <View style={{ margin: 10 }} />
                            <Text style={styles.description}>Fast Loans Disbursal within 48-72 hours</Text>
                        </View>
                        <View style={{ margin: 5 }} />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.dots} />
                            <View style={{ margin: 10 }} />
                            <Text style={styles.description}>Flexible Tenures , Multiple Tenures , No Prepayment Penalty</Text>
                        </View>

                    </View>

                </View>

            </ScrollView>
        )
    }
}




export default HowItWorks;


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
