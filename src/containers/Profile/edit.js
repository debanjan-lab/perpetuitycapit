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
import ButtonUtil from '../../components/button'
import TextInputUtil from '../../components/textInput'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppHeader from '../../components/AppHeader';
import AppHeaderInner from '../../components/AppHeaderInner';
import { doLogout, getProfile, updateProfile } from '../../redux/actions/AuthActions';
import { connect } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import { getCities } from '../../redux/actions/CityActions';
class ProfileEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingCity: false,
            loading: false,
            name: null,
            email: null,
            state: null,
            city: null,
            pincode: null
        };
    }
    componentDidMount() {
        this.setState({
            name: this.props.auth.name,
            email: this.props.auth.email,
            state: this.props.auth.state_id,
            city: this.props.auth.city_id,
            pincode: this.props.auth.pincode,
        })
    }


    // _clearText = (field) => {
    //     console.log(field)
    //     this.setState({
    //         name: 'sasasasaasa'
    //     })
    // }

    _onchangeText = (field, value) => {
        this.setState({
            [field]: value
        })
    }


    _saveProfile = () => {
        let token = this.props.auth.api_token;
        let user_id = this.props.auth.user_id;
        let name = this.state.name;
        let email = this.state.email;
        let city = this.state.city;
        let state = this.state.state;
        let pincode = this.state.pincode;

        let obj = {
            token: token,
            user_id: user_id,
            name: name,
            email: email,
            city_id: city,
            state_id: state,
            pincode: pincode
        }

        console.log(this.props.auth.email.trim())
        console.log(email.trim())

        if (email.trim() != this.props.auth.email.trim()) {
            alert("Please check email and active")
        }

        this.props.updateProfile(obj).then(res => {
            this.props.getProfile(obj).then(() => {
                this.props.navigation.goBack()
            })
        })
    }

    _getCity = (value) => {
        this.setState({ loadingCity: true })
        this.setState({ state: value }, () => {
            let obj = {
                token: this.props.auth.api_token,
                state_id: value
            }
            this.props.getCities(obj).then(() => {
                this.setState({ loadingCity: false })
            })
        })
    }


    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <View style={{ flex: 1 }}>
                    <AppHeaderInner
                        headerText="Profile Details"
                        navigation={this.props.navigation}
                        editText={'Save'}
                        onPressEdit={() => this._saveProfile()}
                        goBack={true}
                    />
                    <View style={{ padding: 20 }}>
                        <TextInputUtil
                            placeHolder={'Name'}
                            keyboardType={null}
                            prefix={null}
                            hasDevider={false}
                            onChangeText={(v) => this._onchangeText('name', v)}
                            value={this.state.name}
                        />
                        <View style={{ margin: 10 }} />
                        <TextInputUtil
                            placeHolder={'Email'}
                            keyboardType={null}
                            prefix={null}
                            hasDevider={false}
                            onChangeText={(v) => this._onchangeText('email', v)}
                            value={this.state.email}
                            editable={!this.props.auth.is_email_active}
                        />
                        <View style={{ margin: 10 }} />

                        <View style={styles.pickerWrapper}>
                            <Picker
                                selectedValue={this.state.state}
                                style={{ flex: 1 }}
                                mode={"dialog"}
                                onValueChange={(itemValue) => this._getCity(itemValue)}
                            >
                                <Picker.Item color={Colors.mainTextColor} label={"Select State"} value={this.state.state} />
                                {
                                    this.props.states.data.map((value, key) => {
                                        return (
                                            <Picker.Item color={Colors.mainTextColor} label={value.state_name} value={value.state_id} key={key} />
                                        )
                                    })
                                }

                            </Picker>
                        </View>

                        <View style={{ margin: 10 }} />
                        {
                            !this.state.loadingCity &&
                            <View style={styles.pickerWrapper}>
                                <Picker
                                    selectedValue={this.state.city}
                                    style={{ flex: 1 }}
                                    mode={"dialog"}
                                    onValueChange={(itemValue) => this.setState({ city: itemValue })}
                                >
                                    <Picker.Item color={Colors.mainTextColor} label={"Select City"} value={this.state.state} />
                                    {
                                        this.props.cities.data.map((value, key) => {
                                            return (
                                                <Picker.Item color={Colors.mainTextColor} label={value.city_name} value={value.city_id} key={key} />
                                            )
                                        })
                                    }
                                </Picker>
                            </View>
                        }


                        <View style={{ margin: 10 }} />
                        <TextInputUtil
                            placeHolder={'Pin Code'}
                            keyboardType={null}
                            prefix={null}
                            hasDevider={false}
                            onChangeText={(v) => this._onchangeText('pincode', v)}
                            value={this.state.pincode}
                        />

                    </View>
                </View>
            </ScrollView>
        )
    }
}

const mapDispatchToProps = {
    doLogout,
    getCities,
    updateProfile,
    getProfile
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        states: state.states,
        cities: state.cities
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'white'
    },
    pickerWrapper: {
        flexDirection: 'row',
        backgroundColor: '#F1F6FC',
        borderRadius: wp(12),
        alignItems: 'center',
    }


});
