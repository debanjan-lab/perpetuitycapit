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
                        headerText="Terms and Conditions"
                        navigation={this.props.navigation}
                    />
                    <View style={{ padding: 20 }}>
                        <Image
                            source={require('../../images/logo.png')}
                            style={{ height: 200, alignSelf: 'center', resizeMode: 'contain' }}
                        />
                        <View style={{ margin: 20 }} />
                        <Text style={styles.description}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make a
                            type specimen book. It has survived not only five centuries,
                            but also the leap into electronic typesetting
                        </Text>
                        <View style={{ margin: 20 }} />

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
