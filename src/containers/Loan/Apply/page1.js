import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import DashboardCard from "../../../components/DashboardCard";
import DashboardHeader from "../../../components/DashboardHeader";
import DashboardHeaderInner from "../../../components/DashboardHeaderInner";
import Colors from "../../../constants/Colors";
import AntDesign from "react-native-vector-icons/AntDesign";
import LoanPagination from "../../../components/LoanPagination";
import AsyncStorage from "react-native/Libraries/Storage/AsyncStorage";
import Toast from "react-native-simple-toast";
class ApplyScreen1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pan_number: null,
    };
  }
  async componentDidMount() {
    var userData = await AsyncStorage.getItem("userData");
    userData = JSON.parse(userData);
    console.log(userData);
    setTimeout(() => {
      if (userData) {
        var userInfo = {
          userId: userData.userId,
          userName: userData.userName,
          userEmail: userData.userEmail,
          userAPIToken: userData.userAPIToken,
          userCountryCode: userData.userCountryCode,
          userMobile: userData.userMobile,
        };
      }

      //this.props.navigation.replace('LoginScreen');
    }, 2000);
  }
  handlePannumber = (text) => {
    this.setState({ pan_number: text });
  };
  panCheck = () => {
    console.log(this.state.pan_number);
    var axios = require("axios");
    var FormData = require("form-data");
    var data = new FormData();
    data.append("pan_number", this.state.pan_number);

    var config = {
      method: "post",
      url: "https://foure.nodejsdapldevelopments.com/perpetuitycapital/public/api/v1/Auth/pan-number",
      headers: {
        Authorization:
          "Bearer 88667dcef3d68019c298dccaa7f58ff642b8f0d253178a2a41fb7d7183f8cb15",
        Accept: "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        if (response.data.status == 1) {
          this.gotoNextPage();
        } else {
          Toast.show(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  gotoNextPage() {
    this.props.navigation.navigate("ApplyScreen2");
  }
  render() {
    return (
      <View style={styles.container}>
        <DashboardHeader navigation={this.props.navigation} />
        <LoanPagination status={0} />
        <DashboardHeaderInner
          headerText="Lets Get Started!"
          navigation={this.props.navigation}
          goBack={true}
        />
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={{ color: Colors.mainTextColor, fontSize: 12 }}>
            Your PAN Card help us in verifying your details
          </Text>
        </View>

        <DashboardCard>
          <View style={{ padding: 10 }}>
            <View style={{ flexDirection: "row" }}>
              <AntDesign name="idcard" size={18} color="green" />
              <Text style={{ marginLeft: 8, color: Colors.mainTextColor }}>
                PAN number
              </Text>
            </View>
            <View style={{ marginTop: -10, paddingLeft: 21 }}>
              <TextInput
                placeholder="Enter PAN Number"
                style={[styles.txtinput, { color: "black" }]}
                onChangeText={this.handlePannumber}
                value={this.state.pan_number}
              />
            </View>
          </View>
        </DashboardCard>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <Text style={{ color: Colors.mainTextColor, fontSize: 12 }}>
            Your PAN Card help us in verifying your details
          </Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("ApplyScreen2")}
            //onPress={() => this.panCheck()}
          >
            <Text style={styles.btn}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ApplyScreen1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  btn: {
    backgroundColor: Colors.greenColor,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
    color: Colors.whiteColor,
  },
  txtinput: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.subTextColor,
    paddingBottom: 0,
  },
});

// import React, { Component } from 'react';
// import { View,Text,StyleSheet,Image,SafeAreaView,TextInput} from 'react-native';
// import LoanPagination from './components/loanPagination';
// import Colors from '../../../constants/Colors';
// import {
//     widthPercentageToDP as wp,
//     heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import AppHeaderUpper from '../../../components/AppHeaderUpper';
// // import { TextInput } from 'react-native-gesture-handler';
// import { Button } from 'react-native-paper';

// class ApplyScreen1 extends Component{

//     constructor(){
//         super();
//         this.state={
//             list:null
//         }
//     }
//     render(){
//         return(

//             <SafeAreaView style={styles.container}>
//             <View style={styles.successRow}>
//             <View style={{backgroundColor: '#1A5632',paddingVertical:15,borderBottomLeftRadius:15,borderBottomRightRadius:15}}>
//             <Image
//                 source={require('../../../images/side_menu_logo.png')}
//                 style={{ height:40, width: 40, resizeMode: 'contain',marginLeft:35 }}
//             />
//             </View>
//             </View>
//             <View style={{justifyContent:'center',alignItems:'center',marginVertical:30}}>
//             <Text>Lorem ipsum dollar sit amet</Text>
//             <Text>Consetetur sadipscing elitr,sed diam</Text>
//             </View>

//            <View>
//            <LoanPagination total={4} active={1} />
//            </View>

//            <AppHeaderUpper
//            headerText="Personal Details"
//            navigation={this.props.navigation}
//            goBack={true}
//        />
//        <View style={{alignItems:'center'}}>
//        <Text style={{fontSize:10}}>Your PAN car help us i verifying your details</Text>
//        </View>
//        <View style={{ paddingHorizontal:20 }}>
//        <View style={styles.wrapper}>
//        <View style={{flexDirection:'row',marginBottom:-10}}>
//        <View>
//        <Image
//        source={require('../../../images/calendar.png')}
//         style={styles.icon}
//           />
//        </View>
//        <View>
//        <Text>PAN number</Text>
//        </View>

//        </View>
//        <View>
//        <TextInput
//        placeholder='Enter PAN number'
//        style={styles.input}
//        />
//        </View>
//        </View>
//        <View style={{alignItems:'center'}}>
//        <Text style={{fontSize:10,margin:10}}>Tap on Continue to proceed with your application</Text>
//        </View>
//        </View>
//    <View style={{paddingHorizontal:150,marginTop:10}}>
//    <Button mode="contained" style={styles.btn} onPress={() => this.props.navigation.navigate('ApplyScreen2')}>
//    Contiune
//  </Button>
//    </View>

//    </SafeAreaView>

//         )
//     }
// }
// export default ApplyScreen1;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: 'white'
//     },
//     successRow: {
//         backgroundColor: Colors.lightGreen,
//         marginTop: 50,
//         // padding: 20,
//         borderRadius: 10,
//     },
//     wrapper: {
//         backgroundColor: Colors.whiteColor,
//         marginTop: 20,
//         padding: 20,
//         borderRadius: 10,
//         elevation: 3,

//     },
//     input:{
//         paddingLeft:10,
//         color:'#05375a',
//         borderBottomColor:'#05375a',
//         borderBottomWidth:0.25,
//         paddingBottom:-5
//     },
//     btn:{
//         backgroundColor:'#696969'
//     },
//     icon: {
//         height: wp(4),
//         width: wp(4),
//         resizeMode: 'contain',
//         marginLeft:10,
//         // marginRight:2,
//         // marginTop:4
//     },
// })

// import React ,{Component} from 'react';
// import {View,Text,StyleSheet} from 'react-native'
// import DashboardHeader from '../../../components/DashboardHeader';
// import AntDesign from 'react-native-vector-icons/AntDesign'
// import Colors from '../../../constants/Colors';
// class ApplyScreen1 extends Component{
//     constructor(){
//         super()
//     }
//     render(){
//         return(
//             <View style={styles.container}>
//             <DashboardHeader/>
//             <View style={{alignItems:'center',marginVertical:30}}>
//             <View style={{flexDirection:'row'}}>
//             <View>
//              <AntDesign name='checkcircle' size={30} color={Colors.greenColor}/>
//             </View>
//             <View style={{borderWidth:0.6,borderColor:Colors.greenColor,width:130,height:0,marginTop:14}}>
//             </View>
//             <View>
//             <AntDesign name='checkcircle' size={30} color={Colors.greenColor}/>
//            </View>
//            <View  style={{borderWidth:0.6,borderColor:Colors.greenColor,width:130,height:0,marginTop:14}}>
//            </View>
//            <View>
//              <AntDesign name='checkcircle' size={30} color={Colors.greenColor}/>
//             </View>
//             </View>
//             </View>
//             </View>
//         )
//     }
// }

// export default ApplyScreen1;

// const styles = StyleSheet.create({
//     container: {
//         flex:1,
//         backgroundColor: 'white',
//     },

// })

// import React ,{Component} from 'react';
// import {View,Text,StyleSheet} from 'react-native'
// import DashboardHeader from '../../../components/DashboardHeader';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
// import Colors from '../../../constants/Colors';
// import {
//     widthPercentageToDP as wp,
//     heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

// const Rajesh = ({value,tag}) =>{
//     return(

//   <View style={{flexDirection:'row'}}>
//             <View>
//              <MaterialCommunityIcons name={tag ? tag : 'checkbox-blank-circle'} size={35} color={tag ? Colors.greenColor : Colors.subTextColor}/>
//             </View>
//             {
//                 (value < 2) &&
//                 <View style={{borderWidth:0.6,borderColor:Colors.greenColor,width:120,height:0,marginTop:18}}>
//             </View>}
//             </View>

//     )
// }

// const ApplyLoanPagination = ({ total, active }) => {
//     let arr = [...Array(3).keys()]
//     //console.log("arr", arr)

//     return (
//         <View style={{flexDirection:'row',marginVertical:20,justifyContent:'center'}}>
//             {
//                 arr.map((value, key) => {
//                     console.log('val',value)
//                     console.log('activeIndex',active)
//                     let activeIndex = active - 1;
//                     return (
//                         <View key={key}  >
//                         {
//                             activeIndex+1 > value ? <Rajesh value={value} tag = 'check-circle' /> : <Rajesh value={value}/>
//                         }
//                         </View>
//                     )

//                 })
//             }
//         </View>

//     );
// };

// class ApplyScreen1 extends Component{
//     constructor(){
//         super()
//     }
//     render(){
//         return(
//             <View  style={styles.container}>
//           <ApplyLoanPagination total={4} active={3}/>
//             </View>
//         )
//     }
// }

// export default ApplyScreen1;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: 'white',
//     },

// })
