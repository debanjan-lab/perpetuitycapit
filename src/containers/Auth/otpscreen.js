import React, { Component } from 'react';
import { StyleSheet,View,Text,TouchableOpacity } from 'react-native';
import CardLayout from '../../components/CardLayout';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Colors from '../../constants/Colors';


class OtpScreen extends Component{
  constructor(props){
    super(props)
  }
    render(){
      console.log('ppp',this.props)
        return(
            <CardLayout height={400}>
            <View style={{alignItems:'center',marginTop:30}}><Text style={{fontSize:20,fontWeight:'bold',color:Colors.greenColor}}>One Time Password</Text></View>
            <View style={{alignItems:'center',marginTop:50,}}><Text style={{color:Colors.mainTextColor}}>Enter the One Time Password to Sign in</Text></View>
            <View style={{alignItems:'center'}}>
            <OTPInputView
            style={{width: '80%', height: 45,bordeColor:Colors.greenColor}}
            pinCount={6}
            // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
            // onCodeChanged = {code => { this.setState({code})}}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled = {(code) => {
                console.log(`Code is ${code}, you are good to go!`)
            }}
        />
            </View>
            <View style={{flexDirection:'row',justifyContent:'center',marginTop:80}}>
            <View><Text style={{color:Colors.mainTextColor,marginRight:4}}>Didn't receive the OTP?</Text></View>
            <View><Text style={{fontWeight:'bold',color:Colors.greenColor}}>Resend Again</Text></View>

            </View>
            
            <View>
            <TouchableOpacity style={styles.btn} onPress={() =>this.props.navigation.navigate('DashboardScreen1')} >
                <Text style={{ color: Colors.whiteColor }}>Verify</Text>
            </TouchableOpacity>
        </View>
            
            </CardLayout>
        )
    }
}

export default OtpScreen;

const styles = StyleSheet.create({
    borderStyleBase: {
      width: 30,
      height: 45,
    },
  
    borderStyleHighLighted: {
      borderColor: Colors.greenColor,
    },
  
    underlineStyleBase: {
      width: 40,
      height: 45,
      borderWidth: 0,
      borderBottomWidth: 1,
      borderBottomColor:Colors.mainTextColor,
      color:Colors.mainTextColor
    },
  
    underlineStyleHighLighted: {
      borderColor: Colors.mainTextColor,
    },
    btn: {
        backgroundColor: Colors.greenColor,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginHorizontal: 110,
        borderRadius: 5,
        marginTop: 30
    },
  });