import React, { Component } from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import fontSelector from "../../constants/FontSelectors";
import Colors from "../../constants/Colors";
import ButtonUtil from "../../components/button";
import TextInputUtil from "../../components/textInput";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AuthHeader from "../../components/AuthHeader";

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import Toast from "react-native-simple-toast";
import { deviceToken } from "../../constants/Constants";
import { connect } from "react-redux";
import { doLogin, saveUserData } from "../../redux/actions/AuthActions";
GoogleSignin.configure();
const Devider = ({ label }) => {
  return (
    <View style={styles.deviderWrapper}>
      <View style={styles.deviderLIne} />
      <Text style={styles.deviderMidleText}>{label}</Text>
      <View style={styles.deviderLIne} />
    </View>
  );
};
class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      phone: null,
    };
  }
  componentDidMount() {}

  _onchangeText = (value) => {
    this.setState({ phone: value });
  };

  googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);

      if (userInfo?.user) {
        let obj = {
          device_token: deviceToken,
          type: 2,
          social_id: userInfo?.user?.id,
          email: userInfo?.user?.email,
        };
        //console.log("obj", obj)
        this.props.doLogin(obj).then(() => {
          console.log(this.props);
          // // this.setState({ loading: false })
          let status = this.props?.status;
          //alert(status)
          // alert(status)
          let message = this.props?.message;
          if (status == 2) {
            this.props.navigation.navigate("AuthRegistrationScreen", {
              googleInfo: userInfo?.user,
              type: 2,
            });
            Toast.show(message);
          } else {
            let payload = this.props?.data;
            if (this.props?.data?.api_token) {
              this.props.saveUserData(payload);
            }
          }

          //console.log("****", this.props)
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  userLogin = () => {
    this.setState({ loading: true });
    let obj = {
      country_code: "+91",
      mobile: this.state.phone,
      device_token: deviceToken,
      type: 1,
    };

    this.props.doLogin(obj).then(() => {
      this.setState({ loading: false });
      let status = this.props?.status;
      let message = this.props?.message;
      if (status) {
        this.props.navigation.navigate("AuthOtpScreen", {
          navigation: "login",
        });
      } else {
        Toast.show(message);
      }
      console.log("****", this.props);
    });
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ marginTop: hp(5) }} />
        <AuthHeader
          headerText="Welcome"
          subHeaderText="Please log in to continue"
          logo={require("../../images/logo.png")}
        />
        <View style={{ marginTop: hp(10) }} />
        <TextInputUtil
          prefix={"+91"}
          keyboardType={"phone-pad"}
          hasDevider={true}
          onChangeText={this._onchangeText}
          value={this.state.phone}
          maxLength={10}
        />
        <View style={{ margin: 10 }} />
        <ButtonUtil
          active={true}
          label={"Get OTP"}
          loading={this.state.loading}
          onPress={() => this.userLogin()}
        />
        <Devider label={"Social Login"} />
        <ButtonUtil
          icon={require("../../images/gmail_icon.png")}
          label={"Continue with Gmail"}
          onPress={() => this.googleLogin()}
        />
        <View style={{ margin: 20 }} />
        <ButtonUtil
          textDecorationLine={true}
          label={"Don't have an account"}
          onPress={() =>
            this.props.navigation.navigate("AuthRegistrationScreen")
          }
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => state.auth;
const mapDispatchToProps = {
  doLogin,
  saveUserData,
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "white",
  },
  deviderWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: wp(8),
  },
  deviderLIne: {
    height: wp(0.3),
    width: wp(12),
    backgroundColor: "#C7C7C7",
  },
  deviderMidleText: {
    fontFamily: fontSelector("regular"),
    fontSize: wp(3.2),
    color: Colors.mainTextColor,
    marginHorizontal: wp(2),
  },
});
