// import React, { Component } from 'react';
// import { Text, View,StyleSheet,TextInput,TouchableOpacity } from 'react-native';
// import TreeHeader from '../../components/TreeHeader';
// import Colors from '../../constants/Colors';

// class OtpScreen1 extends Component{
//     render(){
//         return(
//             <View>
//             <TreeHeader/>

//           <View style={{flex:1,alignItems:'center',backgroundColor:'white'}}>
//           <View style={{
//               marginTop:175,
//               height:310,
//               width:330,
//               borderRadius:10,
//              backgroundColor:'white',elevation:5}}>
//              <View style={{alignItems:'center',marginTop:22}}><Text style={{fontSize:22,fontWeight:'bold',color:Colors.greenColor}}>LOGIN</Text></View>
//              <View style={{alignItems:'center',marginTop:5}}><Text style={{color:Colors.mainTextColor}}>Log-in usinng Phone no.</Text></View>
//              <View style={{flexDirection:'row',marginTop:12}}>
//              <View style={{marginRight:4,marginLeft:8}}><TextInput value='+91' style={styles.input}/></View>
//              <View style={{width:280}}><TextInput placeholder='Enter Phone no' style={styles.input}/></View>
//              </View>
//           <View>
//           <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('AuthOtpScreen1')}>
//           <Text style={{color:Colors.whiteColor}}>GET OTP</Text>
//           </TouchableOpacity>
//           </View>
//           <View style={{flexDirection:'row',justifyContent:'center',marginVertical:20}}>
//           <View><Text style={{color:Colors.mainTextColor,}}>Don't have an account ? </Text></View>
//           <View><Text style={{color:Colors.greenColor,fontWeight:'bold',marginLeft:3}}>SIGN UP</Text></View>
//           </View>
//           </View>
//           </View>
//           </View>
//         )
//     }
// }

// export default OtpScreen1;

// const styles = StyleSheet.create({
//     input:{
//         color:'#05375a',
//         borderBottomWidth:0.30,
//         paddingBottom:-5
//     },
//     btn:{
//         backgroundColor:Colors.greenColor,
//         justifyContent:'center',
//         alignItems:'center',
//         padding:10,
//         marginHorizontal:110,
//         borderRadius:5,
//         marginTop:70
//     },

import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import CardLayout from "../../components/CardLayout";
import TreeHeader from "../../components/TreeHeader";
import Colors from "../../constants/Colors";
import Toast from "react-native-simple-toast";
import { deviceToken } from "../../constants/Constants";
import { connect } from "react-redux";
import { doLogin, saveUserData } from "../../redux/actions/AuthActions";

class PhoneScreen extends Component {
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
      <CardLayout>
        <View style={{ alignItems: "center", marginTop: 22 }}>
          <Text style={styles.header}>LOGIN</Text>
        </View>

        <View style={{ alignItems: "center", marginTop: 5 }}>
          <Text style={{ color: Colors.mainTextColor }}>
            Log-in usinng Phone no.
          </Text>
        </View>

        <View style={{ flexDirection: "row", marginTop: 12 }}>
          <View style={{ marginRight: 4, marginLeft: 8 }}>
            <TextInput value="+91" style={styles.input} />
          </View>
          <View style={{ width: 280 }}>
            <TextInput
              placeholder="Enter Phone no"
              style={styles.input}
              hasDevider={true}
              onChangeText={this._onchangeText}
              value={this.state.phone}
              maxLength={10}
            />
          </View>
        </View>

        <View>
          <TouchableOpacity
            style={styles.btn}
            loading={this.state.loading}
            onPress={() => this.userLogin()}
          >
            <Text style={{ color: Colors.whiteColor }}>GET OTP</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <View>
            <Text style={{ color: Colors.mainTextColor }}>
              Don't have an account ?{" "}
            </Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("AuthLoginScreen1")}
            >
              <Text style={styles.btn2}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </CardLayout>
    );
  }
}

const mapStateToProps = (state) => state.auth;
const mapDispatchToProps = {
  doLogin,
  saveUserData,
};
export default connect(mapStateToProps, mapDispatchToProps)(PhoneScreen);

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.greenColor,
  },
  input: {
    color: "#05375a",
    borderBottomWidth: 0.3,
    paddingBottom: -5,
  },
  btn: {
    backgroundColor: Colors.greenColor,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginHorizontal: 110,
    borderRadius: 5,
    marginTop: 70,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  btn2: {
    color: Colors.greenColor,
    fontWeight: "bold",
    marginLeft: 3,
  },
});
